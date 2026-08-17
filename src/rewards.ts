import type { Address, Hex } from 'viem';
import { rewarderAbi } from './abis/Rewarder';
import type {
  DistributeRewardsParams,
  OrderReference,
  RewardClaim,
} from './types';

export function buildRegisterClaimant(
  contract: Address,
  params: OrderReference,
) {
  return {
    address: contract,
    abi: rewarderAbi,
    functionName: 'registerClaimant' as const,
    args: [params.bookId, params.order] as unknown as [Hex, Hex],
  };
}

export function buildRegisterClaimants(
  contract: Address,
  orders: OrderReference[],
) {
  return {
    address: contract,
    abi: rewarderAbi,
    functionName: 'registerClaimants' as const,
    args: [orders.map((o) => [o.bookId, o.order])] as unknown as [[Hex, Hex][]],
  };
}

export function buildDistributeRewards(
  contract: Address,
  params: DistributeRewardsParams,
) {
  return {
    address: contract,
    abi: rewarderAbi,
    functionName: 'distributeRewards' as const,
    args: [params.bookId, params.order, params.token] as unknown as [
      Hex,
      Hex,
      Address,
    ],
  };
}

export function buildDistributeRewardsBatch(
  contract: Address,
  claims: RewardClaim[],
) {
  return {
    address: contract,
    abi: rewarderAbi,
    functionName: 'distributeRewardsBatch' as const,
    args: [claims.map((c) => [c.bookId, c.order, c.token])] as unknown as [
      [Hex, Hex, Address][],
    ],
  };
}
