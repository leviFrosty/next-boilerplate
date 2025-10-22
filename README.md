# cool-ice

Production-ready Next.js 16 monorepo built for large teams and codebases. Heavily opinionated with enforced architecture boundaries.

## Features

### Stack

- **Next.js 16 Beta** with React 19 + React Compiler
- **Turborepo** with pnpm workspaces + catalog dependencies
- **Tailwind CSS v4** with optimized PostCSS setup
- **shadcn/ui** integration (auto-routes UI → packages, blocks → apps)
- **TypeScript** throughout with shared configs

### Architecture

- **Enforced folder structure** via ESLint boundaries plugin
  - Features isolated (no cross-feature imports)
  - One-way data flow: `global → features → app`
  - Linter errors prevent architectural violations
- **Monorepo UI package** with workspace protocol
- See [docs/project-structure.md](./docs/project-structure.md)

### Testing & Quality

- **Vitest** unit testing with coverage
- **Playwright** E2E testing
- **React Testing Library** integration
- **ESLint** (TypeScript, React, Next.js rules + boundaries)
- **Prettier** with pretty-quick
- **Lefthook** pre-commit hooks (format + lint staged files)

### Documentation

- **VuePress** docs site
- GitHub Pages auto-deploy on push to main

## Why This Architecture?

### Common Large-Scale Problems This Solves

**Circular Dependencies & Import Hell**

- Without boundaries, features import from each other freely
- `features/cart` imports `features/checkout`, which imports `features/cart`
- Causes build failures, hard-to-trace bugs, impossible refactors
- **Solution**: ESLint boundaries plugin prevents cross-feature imports at commit time

**Tech Debt Accumulation**

- "Just this once" coupling compounds over months
- Changing one feature breaks three others
- No one knows what depends on what
- **Solution**: Enforced one-way flow (`global → features → app`), violations fail CI

**Slow Onboarding**

- New devs spend weeks understanding implicit rules
- "Where does this go?" becomes a daily question
- Inconsistent patterns across the codebase
- **Solution**: Clear folder structure with linter enforcement - wrong placement = error

**Testing Gaps**

- "We'll add tests later" never happens
- CI has no test job, issues slip to production
- No E2E infrastructure when needed
- **Solution**: Vitest + Playwright + React Testing Library configured from day one

**Tooling Setup Tax**

- Each project: configure ESLint, Prettier, git hooks, CI/CD
- Copy-paste configs, miss updates, inconsistent quality checks
- **Solution**: All tooling ready and unified into single source of truth packages and package version. See [pnpm-workspace.yml](pnpm-workspace.yaml)

### Batteries Included Philosophy

**Start building features immediately.** No weeks spent on:

- ❌ Choosing/configuring linters
- ❌ Setting up test runners
- ❌ Integrating component libraries
- ❌ Architecting folder structure
- ❌ CI/CD pipeline setup
- ❌ Documentation infrastructure

**Everything is pre-configured and working:**

- ✅ Commit hooks auto-format and lint staged files
- ✅ CI fails on boundary violations before merge
- ✅ Tests run on every push
- ✅ Docs auto-deploy to GitHub Pages
- ✅ Monorepo builds cached via Turborepo
- ✅ Shadcn monorepo integration
- ✅ Tests & end-to-end playwright

**Focus on product, not plumbing.**

## Why Use This

✅ **Large team/codebase ready** - Architecture prevents inter-feature dependencies

✅ **Latest tech** - Next 16, React 19, React Compiler, Tailwind v4

✅ **Prevents tech debt** - Linter enforces boundaries, catches violations in CI

✅ **Full testing setup** - Unit + E2E configured out of the box

✅ **DX optimized** - Turbo caching, pnpm workspaces, git hooks

✅ **Batteries included** - All tooling configured, just build features

## Why NOT Use This

❌ **Heavily opinionated** - Folder structure is enforced, not flexible

❌ **Overkill for small projects** - Complex setup for simple apps

❌ **Beta versions** - Next 16 and React 19 still in beta

❌ **Learning curve** - Boundaries rules require understanding architecture

