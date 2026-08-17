import assert from 'node:assert';
import { describe, it } from 'node:test';
import { packOrder, unpackOrder } from '../dist/index.js';

describe('order packing / unpacking', () => {
  it('round-trips a positive order', () => {
    const order = {
      tick: 100,
      quantity: 1_000_000_000_000_000_000n,
      nonce: 42,
      isBid: true,
    };

    const packed = packOrder(order);
    const unpacked = unpackOrder(packed, true);

    assert.strictEqual(unpacked.tick, order.tick);
    assert.strictEqual(unpacked.quantity, order.quantity);
    assert.strictEqual(unpacked.nonce, order.nonce);
    assert.strictEqual(unpacked.isBid, true);
  });

  it('round-trips a negative tick', () => {
    const order = {
      tick: -1234,
      quantity: 5_000_000_000_000_000_000n,
      nonce: 0,
      isBid: false,
    };

    const packed = packOrder(order);
    const unpacked = unpackOrder(packed, false);

    assert.strictEqual(unpacked.tick, order.tick);
    assert.strictEqual(unpacked.quantity, order.quantity);
    assert.strictEqual(unpacked.nonce, 0);
    assert.strictEqual(unpacked.isBid, false);
  });

  it('uses a default nonce of 0', () => {
    const order = { tick: 10, quantity: 100n, isBid: true };
    const packed = packOrder(order);
    const unpacked = unpackOrder(packed, true);

    assert.strictEqual(unpacked.nonce, 0);
  });

  it('produces a 32-byte hex string', () => {
    const packed = packOrder({
      tick: 0,
      quantity: 0n,
      isBid: false,
    });

    assert.strictEqual(packed.length, 66); // 0x + 64 hex chars
  });

  it('rejects quantities outside uint160 range', () => {
    assert.throws(
      () => packOrder({ tick: 0, quantity: 1n << 160n, isBid: false }),
      /quantity must be a uint160/,
    );

    assert.throws(
      () => packOrder({ tick: 0, quantity: -1n, isBid: false }),
      /quantity must be a uint160/,
    );
  });
});
