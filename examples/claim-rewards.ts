import { http, type Address, createWalletClient, defineChain } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { DeepstateClient } from '../src/index';

const robinhoodChain = defineChain({
  id: 4663,
  name: 'Robinhood Chain',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.mainnet.chain.robinhood.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://robinhoodchain.blockscout.com',
    },
  },
});

const PRIVATE_KEY = process.env.PRIVATE_KEY as `0x${string}`;
if (!PRIVATE_KEY) {
  throw new Error('Set PRIVATE_KEY env var');
}

const account = privateKeyToAccount(PRIVATE_KEY);

const walletClient = createWalletClient({
  account,
  chain: robinhoodChain,
  transport: http(robinhoodChain.rpcUrls.default.http[0]),
});

const USDG = '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168' as Address;
const NVDA = '0xd0601CE157Db5bdC3162BbaC2a2C8aF5320D9EEC' as Address;

// Contract requires sorted tokens: token0 < token1.
const token0 = USDG;
const token1 = NVDA;

const client = new DeepstateClient(walletClient, {
  deepstateV1: '0x6cf19308C22FC82ea620Fa0B3E94948d20f27B96' as Address,
  deepstateVault: '0xbfb7b3Ff3D498a559b946B836d26F0E168f273D5' as Address,
  rewarder: '0xE85ADBC03a6b52a2c9894c1BB525eC883ea156D7' as Address,
});

async function main() {
  const poolId = client.getPoolId(token0, token1);
  const epoch = await client.poolEpoch(poolId);
  const bookId = client.getBookId(token0, token1, epoch);

  // This must be the packed resting order returned by fill/simulateFill,
  // not the original incoming order. Its nonce field is set by the engine.
  const order = '0x...' as `0x${string}`;

  // Register once before the order is cancelled or the reward is distributed.
  await client.registerClaimant({ bookId, order });

  // Claim the reward for the chosen token side.
  const hash = await client.distributeRewards({
    bookId,
    order,
    token: token0,
  });

  console.log('Reward claim tx:', hash);
}

main().catch(console.error);
