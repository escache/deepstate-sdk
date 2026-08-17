import type { Abi } from 'viem';

export const rewarderAbi: Abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'deepstate_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'rewardToken_',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'poolId_',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'token0_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'token1_',
        type: 'address',
      },
      {
        internalType: 'uint96',
        name: 'sideEmissionCap_',
        type: 'uint96',
      },
      {
        internalType: 'uint32',
        name: 'emissionDuration_',
        type: 'uint32',
      },
      {
        internalType: 'uint160',
        name: 'token0StartQuantity_',
        type: 'uint160',
      },
      {
        internalType: 'uint160',
        name: 'token0MaxQuantity_',
        type: 'uint160',
      },
      {
        internalType: 'uint160',
        name: 'token1StartQuantity_',
        type: 'uint160',
      },
      {
        internalType: 'uint160',
        name: 'token1MaxQuantity_',
        type: 'uint160',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'AlreadyInitialized',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ClaimantMismatch',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EmptyBatch',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidDeepstate',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidEmissionSchedule',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidHookToken',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidOwner',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidPool',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidQuantitySchedule',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidRewardToken',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NewOwnerIsZeroAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NoHandoverRequest',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NoOrderOwner',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotDeepstate',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'SafeERC20FailedOperation',
    type: 'error',
  },
  {
    inputs: [],
    name: 'Unauthorized',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'orderId',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'claimant',
        type: 'address',
      },
    ],
    name: 'ClaimantRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipHandoverCanceled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipHandoverRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oldOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'bookId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'order',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'RewardsDistributed',
    type: 'event',
  },
  {
    inputs: [],
    name: 'EMISSION_TIME_CONSTANT',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'QUANTITY_RAMP_PERIOD',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'bookId',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint32',
        name: 'orderNonce',
        type: 'uint32',
      },
    ],
    name: 'balances',
    outputs: [
      {
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cancelOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'orderId',
        type: 'bytes32',
      },
    ],
    name: 'claimants',
    outputs: [
      {
        internalType: 'address',
        name: 'claimant',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'completeOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'timestamp_',
        type: 'uint256',
      },
    ],
    name: 'cumulativeEmissionsAt',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'elapsed',
        type: 'uint256',
      },
    ],
    name: 'cumulativeEmissionsAtElapsed',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'deepstate',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'bookId',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'order',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'distributeRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'bookId',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'order',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address',
          },
        ],
        internalType: 'struct DeepstateRewarder.RewardClaim[]',
        name: 'claims',
        type: 'tuple[]',
      },
    ],
    name: 'distributeRewardsBatch',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'emissionDuration',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'emissionLogDenominatorWad',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'emissionStart',
    outputs: [
      {
        internalType: 'uint64',
        name: 'activatedAt',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'end',
        type: 'uint256',
      },
    ],
    name: 'emissionsBetween',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'poolId_',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'bookId',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint160',
        name: 'outgoingAmount',
        type: 'uint160',
      },
      {
        internalType: 'uint32',
        name: 'incomingOrderNonce',
        type: 'uint32',
      },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'timestamp_',
        type: 'uint256',
      },
    ],
    name: 'fullRewardQuantityAt',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'elapsed',
        type: 'uint256',
      },
    ],
    name: 'fullRewardQuantityAtElapsed',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: 'result',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'ownershipHandoverExpiresAt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'result',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'poolId',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'end',
        type: 'uint256',
      },
      {
        internalType: 'uint160',
        name: 'amount',
        type: 'uint160',
      },
    ],
    name: 'previewReward',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'end',
        type: 'uint256',
      },
      {
        internalType: 'uint160',
        name: 'amount',
        type: 'uint160',
      },
    ],
    name: 'previewRewardAtElapsed',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'bookId',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'order',
        type: 'bytes32',
      },
    ],
    name: 'registerClaimant',
    outputs: [
      {
        internalType: 'address',
        name: 'claimant',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'bookId',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'order',
            type: 'bytes32',
          },
        ],
        internalType: 'struct DeepstateRewarder.OrderReference[]',
        name: 'orders',
        type: 'tuple[]',
      },
    ],
    name: 'registerClaimants',
    outputs: [
      {
        internalType: 'address',
        name: 'claimant',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'requestOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'rewardeeBookId',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'rewardees',
    outputs: [
      {
        internalType: 'uint32',
        name: 'orderNonce',
        type: 'uint32',
      },
      {
        internalType: 'uint64',
        name: 'startedAt',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'sideEmissionCap',
    outputs: [
      {
        internalType: 'uint96',
        name: '',
        type: 'uint96',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token0',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token0MaxQuantity',
    outputs: [
      {
        internalType: 'uint160',
        name: '',
        type: 'uint160',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token0QuantityLogWad',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token0StartQuantity',
    outputs: [
      {
        internalType: 'uint160',
        name: '',
        type: 'uint160',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token1',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token1MaxQuantity',
    outputs: [
      {
        internalType: 'uint160',
        name: '',
        type: 'uint160',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token1QuantityLogWad',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token1StartQuantity',
    outputs: [
      {
        internalType: 'uint160',
        name: '',
        type: 'uint160',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'totalAccrued',
    outputs: [
      {
        internalType: 'uint96',
        name: 'accrued',
        type: 'uint96',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as unknown as Abi;
