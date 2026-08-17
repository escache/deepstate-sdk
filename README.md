# Deepstate SDK

TypeScript SDK for interacting with the [Deepstate Protocol](https://deepstate.sh) on Robinhood Chain.

## Features

- Pack/unpack the protocol's `bytes32` order format
- Tick math (logarithmic price to tick conversions)
- Pool and book ID helpers matching onchain `poolId` / `bookId` pure functions
- High-level `DeepstateClient` for engine, rewards, and vault calls
- Modular builders for contract calls
- Real ABIs for the deployed `DeepstateV1` router, `DeepstateVault`, and `DeepstateRewarder`
- Viem-based, ESM + CJS dual build

## Install

```bash
npm install deepstate-sdk
```

## Quick start

```ts
import { createWalletClient, defineChain, http } from 'viem';
import { DeepstateClient } from 'deepstate-sdk';

const robinhoodChain = defineChain({
  id: 4663,
  name: 'Robinhood Chain',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.mainnet.chain.robinhood.com'] },
  },
});

const walletClient = createWalletClient({
  account,
  chain: robinhoodChain,
  transport: http(robinhoodChain.rpcUrls.default.http[0]),
});

const client = new DeepstateClient(walletClient, {
  deepstateV1: '0x6cf19308C22FC82ea620Fa0B3E94948d20f27B96',
  deepstateVault: '0xbfb7b3Ff3D498a559b946B836d26F0E168f273D5',
  rewarder: '0xE85ADBC03a6b52a2c9894c1BB525eC883ea156D7',
});

const tick = client.priceToTickWithDecimals(1.05, 18, 18);
const packedOrder = client.packOrder({
  tick,
  quantity: 1_000_000_000_000_000_000n,
  isBid: true,
});

const hash = await client.fill({
  token0: '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168', // USDG
  token1: '0xd0601CE157Db5bdC3162BbaC2a2C8aF5320D9EEC', // NVDA
  epoch: 1n,
  order: packedOrder,
  isBid: true,
});
```

## Project structure

```
src/
  client.ts      # DeepstateClient
  order.ts       # Order packing / unpacking
  tick.ts        # Tick math
  pool.ts        # Pool / book ID helpers
  engine.ts      # fill / fillRoute / cancel builders
  rewards.ts     # Reward claim builders
  vault.ts       # Vault interaction builders
  types.ts       # Shared types
  abis/          # Real contract ABIs pulled from Robinhood Chain
examples/
  place-order.ts
  claim-rewards.ts
  market-make.ts
```

## Development

```bash
npm install
npm run check      # typecheck, lint, format check, build, and test
npm run build      # build with a styled spinner + file summary
npm run test       # build and run the spec-reported test suite
npm run watch      # rebuild on file changes
npm run format     # format with Biome
npm run lint       # lint with Biome
```

## License

MIT
