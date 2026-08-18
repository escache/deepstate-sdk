import type { Address } from 'viem';
import { deepstateVaultAbi } from './abis/DeepstateVault';
import type {
  VaultBuyFeesParams,
  VaultDepositParams,
  VaultRedeemAssetsParams,
  VaultRedeemValueParams,
} from './types';

export function buildDeposit(
  contract: Address,
  params: VaultDepositParams,
): {
  address: Address;
  abi: typeof deepstateVaultAbi;
  functionName: 'deposit';
  args: [bigint, Address, bigint?];
} {
  if (!params.receiver) {
    throw new Error('receiver is required');
  }

  const args: [bigint, Address, bigint?] = [params.assets, params.receiver];
  if (params.minShares !== undefined) {
    args.push(params.minShares);
  }

  return {
    address: contract,
    abi: deepstateVaultAbi,
    functionName: 'deposit',
    args,
  };
}

export function buildRedeemValue(
  contract: Address,
  params: VaultRedeemValueParams,
): {
  address: Address;
  abi: typeof deepstateVaultAbi;
  functionName: 'redeemValue';
  args: [bigint, Address, Address];
} {
  if (!params.receiver || !params.owner) {
    throw new Error('receiver and owner are required');
  }

  return {
    address: contract,
    abi: deepstateVaultAbi,
    functionName: 'redeemValue',
    args: [params.shares, params.receiver, params.owner],
  };
}

export function buildRedeemAssets(
  contract: Address,
  params: VaultRedeemAssetsParams,
): {
  address: Address;
  abi: typeof deepstateVaultAbi;
  functionName: 'redeemAssets';
  args: [bigint, Address, Address, Address[], bigint[]];
} {
  if (!params.receiver || !params.owner) {
    throw new Error('receiver and owner are required');
  }

  return {
    address: contract,
    abi: deepstateVaultAbi,
    functionName: 'redeemAssets',
    args: [
      params.shares,
      params.receiver,
      params.owner,
      params.tokens,
      params.minimumAmounts ?? new Array(params.tokens.length).fill(0n),
    ],
  };
}

export function buildBuyFees(
  contract: Address,
  params: VaultBuyFeesParams,
): {
  address: Address;
  abi: typeof deepstateVaultAbi;
  functionName: 'buyFees';
  args: [Address[], bigint[], Address];
} {
  if (!params.receiver) {
    throw new Error('receiver is required');
  }

  return {
    address: contract,
    abi: deepstateVaultAbi,
    functionName: 'buyFees',
    args: [params.tokens, params.minimumAmounts, params.receiver],
  };
}
