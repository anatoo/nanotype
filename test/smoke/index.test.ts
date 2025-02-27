import { describe, test, expect } from 'bun:test';

// ESMのインポートテスト
describe('ESM build smoke test', () => {
  test('should import ESM build successfully', async () => {
    const esm = await import('../../');
    expect(esm).toBeDefined();
    expect(typeof esm.string).toBe('function');
    expect(typeof esm.number).toBe('function');
    expect(typeof esm.boolean).toBe('function');
  });
});

// CJSのインポートテスト
describe('CJS build smoke test', () => {
  test('should import CJS build successfully', () => {
    const cjs = require('../../');
    expect(cjs).toBeDefined();
    expect(typeof cjs.string).toBe('function');
    expect(typeof cjs.number).toBe('function');
    expect(typeof cjs.boolean).toBe('function');
  });
}); 