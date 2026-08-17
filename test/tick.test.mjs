import assert from 'node:assert';
import { describe, it } from 'node:test';
import {
  priceToTick,
  priceToTickWithDecimals,
  tickToPrice,
  tickToPriceWithDecimals,
} from '../dist/index.js';

describe('tick math', () => {
  it('tick 0 maps to price 1', () => {
    assert.strictEqual(tickToPrice(0), 1);
  });

  it('price 1 maps to tick 0', () => {
    assert.strictEqual(priceToTick(1), 0);
  });

  it('round-trips a non-zero tick', () => {
    const startTick = 500;
    const price = tickToPrice(startTick);
    const backToTick = priceToTick(price);

    assert.ok(Math.abs(backToTick - startTick) < 1e-6);
  });

  it('throws on non-positive prices', () => {
    assert.throws(() => priceToTick(0), /price must be positive/);
    assert.throws(() => priceToTick(-1), /price must be positive/);
  });

  it('adjusts for token decimals', () => {
    const humanPrice = 1.05;
    const decimals0 = 6;
    const decimals1 = 18;

    const tick = priceToTickWithDecimals(humanPrice, decimals0, decimals1);
    const back = tickToPriceWithDecimals(tick, decimals0, decimals1);

    assert.ok(Math.abs(back - humanPrice) < 1e-9);
  });
});
