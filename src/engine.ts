import type { Address, Hex } from 'viem';
import { deepstateV1Abi } from './abis/DeepstateV1';
import type {
  CancelParams,
  FillParams,
  FillWithIntegratorFeeParams,
} from './types';

function toFillArgs(params: FillParams) {
  return [
    params.token0,
    params.token1,
    params.epoch,
    params.order,
    params.isBid,
    params.noRest ?? false,
    params.fillOrKill ?? false,
  ];
}

export function buildFill(contract: Address, params: FillParams) {
  return {
    address: contract,
    abi: deepstateV1Abi,
    functionName: 'fill' as const,
    args: [toFillArgs(params)] as unknown as [FillParams],
    value: params.value,
  };
}

export function buildFillWithIntegratorFee(
  contract: Address,
  params: FillWithIntegratorFeeParams,
) {
  return {
    address: contract,
    abi: deepstateV1Abi,
    functionName: 'fillWithIntegratorFee' as const,
    args: [
      toFillArgs(params.params),
      {
        recipient: params.integratorFee.recipient,
        bps: params.integratorFee.bps,
      },
    ] as unknown as [FillParams, { recipient: Address; bps: number }],
    value: params.params.value,
  };
}

export function buildFillRoute(contract: Address, fills: FillParams[]) {
  return {
    address: contract,
    abi: deepstateV1Abi,
    functionName: 'fillRoute' as const,
    args: [fills.map(toFillArgs)] as unknown as [FillParams[]],
    value: fills.reduce((sum, f) => sum + (f.value ?? 0n), 0n),
  };
}

export function buildFillRouteWithIntegratorFee(
  contract: Address,
  fills: FillParams[],
  integratorFee: { recipient: Address; bps: number },
) {
  return {
    address: contract,
    abi: deepstateV1Abi,
    functionName: 'fillRouteWithIntegratorFee' as const,
    args: [fills.map(toFillArgs), integratorFee] as unknown as [
      FillParams[],
      { recipient: Address; bps: number },
    ],
    value: fills.reduce((sum, f) => sum + (f.value ?? 0n), 0n),
  };
}

export function buildCancel(contract: Address, params: CancelParams) {
  return {
    address: contract,
    abi: deepstateV1Abi,
    functionName: 'cancel' as const,
    args: [
      params.token0,
      params.token1,
      params.epoch,
      params.order,
    ] as unknown as [Address, Address, bigint, Hex],
  };
}
