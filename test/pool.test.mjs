import assert from 'node:assert';
import { describe, it } from 'node:test';
import { getBookId, getPoolId, sortTokens } from '../dist/index.js';

const TOKEN_A = '0x0000000000000000000000000000000000000001';
const TOKEN_B = '0x0000000000000000000000000000000000000002';

describe('pool helpers', () => {
  it('sorts tokens into canonical order', () => {
    const [token0, token1] = sortTokens(TOKEN_B, TOKEN_A);
    assert.strictEqual(token0.toLowerCase(), TOKEN_A.toLowerCase());
    assert.strictEqual(token1.toLowerCase(), TOKEN_B.toLowerCase());
  });

  it('getPoolId is symmetric', () => {
    const idAB = getPoolId(TOKEN_A, TOKEN_B);
    const idBA = getPoolId(TOKEN_B, TOKEN_A);

    assert.strictEqual(idAB, idBA);
    assert.match(idAB, /^0x[0-9a-f]{64}$/i);
  });

  it('getBookId returns a 32-byte hash', () => {
    const id = getBookId(TOKEN_A, TOKEN_B, 1n);
    assert.match(id, /^0x[0-9a-f]{64}$/i);
  });
});
