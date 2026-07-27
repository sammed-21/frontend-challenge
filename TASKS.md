# Open Tasks

These tasks are not in priority order. You decide what to work on first.

---

## AUTH-001: Resilient authentication

The app should handle authentication lifecycle gracefully. If a user is idle and then tries to perform an action, the experience should not break. Explore the current auth flow and make it robust.

---

## AMOUNT-001: Accurate token amounts

Token amounts must be precise for on-chain transactions. Verify the current amount handling works correctly. If there are issues, fix them.

---

## SPREAD-001: Spread strategy selection

Users should be able to choose how their order executes. The current implementation is a placeholder. Read the SDK source to understand what spread strategies are available and how they work, then build a selector that lets users choose.

---

## ORDER-001: Complete order submission

The swap button doesn't submit anything. Wire it up so that clicking "Swap" creates a valid order using the SDK. Read the SDK's order types to understand what fields are required and how to construct them correctly.

---

## STATUS-001: Order status tracking

After submitting an order, users have no visibility into what happened. Build a way to show order progress and outcome.

---

## TEST-001: Write Playwright E2E tests

The Playwright config exists but there are no tests. Write E2E tests that cover meaningful user flows. A wallet mock utility is available in `test-utils/`. Tests should be deterministic.

---

## TEST-002: Fix and extend unit tests

One test is failing. Some test files are empty skeletons. Fix what's broken and add coverage where it matters.

---

## DOCKER-001: Production-ready Docker build

The current Dockerfile works but is not production-ready. Improve it.

---

## CI-001: Complete the CI pipeline

The CI workflow only checks formatting. A production project needs more than that.

---

## DEPLOY-001: Deploy the application

Get the app running somewhere accessible and share the URL. Justify your platform choice in `DECISIONS.md`.

---

## INFRA-001: API connectivity beyond local development

The app uses a local mock server for development. Think about what happens in CI and in a deployed environment, and solve for it.
