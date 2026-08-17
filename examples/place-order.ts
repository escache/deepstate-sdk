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
const decimals0 = 6;
const decimals1 = 18;

const client = new DeepstateClient(walletClient, {
  deepstateV1: '0x6cf19308C22FC82ea620Fa0B3E94948d20f27B96' as Address,
  deepstateVault: '0xbfb7b3Ff3D498a559b946B836d26F0E168f273D5' as Address,
  rewarder: '0xE85ADBC03a6b52a2c9894c1BB525eC883ea156D7' as Address,
});

async function main() {
  const poolId = client.getPoolId(token0, token1);
  const epoch = await client.poolEpoch(poolId);

  // Example: place a bid to buy token0 (USDG) using token1 (NVDA).
  const price = 1 / 130; // token1 per token0
  const tick = client.priceToTickFloorWithDecimals(price, decimals0, decimals1);

  // The nonce must be zero for an incoming fill. The engine assigns a nonce
  // only when part of the order rests on the book.
  const packedOrder = client.packOrder({
    tick,
    quantity: 1_000_000n, // raw token0 units, e.g. 1 USDG with 6 decimals
    isBid: true,
  });

  console.log('Placing order:', packedOrder);

  const params = {
    token0,
    token1,
    epoch,
    order: packedOrder,
    isBid: true,
    noRest: false,
    fillOrKill: false,
  };

  // Simulate first to get the resting order that will be on-chain.
  const restingOrder = await client.simulateFill(params);
  console.log('Resting order:', restingOrder);

  const hash = await client.fill(params);
  console.log('Transaction:', hash);
}

main().catch(console.error);
