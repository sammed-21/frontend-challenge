# AquaFi — Turbine SDK Integration Challenge

## Scenario

AquaFi is building a swap interface using the [Turbine SDK](https://github.com/propeller-heads/turbine-sdk). The previous developer left mid-project. You're picking it up.

The repo has a working foundation (wallet connection, token list, swap form UI) but several things are broken, incomplete, or missing. A mock server simulates the Turbine API for local development.

## What we're looking for

There are more tasks here than you'll finish in the time available. That's intentional. We want to see:

1. **How you prioritize.** Which tasks do you tackle first and why? What do you skip and why?
2. **How you work with existing code.** Do you read and follow the patterns, or rewrite everything your way?
3. **How you handle the SDK.** Can you read the source/docs and use the API correctly?
4. **How you think about quality.** Tests, CI, deployment — what's your bar?
5. **How you use AI.** We expect you'll use it. We want to see that you understand and can improve on what it produces.

## Requirements

- The swap form must be **keyboard-navigable**. A user should be able to complete a swap using only the keyboard (tab between fields, enter to submit, escape to close modals).
- UI elements must meet **basic contrast requirements** against the dark background.

## Tasks

See [TASKS.md](./TASKS.md) for the full list. Pick what matters most, do it well, and explain your prioritization in `DECISIONS.md`.

## Deliverables

1. **GitHub repo** — your fork with commits showing your work progression
2. **Deployed URL** — the app running somewhere accessible
3. **`DECISIONS.md`** — for each task you worked on: what you did, why you prioritized it, what tradeoffs you made. For tasks you skipped: why, and what you'd do with more time.

## Time

You have **one week** from receiving the challenge. We expect **8–12 hours** of focused work, not a full week of effort.

## Setup

```bash
# Install app dependencies
npm install

# Install mock server dependencies
cd mock-server && npm install && cd ..

# Install Playwright browsers
npx playwright install chromium

# Start mock server (terminal 1)
cd mock-server && npm run dev

# Start app (terminal 2)
npm run dev

# Run existing tests
npx vitest run

# Run Playwright (once you've written tests)
npx playwright test
```

The app runs on `http://localhost:5173` and the mock server on `http://localhost:3001/api`.

## Architecture

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
```

Path aliases: `@app/*`, `@features/*`, `@shared/*`
