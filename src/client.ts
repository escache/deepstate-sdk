import { readContract, simulateContract } from 'viem/actions';
import type { Abi, Account, Address, Hash, WalletClient } from 'viem';
import { deepstateV1Abi } from './abis/DeepstateV1';
import {
  buildCancel,
  buildFill,
  buildFillRoute,
  buildFillRouteWithIntegratorFee,
  buildFillWithIntegratorFee,
} from './engine';
import {
  packOrder as packOrderModule,
  unpackOrder as unpackOrderModule,
} from './order';
import {
  getBookId as getBookIdModule,
  getPoolId as getPoolIdModule,
} from './pool';
import {
  buildDistributeRewards,
  buildDistributeRewardsBatch,
  buildRegisterClaimant,
  buildRegisterClaimants,
} from './rewards';
import {
  priceToTick as priceToTickModule,
  priceToTickCeil as priceToTickCeilModule,
  priceToTickCeilWithDecimals as priceToTickCeilWithDecimalsModule,
  priceToTickFloor as priceToTickFloorModule,
  priceToTickFloorWithDecimals as priceToTickFloorWithDecimalsModule,
  priceToTickWithDecimals as priceToTickWithDecimalsModule,
  tickToPrice as tickToPriceModule,
  tickToPriceWithDecimals as tickToPriceWithDecimalsModule,
} from './tick';
import type {
  Addresses,
  CancelParams,
  DistributeRewardsParams,
  FillParams,
  FillWithIntegratorFeeParams,
  Hex,
  IntegratorFee,
  Order,
  OrderReference,
  RewardClaim,
  VaultBuyFeesParams,
  VaultDepositParams,
  VaultRedeemAssetsParams,
  VaultRedeemValueParams,
} from './types';
import {
  buildBuyFees,
  buildDeposit,
  buildRedeemAssets,
  buildRedeemValue,
} from './vault';

export class DeepstateClient {
  constructor(
    public client: WalletClient,
    public addresses: Addresses,
  ) {}

  private get walletClient(): WalletClient {
    if (!this.client.account) {
      throw new Error('Wallet client with a connected account is required');
    }
    return this.client;
  }

  private get account(): Account | Address {
    return this.walletClient.account!;
  }

  private get accountAddress(): Address {
    const account = this.account;
    return typeof account === 'string' ? account : account.address;
  }

  private async write(call: {
    address: Address;
    abi: Abi;
    functionName: string;
    args: readonly unknown[];
    value?: bigint;
  }): Promise<Hash> {
    return this.walletClient.writeContract({
      ...call,
      account: this.account,
      chain: undefined,
    });
  }

  // Engine

  async fill(params: FillParams): Promise<Hash> {
    const call = buildFill(this.addresses.deepstateV1, params);
    return this.write(call);
  }

  async fillWithIntegratorFee(
    params: FillWithIntegratorFeeParams,
  ): Promise<Hash> {
    const call = buildFillWithIntegratorFee(this.addresses.deepstateV1, params);
    return this.write(call);
  }

  async fillRoute(fills: FillParams[]): Promise<Hash> {
    const call = buildFillRoute(this.addresses.deepstateV1, fills);
    return this.write(call);
  }

  async fillRouteWithIntegratorFee(
    fills: FillParams[],
    integratorFee: IntegratorFee,
  ): Promise<Hash> {
    const call = buildFillRouteWithIntegratorFee(
      this.addresses.deepstateV1,
      fills,
      integratorFee,
    );
    return this.write(call);
  }

  async cancel(params: CancelParams): Promise<Hash> {
    const call = buildCancel(this.addresses.deepstateV1, params);
    return this.write(call);
  }

  async simulateFill(params: FillParams): Promise<Hex> {
    const { result } = await simulateContract(this.client, {
      ...buildFill(this.addresses.deepstateV1, params),
      account: this.account,
    });
    return result;
  }

  async simulateFillRoute(fills: FillParams[]): Promise<void> {
    const { result } = await simulateContract(this.client, {
      ...buildFillRoute(this.addresses.deepstateV1, fills),
      account: this.account,
    });
    return result;
  }

  // Rewards

  async registerClaimant(params: OrderReference): Promise<Hash> {
    const call = buildRegisterClaimant(this.addresses.rewarder, params);
    return this.write(call);
  }

  async registerClaimants(orders: OrderReference[]): Promise<Hash> {
    const call = buildRegisterClaimants(this.addresses.rewarder, orders);
    return this.write(call);
  }

  async distributeRewards(params: DistributeRewardsParams): Promise<Hash> {
    const call = buildDistributeRewards(this.addresses.rewarder, params);
    return this.write(call);
  }

