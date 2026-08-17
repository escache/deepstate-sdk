import type { Hex, Order } from './types';

const MASK_32 = (1n << 32n) - 1n;
const MASK_160 = (1n << 160n) - 1n;
const QUANTITY_OFFSET = 64n;
const TICK_OFFSET = 224n;

/**
 * Pack an Order into the contract's bytes32 representation.
 *
 * Layout (most-significant to least-significant):
 * - bits 224-255: signed 32-bit tick (two's complement)
 * - bits 64-223:  160-bit quantity
 * - bits 0-31:    32-bit nonce
 *
 * Bits 32-63 are reserved/unused by this encoding. `isBid` is not
 * encoded in the packed order; it is determined by the calling method.
 *
 * For `fill` calls the nonce bits must be zero because the engine assigns
 * a nonce only when an order rests. For `cancel`, `registerClaimant`, and
 * `distributeRewards` the nonce must match the resting order returned by
 * the contract.
 */
export function packOrder(order: Order): Hex {
  if (order.quantity < 0n || order.quantity >= 1n << 160n) {
    throw new RangeError('quantity must be a uint160');
  }

  const nonce = BigInt.asUintN(32, BigInt(order.nonce ?? 0));
  const quantity = BigInt.asUintN(160, order.quantity);
  const tick = BigInt.asUintN(32, BigInt(order.tick));

  const packed = (tick << TICK_OFFSET) | (quantity << QUANTITY_OFFSET) | nonce;

  return `0x${packed.toString(16).padStart(64, '0')}` as Hex;
}

/**
 * Unpack a bytes32 order.
 *
 * Note: `isBid` cannot be recovered from the packed format and defaults
 * to the provided value. The caller should set it based on context.
 */
export function unpackOrder(packed: Hex, isBid = false): Order {
  const value = BigInt(packed);

  const nonce = Number(value & MASK_32);
  const quantity = (value >> QUANTITY_OFFSET) & MASK_160;
  const tickRaw = (value >> TICK_OFFSET) & MASK_32;
  const tick =
    tickRaw >= 2n ** 31n ? Number(tickRaw - 2n ** 32n) : Number(tickRaw);

  return {
    tick,
    quantity,
    nonce,
    isBid,
  };
}
