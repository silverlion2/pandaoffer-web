import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer, connect } from 'node:net';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
function run(args, extraEnv = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: root, env: { ...process.env, PANDA_BROWSER_GATE: '', ...extraEnv }, windowsHide: true,
    });
    let output = '';
    child.stdout.on('data', data => { output += data; });
    child.stderr.on('data', data => { output += data; });
    child.once('error', reject);
    child.once('exit', code => resolve({ code, output }));
  });
}
const direct = await run(['node_modules/@playwright/test/cli.js', 'test', '--list']);
assert.notEqual(direct.code, 0);
assert.match(direct.output, /Use npm run test:e2e:prod/);
console.log('PASS direct Playwright refuses an unowned server');

const sentinel = createServer(socket => socket.end());
await new Promise((resolve, reject) => { sentinel.once('error', reject); sentinel.listen(4177, '127.0.0.1', resolve); });
try {
  const occupied = await run(['scripts/run-browser-e2e.mjs']);
  assert.notEqual(occupied.code, 0);
  assert.match(occupied.output, /Port 4177 is occupied/);
  assert.equal(sentinel.listening, true);
  console.log('PASS occupied port is neither reused nor terminated');
} finally { await new Promise(resolve => sentinel.close(resolve)); }

const inside = await run(['scripts/run-browser-e2e.mjs'], { PANDA_BROWSER_OUTPUT: join(root, 'forbidden-test-output') });
assert.notEqual(inside.code, 0);
assert.match(inside.output, /outside the repository/);
console.log('PASS test artifacts cannot be written into the repository');

const failed = await run(['scripts/run-browser-e2e.mjs', '--grep', '__intentionally_no_matching_test__'], {
  PANDA_BROWSER_OUTPUT: mkdtempSync(join(tmpdir(), 'pandaoffer-failure-check-')),
});
assert.notEqual(failed.code, 0, failed.output);
assert.match(failed.output, /No tests found/);
assert.match(failed.output, /"previewClosed":true/);
const free = await new Promise(resolve => {
  const socket = connect({ host: '127.0.0.1', port: 4177 });
  socket.once('connect', () => { socket.destroy(); resolve(false); });
  socket.once('error', () => { socket.destroy(); resolve(true); });
  socket.setTimeout(1000, () => { socket.destroy(); resolve(false); });
});
assert.equal(free, true);
console.log('PASS failing browser invocation closes its owned production preview');
