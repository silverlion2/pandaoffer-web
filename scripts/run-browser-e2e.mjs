import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync } from 'node:fs';
import { connect } from 'node:net';
import { tmpdir } from 'node:os';
import { isAbsolute, join, relative, resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = 4177;
const origin = `http://127.0.0.1:${port}`;
const env = Object.fromEntries(Object.entries(process.env).filter(([key]) =>
  /^(path|systemroot|windir|comspec|pathext|temp|tmp|home|userprofile|localappdata|appdata|programfiles|programfiles\(x86\)|programdata|ci|lang|lc_all|playwright_browsers_path)$/i.test(key)));
Object.assign(env, { NODE_ENV: 'production', NEXT_TELEMETRY_DISABLED: '1' });
const children = new Set();
let interrupted = false;
const interrupt = () => { interrupted = true; for (const child of children) child.kill(); };
process.once('SIGINT', interrupt);
process.once('SIGTERM', interrupt);

function occupied() {
  return new Promise(resolve => {
    const socket = connect({ host: '127.0.0.1', port });
    socket.once('connect', () => { socket.destroy(); resolve(true); });
    socket.once('error', () => { socket.destroy(); resolve(false); });
    socket.setTimeout(1000, () => { socket.destroy(); resolve(true); });
  });
}
function start(args, childEnv = env) {
  if (interrupted) throw new Error('Browser gate interrupted.');
  const child = spawn(process.execPath, args, { cwd: root, env: childEnv, stdio: 'inherit', windowsHide: true });
  children.add(child);
  child.done = new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('exit', code => { children.delete(child); resolve(code ?? 1); });
  });
  return child;
}

let server;
let result = 1;
try {
  if (await occupied()) throw new Error(`Port ${port} is occupied; refusing to reuse an existing server.`);
  for (const name of ['.env', '.env.local', '.env.production', '.env.production.local']) {
    if (existsSync(join(root, name))) throw new Error(`Credential-free browser gate requires a checkout without ${name}.`);
  }
  const output = process.env.PANDA_BROWSER_OUTPUT || mkdtempSync(join(tmpdir(), 'pandaoffer-browser-'));
  const outputPath = resolve(output);
  const inside = relative(root, outputPath);
  if (!isAbsolute(output) || !inside || (!inside.startsWith('..') && !isAbsolute(inside))) {
    throw new Error('PANDA_BROWSER_OUTPUT must be an absolute directory outside the repository.');
  }
  mkdirSync(outputPath, { recursive: true });
  console.log(`Browser artifacts: ${outputPath}`);
  if (await start(['node_modules/next/dist/bin/next', 'build']).done !== 0) throw new Error('Isolated production build failed.');
  server = start(['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)]);
  let ready = false;
  for (let attempt = 0; attempt < 120; attempt++) {
    if (!children.has(server) || interrupted) throw new Error('Owned preview stopped before becoming ready.');
    try {
      const response = await fetch(origin, { signal: AbortSignal.timeout(1000) });
      if (response.ok) { ready = true; break; }
    } catch { /* Preview is starting. */ }
    await delay(500);
  }
  if (!ready) throw new Error('Owned preview did not become ready.');
  result = await start(['node_modules/@playwright/test/cli.js', 'test', ...process.argv.slice(2)], {
    ...env, PANDA_BROWSER_GATE: '1', PANDA_BROWSER_OUTPUT: outputPath,
  }).done;
} catch (error) {
  console.error(error.message);
} finally {
  for (const child of children) child.kill();
  await Promise.all([...children].map(child => Promise.race([child.done.catch(() => {}), delay(5000)])));
  if (server) {
    const closed = !(await occupied());
    if (!closed) result = 1;
    console.log(JSON.stringify({ browserGateExit: result, previewClosed: closed, port }));
  }
  process.removeListener('SIGINT', interrupt);
  process.removeListener('SIGTERM', interrupt);
}
process.exitCode = result;