  async distributeRewardsBatch(claims: RewardClaim[]): Promise<Hash> {
    const call = buildDistributeRewardsBatch(this.addresses.rewarder, claims);
    return this.write(call);
  }

  // Vault

  async deposit(
    assets: bigint,
    options?: { receiver?: Address; minShares?: bigint },
  ): Promise<Hash> {
    const params: VaultDepositParams = {
      assets,
      receiver: options?.receiver ?? this.accountAddress,
      minShares: options?.minShares,
    };
    const call = buildDeposit(this.addresses.deepstateVault, params);
    return this.write(call);
  }

  async redeemValue(
    shares: bigint,
    options?: { receiver?: Address; owner?: Address },
  ): Promise<Hash> {
    const params: VaultRedeemValueParams = {
      shares,
      receiver: options?.receiver ?? this.accountAddress,
      owner: options?.owner ?? this.accountAddress,
    };
    const call = buildRedeemValue(this.addresses.deepstateVault, params);
    return this.write(call);
  }

  async redeemAssets(
    shares: bigint,
    tokens: Address[],
    options?: {
      minimumAmounts?: bigint[];
      receiver?: Address;
      owner?: Address;
    },
  ): Promise<Hash> {
    const params: VaultRedeemAssetsParams = {
      shares,
      tokens,
      minimumAmounts:
        options?.minimumAmounts ?? new Array(tokens.length).fill(0n),
      receiver: options?.receiver ?? this.accountAddress,
      owner: options?.owner ?? this.accountAddress,
    };
    const call = buildRedeemAssets(this.addresses.deepstateVault, params);
    return this.write(call);
  }

  async buyFees(
    tokens: Address[],
    minimumAmounts: bigint[],
    options?: { receiver?: Address },
  ): Promise<Hash> {
    const params: VaultBuyFeesParams = {
      tokens,
      minimumAmounts,
      receiver: options?.receiver ?? this.accountAddress,
    };
    const call = buildBuyFees(this.addresses.deepstateVault, params);
    return this.write(call);
  }

  // Helpers

  getPoolId(tokenA: Address, tokenB: Address): Hex {
    return getPoolIdModule(tokenA, tokenB);
  }

  getBookId(tokenA: Address, tokenB: Address, epoch: bigint): Hex {
    return getBookIdModule(tokenA, tokenB, epoch);
  }

  packOrder(order: Order): Hex {
    return packOrderModule(order);
  }

  unpackOrder(packed: Hex, isBid = false): Order {
    return unpackOrderModule(packed, isBid);
  }

  priceToTick(price: number): number {
    return priceToTickModule(price);
  }

  tickToPrice(tick: number): number {
    return tickToPriceModule(tick);
  }

  priceToTickWithDecimals(
    price: number,
    decimals0: number,
    decimals1: number,
  ): number {
    return priceToTickWithDecimalsModule(price, decimals0, decimals1);
  }

  tickToPriceWithDecimals(
    tick: number,
    decimals0: number,
    decimals1: number,
  ): number {
    return tickToPriceWithDecimalsModule(tick, decimals0, decimals1);
  }

  priceToTickFloor(price: number): number {
    return priceToTickFloorModule(price);
  }

  priceToTickCeil(price: number): number {
    return priceToTickCeilModule(price);
  }

  priceToTickFloorWithDecimals(
    price: number,
    decimals0: number,
    decimals1: number,
  ): number {
    return priceToTickFloorWithDecimalsModule(price, decimals0, decimals1);
  }

  priceToTickCeilWithDecimals(
    price: number,
    decimals0: number,
    decimals1: number,
  ): number {
    return priceToTickCeilWithDecimalsModule(price, decimals0, decimals1);
  }

  // Read helpers

  async poolEpoch(poolId: Hex): Promise<bigint> {
    return await readContract(this.client, {
      address: this.addresses.deepstateV1,
      abi: deepstateV1Abi,
      functionName: 'poolEpoch',
      args: [poolId],
    });
  }

  async nextNonce(
    token0: Address,
    token1: Address,
    epoch: bigint,
  ): Promise<number> {
    return await readContract(this.client, {
      address: this.addresses.deepstateV1,
      abi: deepstateV1Abi,
      functionName: 'nextNonce',
      args: [token0, token1, epoch],
    });
  }

  async activeBookId(token0: Address, token1: Address): Promise<Hex> {
    return await readContract(this.client, {
      address: this.addresses.deepstateV1,
      abi: deepstateV1Abi,
      functionName: 'activeBookId',
      args: [token0, token1],
    });
  }
}
