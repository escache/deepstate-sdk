import type { Address, Hex } from 'viem';
import { deepstateV1Abi } from './abis/DeepstateV1';
import type {
  CancelParams,
  FillParams,
  FillWithIntegratorFeeParams,
} from './types';

type FillArgs = {
  token0: Address;
  token1: Address;
  epoch: bigint;
  order: Hex;
  isBid: boolean;
  noRest: boolean;
  fillOrKill: boolean;
};

function toFillArgs(params: FillParams): FillArgs {
  return {
    token0: params.token0,
    token1: params.token1,
    epoch: params.epoch,
    order: params.order,
    isBid: params.isBid,
    noRest: params.noRest ?? false,
    fillOrKill: params.fillOrKill ?? false,
  };
}

export function buildFill(
  contract: Address,
  params: FillParams,
): {
  address: Address;
  abi: typeof deepstateV1Abi;
  functionName: 'fill';
  args: [FillArgs];
  value?: bigint;
} {
  return {
    address: contract,
    abi: deepstateV1Abi,
    functionName: 'fill',
    args: [toFillArgs(params)],
    value: params.value,
  };
}

export function buildFillWithIntegratorFee(
  contract: Address,
  params: FillWithIntegratorFeeParams,
): {
  address: Address;
  abi: typeof deepstateV1Abi;
  functionName: 'fillWithIntegratorFee';
  args: [FillArgs, { recipient: Address; bps: number }];
  value?: bigint;
} {
  return {
    address: contract,
    abi: deepstateV1Abi,
    functionName: 'fillWithIntegratorFee',
    args: [
      toFillArgs(params.params),
      {
        recipient: params.integratorFee.recipient,
        bps: params.integratorFee.bps,
      },
    ],
    value: params.params.value,
  };
}

export function buildFillRoute(
  contract: Address,
  fills: FillParams[],
): {
  address: Address;
  abi: typeof deepstateV1Abi;
  functionName: 'fillRoute';
  args: [FillArgs[]];
  value: bigint;
} {
  return {
    address: contract,
    abi: deepstateV1Abi,
    functionName: 'fillRoute',
    args: [fills.map(toFillArgs)],
    value: fills.reduce((sum, f) => sum + (f.value ?? 0n), 0n),
  };
}

export function buildFillRouteWithIntegratorFee(
  contract: Address,
  fills: FillParams[],
  integratorFee: { recipient: Address; bps: number },
): {
  address: Address;
  abi: typeof deepstateV1Abi;
  functionName: 'fillRouteWithIntegratorFee';
  args: [FillArgs[], { recipient: Address; bps: number }];
  value: bigint;
} {
  return {
    address: contract,
    abi: deepstateV1Abi,
    functionName: 'fillRouteWithIntegratorFee',
    args: [fills.map(toFillArgs), integratorFee],
    value: fills.reduce((sum, f) => sum + (f.value ?? 0n), 0n),
  };
}

export function buildCancel(
  contract: Address,
  params: CancelParams,
): {
  address: Address;
  abi: typeof deepstateV1Abi;
  functionName: 'cancel';
  args: [Address, Address, bigint, Hex];
} {
  return {
    address: contract,
    abi: deepstateV1Abi,
    functionName: 'cancel',
    args: [params.token0, params.token1, params.epoch, params.order],
  };
}
