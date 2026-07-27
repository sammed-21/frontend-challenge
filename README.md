# AquaFi — Turbine SDK Integration

A swap interface built with the [Turbine SDK](https://github.com/propeller-heads/turbine-sdk).

See [BRIEF.md](./BRIEF.md) for the challenge description and [TASKS.md](./TASKS.md) for open tasks.

## Stack

- React 18 + TypeScript + Vite
- Chakra UI v2
- wagmi v2 + viem v2
- turbine-sdk
- Vitest + Playwright

## Quick Start

```bash
# Install dependencies
npm install
cd mock-server && npm install && cd ..

# Start mock server (terminal 1)
cd mock-server && npm run dev

# Start app (terminal 2)
npm run dev
```

App: http://localhost:5173
Mock API: http://localhost:3001/api

## Tests

```bash
# Unit tests
npx vitest run

# E2E tests (requires mock server running)
npx playwright test
```

## Project Structure

```
src/
  app/              — App shell, providers, config
  features/
    swap/           — Swap form, amount input, spread selector
    tokens/         — Token list, modal, mapper, provider
    wallet/         — Wallet connection UI
  shared/
    providers/      — TurbineProvider (SDK client + auth)
    hooks/          — useTurbineConfig
    services/       — SDK type re-exports
    types/          — App-level types
    assets/         — Token icons
mock-server/        — Express mock of Turbine API
e2e/                — Playwright E2E tests
test-utils/         — Test helpers (wallet mock)
```
