# Agent Notes

## Branch naming
- Use normal branch names (e.g. `main`, `feature/...`, `fix/...`).

## Contract data
- ABIs in `src/abis/` were pulled from Robinhood Chain Blockscout (addresses in `README.md`).
- Pool/book IDs are computed off-chain via `keccak256(encodePacked(...))` and match the on-chain `poolId` / `bookId` pure functions.
- `fill` is the combined place/fill entry point on `DeepstateV1`; `placeBid` / `placeAsk` do not exist as separate methods.
- Incoming `fill` orders must have nonce bits set to zero (`packOrder` defaults to 0). Only resting/cancelled/rewarded orders carry the engine-assigned nonce.

## Build / check commands
- `npm install` — install dependencies
- `npm run typecheck` — run TypeScript type-check
- `npm run build` — build ESM/CJS/DTS bundles with a styled spinner
- `npm run test` — build and run the Node built-in test suite
- `npm run lint` — run Biome linter
- `npm run format` — format all files with Biome
- `npm run check` — run typecheck, lint, format check, and tests
- `npm run watch` — rebuild on file changes in watch mode
