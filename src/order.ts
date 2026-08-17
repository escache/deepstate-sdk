import type { Hex, Order } from './types';

const MASK_32 = (1n << 32n) - 1n;
const MASK_160 = (1n << 160n) - 1n;
const QUANTITY_OFFSET = 64n;
const TICK_OFFSET = 224n;

const MIN_INT32 = -2_147_483_648;
const MAX_INT32 = 2_147_483_647;
const MAX_UINT32 = 4_294_967_295;

function assertInteger(value: number, name: string): void {
  if (!Number.isInteger(value)) {
    throw new RangeError(`${name} must be an integer`);
  }
}

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

  assertInteger(order.tick, 'tick');
  if (order.tick < MIN_INT32 || order.tick > MAX_INT32) {
    throw new RangeError(
      `tick must be an int32 (${MIN_INT32} to ${MAX_INT32})`,
    );
  }

  const nonce = order.nonce ?? 0;
  assertInteger(nonce, 'nonce');
  if (nonce < 0 || nonce > MAX_UINT32) {
    throw new RangeError(`nonce must be a uint32 (0 to ${MAX_UINT32})`);
  }

  const packedNonce = BigInt.asUintN(32, BigInt(nonce));
  const quantity = BigInt.asUintN(160, order.quantity);
  const tick = BigInt.asUintN(32, BigInt(order.tick));

  const packed =
    (tick << TICK_OFFSET) | (quantity << QUANTITY_OFFSET) | packedNonce;

  return `0x${packed.toString(16).padStart(64, '0')}` as Hex;
}

/**
 * Unpack a bytes32 order.
 *
 * Note: `isBid` cannot be recovered from the packed format and defaults
 * to the provided value. The caller should set it based on context.
 */
export function unpackOrder(packed: Hex, isBid = false): Order {
  if (!/^0x[0-9a-fA-F]{64}$/.test(packed)) {
    throw new RangeError('packed order must be a 32-byte hex string');
  }

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
