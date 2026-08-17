import type { Address } from 'viem';

export type Hex = `0x${string}`;

export interface Addresses {
  deepstateV1: Address;
  deepstateVault: Address;
  rewarder: Address;
  deepToken?: Address;
  governor?: Address;
}

export interface Order {
  /** Signed 32-bit integer tick. */
  tick: number;
  quantity: bigint;
  /** Optional 32-bit unsigned nonce. Defaults to 0. */
  nonce?: number;
  isBid: boolean;
}

export interface FillParams {
  token0: Address;
  token1: Address;
  epoch: bigint;
  order: Hex;
  isBid: boolean;
  noRest?: boolean;
  fillOrKill?: boolean;
  value?: bigint;
}

export interface IntegratorFee {
  recipient: Address;
  bps: number;
}

export interface FillWithIntegratorFeeParams {
  params: FillParams;
  integratorFee: IntegratorFee;
}

export interface CancelParams {
  token0: Address;
  token1: Address;
  epoch: bigint;
  order: Hex;
}

export interface OrderReference {
  bookId: Hex;
  order: Hex;
}

export interface RegisterClaimantParams extends OrderReference {}

export interface DistributeRewardsParams {
  bookId: Hex;
  order: Hex;
  token: Address;
}

export interface RewardClaim {
  bookId: Hex;
  order: Hex;
  token: Address;
}

export interface VaultDepositParams {
  assets: bigint;
  receiver?: Address;
  minShares?: bigint;
}

export interface VaultRedeemValueParams {
  shares: bigint;
  receiver?: Address;
  owner?: Address;
}

export interface VaultRedeemAssetsParams {
  shares: bigint;
  tokens: Address[];
  minimumAmounts?: bigint[];
  receiver?: Address;
  owner?: Address;
}

export interface VaultBuyFeesParams {
  tokens: Address[];
  minimumAmounts: bigint[];
  receiver?: Address;
}