If you need flexibility or a simple starter, use `create-next-app` or `create-turbo` instead.

## Quick Start

### 1. Clone/fork this repo

```sh
git clone https://github.com/your-username/cool-ice.git my-project
cd my-project
```

### 2. Rename the workspace

Find and replace `@cool-ice` with your org name across the codebase:

```sh
# macOS/Linux
find . -type f \( -name "*.json" -o -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.md" \) \
  -not -path "*/node_modules/*" -not -path "*/.git/*" \
  -exec sed -i '' 's/@cool-ice/@your-org/g' {} +

# Linux (without '')
find . -type f \( -name "*.json" -o -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.md" \) \
  -not -path "*/node_modules/*" -not -path "*/.git/*" \
  -exec sed -i 's/@cool-ice/@your-org/g' {} +
```

Update root `package.json` name:

```json
{
  "name": "your-project-name",
  ...
}
```

### 3. Install dependencies

```sh
pnpm install
```

### 4. Run development server

```sh
# All apps
pnpm dev

# Specific app
pnpm dev --filter=web
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build

```sh
pnpm build
```

### 6. Setup CI (Optional but Recommended)

**Turbo Remote Cache** speeds up CI by sharing build cache across machines.

#### GitHub Actions Setup

1. **Create Vercel account** (free): [vercel.com/signup](https://vercel.com/signup)

2. **Link Turborepo**:

```sh
# Login to Vercel
pnpm exec turbo login

# Link your repo
pnpm exec turbo link
```

3. **Add secrets to GitHub**:
   - Go to repo **Settings → Secrets and variables → Actions**
   - Add `TURBO_TOKEN`: Get from `pnpm exec turbo login` output
   - Add `TURBO_TEAM`: Your Vercel team slug (in Turbo link output)

4. **Secrets are referenced in `.github/workflows/deploy-docs.yml`**:

```yaml
env:
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: ${{ vars.TURBO_TEAM }}
```

**Without Remote Cache**: CI builds from scratch every time (slower)

**With Remote Cache**: CI reuses builds from previous runs and local dev (5-10x faster)

## Project Structure

```txt
apps/
  web/              # Next.js app (Next 16 + React 19)
packages/
  ui/               # Shared shadcn/ui components
  eslint-config/    # Shared ESLint configs with boundaries
  typescript-config/# Shared tsconfig
docs/               # VuePress documentation site
```

### Web App Structure

```txt
apps/web/src/
  app/              # Next.js App Router (pages only, no logic)
  features/         # Feature modules (isolated, no cross-imports)
    feature-name/
      components/
      lib/
      db/
      api/
  components/       # Global UI components + shadcn blocks
  lib/              # Global utilities
  e2e/              # Playwright tests
```

See [docs/project-structure.md](./docs/project-structure.md) for architecture details.

## Adding shadcn/ui Components

Always run from `apps/web`:

```sh
cd apps/web

# UI component → packages/ui/src/components/
pnpm dlx shadcn@canary add button

# Block → apps/web/components/ (+ deps to packages/ui)
pnpm dlx shadcn@canary add login-01
```

See [docs/ui-components.md](./docs/ui-components.md) for monorepo setup details.

## Scripts

```sh
pnpm dev              # Run all apps in dev mode
pnpm build            # Build all apps
pnpm lint             # Lint all packages
pnpm lint:fix         # Fix lint issues
pnpm test             # Run all tests
pnpm test:e2e         # Run Playwright E2E tests
pnpm typecheck        # TypeScript type checking
pnpm fmt:fix          # Format with Prettier
```

## Learn More

- [Project Structure](./docs/project-structure.md) - Architecture & boundaries
- [UI Components](./docs/ui-components.md) - shadcn/ui monorepo setup
- [Next.js 16 Docs](https://nextjs.org/docs) - Next.js features
- [Turborepo Docs](https://turborepo.com/docs) - Monorepo tools
- [Feature Folder Structure Video](https://www.youtube.com/watch?v=xyxrB2Aa7KE) - Kyle Cook's explanation

## License

MIT
