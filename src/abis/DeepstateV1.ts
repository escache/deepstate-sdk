import type { Abi } from 'viem';

export const deepstateV1Abi = [
  {
    inputs: [],
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
    name: 'DeltaOverflow',
    type: 'error',
  },
  {
    inputs: [],
    name: 'DuplicateOrder',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EpochExhausted',
    type: 'error',
  },
  {
    inputs: [],
    name: 'FillOrKill',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidBook',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidFeeConfig',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidHook',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidNativeValue',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidOrder',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidToken',
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
    name: 'NonceExhausted',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotOrderOwner',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ReentrantCall',
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
        indexed: false,
        internalType: 'bytes32',
        name: 'bookId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'restingNode',
        type: 'bytes32',
      },
    ],
    name: 'AskMatched',
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
        name: 'subtreeRoot',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint160',
        name: 'quantity',
        type: 'uint160',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteAmount',
        type: 'uint256',
      },
    ],
    name: 'AskSubtreeMatched',
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
        internalType: 'bytes32[]',
        name: 'restingNodes',
        type: 'bytes32[]',
      },
    ],
    name: 'AsksMatched',
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
        name: 'restingNode',
        type: 'bytes32',
      },
    ],
    name: 'BidMatched',
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
        name: 'subtreeRoot',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint160',
        name: 'quantity',
        type: 'uint160',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteAmount',
        type: 'uint256',
      },
    ],
    name: 'BidSubtreeMatched',
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
        internalType: 'bytes32[]',
        name: 'restingNodes',
        type: 'bytes32[]',
      },
    ],
    name: 'BidsMatched',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'poolId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'bookId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'epoch',
        type: 'uint256',
      },
    ],
    name: 'BookInitialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'bps',
        type: 'uint16',
      },
    ],
    name: 'FeeConfigured',
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
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'baseAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteAmount',
        type: 'uint256',
      },
    ],
    name: 'OrderCancelled',
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
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isBid',
        type: 'bool',
      },
    ],
    name: 'OrderRested',
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
        name: 'poolId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'hook',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'token0Active',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'token1Active',
        type: 'bool',
      },
    ],
    name: 'PoolHookConfigured',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token0',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'token1',
        type: 'address',
      },
    ],
    name: 'activeBookId',
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
        name: 'token0',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'token1',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'epoch',
        type: 'uint256',
      },
    ],
    name: 'bookId',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token0',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'token1',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'epoch',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'order',
        type: 'bytes32',
      },
    ],
    name: 'cancel',
    outputs: [
      {
        internalType: 'uint256',
        name: 'baseAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'quoteAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
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
    inputs: [],
    name: 'feeConfig',
    outputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint16',
        name: 'bps',
        type: 'uint16',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'token0',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token1',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epoch',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'order',
            type: 'bytes32',
          },
          {
            internalType: 'bool',
            name: 'isBid',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'noRest',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'fillOrKill',
            type: 'bool',
          },
        ],
        internalType: 'struct DeepstateV1.FillParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'fill',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'restingOrder',
        type: 'bytes32',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'token0',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token1',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epoch',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'order',
            type: 'bytes32',
          },
          {
            internalType: 'bool',
            name: 'isBid',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'noRest',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'fillOrKill',
            type: 'bool',
          },
        ],
        internalType: 'struct DeepstateV1.FillParams[]',
        name: 'fills',
        type: 'tuple[]',
      },
    ],
    name: 'fillRoute',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'token0',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token1',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epoch',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'order',
            type: 'bytes32',
          },
          {
            internalType: 'bool',
            name: 'isBid',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'noRest',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'fillOrKill',
            type: 'bool',
          },
        ],
        internalType: 'struct DeepstateV1.FillParams[]',
        name: 'fills',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: 'bps',
            type: 'uint16',
          },
        ],
        internalType: 'struct DeepstateV1.IntegratorFee',
        name: 'integratorFee',
        type: 'tuple',
      },
    ],
    name: 'fillRouteWithIntegratorFee',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'token0',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token1',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'epoch',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'order',
            type: 'bytes32',
          },
          {
            internalType: 'bool',
            name: 'isBid',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'noRest',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'fillOrKill',
            type: 'bool',
          },
        ],
        internalType: 'struct DeepstateV1.FillParams',
        name: 'params',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint16',
            name: 'bps',
            type: 'uint16',
          },
        ],
        internalType: 'struct DeepstateV1.IntegratorFee',
        name: 'integratorFee',
        type: 'tuple',
      },
    ],
    name: 'fillWithIntegratorFee',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'restingOrder',
        type: 'bytes32',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'orderKey',
        type: 'bytes32',
      },
    ],
    name: 'isBidOrder',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token0',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'token1',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'epoch',
        type: 'uint256',
      },
    ],
    name: 'nextNonce',
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
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'order',
        type: 'bytes32',
      },
    ],
    name: 'orderId',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
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
        internalType: 'bytes32',
        name: 'orderKey',
        type: 'bytes32',
      },
    ],
    name: 'ownerOfOrder',
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
    inputs: [
      {
        internalType: 'bytes32',
        name: 'pid',
        type: 'bytes32',
      },
    ],
    name: 'poolEpoch',
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
        name: 'poolId',
        type: 'bytes32',
      },
    ],
    name: 'poolHook',
    outputs: [
      {
        internalType: 'address',
        name: 'hook',
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
        name: 'token0',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'token1',
        type: 'address',
      },
    ],
    name: 'poolId',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
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
    inputs: [
      {
        internalType: 'address',
        name: 'token0',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'token1',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'epoch',
        type: 'uint256',
      },
    ],
    name: 'roots',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'askRoot',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'bidRoot',
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
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint16',
        name: 'bps',
        type: 'uint16',
      },
    ],
    name: 'setFeeConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token0',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'token1',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'hook',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'token0Active',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'token1Active',
        type: 'bool',
      },
    ],
    name: 'setPoolHookConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        internalType: 'bool',
        name: 'isBid',
        type: 'bool',
      },
    ],
    name: 'topOrder',
    outputs: [
      {
        internalType: 'uint32',
        name: 'nonce',
        type: 'uint32',
      },
      {
        internalType: 'uint160',
        name: 'soldAmount',
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
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'tree',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'leftNode',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'rightNode',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const satisfies Abi;
