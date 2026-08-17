import type { Address } from 'viem';
import { deepstateVaultAbi } from './abis/DeepstateVault';
import type {
  VaultBuyFeesParams,
  VaultDepositParams,
  VaultRedeemAssetsParams,
  VaultRedeemValueParams,
} from './types';

export function buildDeposit(contract: Address, params: VaultDepositParams) {
  const args: [bigint, Address, bigint?] = [params.assets, params.receiver!];
  if (params.minShares !== undefined) {
    args.push(params.minShares);
  }

  return {
    address: contract,
    abi: deepstateVaultAbi,
    functionName: 'deposit' as const,
    args: args as unknown as [bigint, Address] | [bigint, Address, bigint],
  };
}

export function buildRedeemValue(
  contract: Address,
  params: VaultRedeemValueParams,
) {
  return {
    address: contract,
    abi: deepstateVaultAbi,
    functionName: 'redeemValue' as const,
    args: [params.shares, params.receiver!, params.owner!] as unknown as [
      bigint,
      Address,
      Address,
    ],
  };
}

export function buildRedeemAssets(
  contract: Address,
  params: VaultRedeemAssetsParams,
) {
  return {
    address: contract,
    abi: deepstateVaultAbi,
    functionName: 'redeemAssets' as const,
    args: [
      params.shares,
      params.receiver!,
      params.owner!,
      params.tokens,
      params.minimumAmounts ?? new Array(params.tokens.length).fill(0n),
    ] as unknown as [bigint, Address, Address, Address[], bigint[]],
  };
}

export function buildBuyFees(contract: Address, params: VaultBuyFeesParams) {
  return {
    address: contract,
    abi: deepstateVaultAbi,
    functionName: 'buyFees' as const,
    args: [
      params.tokens,
      params.minimumAmounts,
      params.receiver!,
    ] as unknown as [Address[], bigint[], Address],
  };
}
