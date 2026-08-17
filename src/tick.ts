const TWO_POW_31 = 2_147_483_648; // 2^31
const LOG_BASE = 96 / TWO_POW_31;

/**
 * Convert a protocol tick to a price.
 *
 * price = 2^(96 * tick / 2^31)
 */
export function tickToPrice(tick: number): number {
  return 2 ** (LOG_BASE * tick);
}

/**
 * Convert a price to a protocol tick.
 *
 * tick = log2(price) * 2^31 / 96
 */
export function priceToTick(price: number): number {
  if (price <= 0) {
    throw new RangeError('price must be positive');
  }
  return (Math.log2(price) * TWO_POW_31) / 96;
}

/**
 * Convert a human-readable price to a tick, accounting for token decimals.
 *
 * @param humanPrice price of token0 in terms of token1 (decimal adjusted)
 * @param decimals0 decimals of token0
 * @param decimals1 decimals of token1
 */
export function priceToTickWithDecimals(
  humanPrice: number,
  decimals0: number,
  decimals1: number,
): number {
  const scale = 10 ** (decimals1 - decimals0);
  const contractPrice = humanPrice * scale;
  return priceToTick(contractPrice);
}

/**
 * Convert a protocol tick to a human-readable price, accounting for token decimals.
 *
 * @param tick protocol tick
 * @param decimals0 decimals of token0
 * @param decimals1 decimals of token1
 */
export function tickToPriceWithDecimals(
  tick: number,
  decimals0: number,
  decimals1: number,
): number {
  const contractPrice = tickToPrice(tick);
  const scale = 10 ** (decimals1 - decimals0);
  return contractPrice / scale;
}

/**
 * Round a computed tick down to the next valid integer tick.
 */
export function priceToTickFloor(price: number): number {
  return Math.floor(priceToTick(price));
}

/**
 * Round a computed tick up to the next valid integer tick.
 */
export function priceToTickCeil(price: number): number {
  return Math.ceil(priceToTick(price));
}
