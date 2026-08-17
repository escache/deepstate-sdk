import { type Address, type Hex, encodePacked, keccak256 } from 'viem';

/**
 * Sort two token addresses into canonical (token0, token1) order.
 */
export function sortTokens(
  tokenA: Address,
  tokenB: Address,
): [Address, Address] {
  const a = tokenA.toLowerCase() as Address;
  const b = tokenB.toLowerCase() as Address;
  return a < b ? [a, b] : [b, a];
}

/**
 * Compute a pool ID from two token addresses.
 *
 * Matches the `poolId(token0, token1)` pure function on the DeepstateV1
 * router: `keccak256(token0, token1)`.
 */
export function getPoolId(tokenA: Address, tokenB: Address): Hex {
  const [token0, token1] = sortTokens(tokenA, tokenB);
  return keccak256(encodePacked(['address', 'address'], [token0, token1]));
}

/**
 * Compute a book ID for a specific token pair and epoch.
 *
 * Matches the `bookId(token0, token1, epoch)` pure function on the
 * DeepstateV1 router: `keccak256(token0, token1, epoch)`.
 */
export function getBookId(
  tokenA: Address,
  tokenB: Address,
  epoch: bigint,
): Hex {
  const [token0, token1] = sortTokens(tokenA, tokenB);
  return keccak256(
    encodePacked(['address', 'address', 'uint256'], [token0, token1, epoch]),
  );
}
