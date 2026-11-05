// @vitest-environment node
import { createRequire } from 'node:module';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { expect, it } from 'vitest';

const require = createRequire(import.meta.url);
it('retains TypeScript project-service glob semantics with patched minimatch', () => {
  const parser = require('@typescript-eslint/parser');
  const root = mkdtempSync(path.join(tmpdir(), 'pandaoffer-parser-'));
  try {
    mkdirSync(path.join(root, 'src'));
    writeFileSync(path.join(root, 'src', 'included.ts'), 'export const included = true;');
    writeFileSync(path.join(root, 'tsconfig.json'), JSON.stringify({ include: ['src/**/*.ts'] }));
    const source = 'export const answer: number = 42;';
    const options = { filePath: path.join(root, '.fixture.ts'), tsconfigRootDir: root, projectService: { allowDefaultProject: ['*.ts'] } };
    const parsed = parser.parseForESLint(source, options);
    expect(parsed.ast.body[0].type).toBe('ExportNamedDeclaration');
    expect(parsed.services.program.getTypeChecker()).toBeTruthy();
    parser.clearCaches();
    expect(() => parser.parseForESLint(source, { ...options, filePath: path.join(root, 'rejected.ts'), projectService: { allowDefaultProject: ['*.tsx'] } })).toThrow(/not found by the project service|not allowlisted/);
  } finally {
    parser.clearCaches();
    rmSync(root, { recursive: true, force: true });
  }
});
