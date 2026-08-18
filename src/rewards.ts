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
): {
  address: Address;
  abi: typeof rewarderAbi;
  functionName: 'registerClaimant';
  args: [Hex, Hex];
} {
  return {
    address: contract,
    abi: rewarderAbi,
    functionName: 'registerClaimant',
    args: [params.bookId, params.order],
  };
}

export function buildRegisterClaimants(
  contract: Address,
  orders: OrderReference[],
): {
  address: Address;
  abi: typeof rewarderAbi;
  functionName: 'registerClaimants';
  args: [OrderReference[]];
} {
  return {
    address: contract,
    abi: rewarderAbi,
    functionName: 'registerClaimants',
    args: [orders],
  };
}

export function buildDistributeRewards(
  contract: Address,
  params: DistributeRewardsParams,
): {
  address: Address;
  abi: typeof rewarderAbi;
  functionName: 'distributeRewards';
  args: [Hex, Hex, Address];
} {
  return {
    address: contract,
    abi: rewarderAbi,
    functionName: 'distributeRewards',
    args: [params.bookId, params.order, params.token],
  };
}

export function buildDistributeRewardsBatch(
  contract: Address,
  claims: RewardClaim[],
): {
  address: Address;
  abi: typeof rewarderAbi;
  functionName: 'distributeRewardsBatch';
  args: [RewardClaim[]];
} {
  return {
    address: contract,
    abi: rewarderAbi,
    functionName: 'distributeRewardsBatch',
    args: [claims],
  };
}
