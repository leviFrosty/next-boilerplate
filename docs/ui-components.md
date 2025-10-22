# Component Management

## Monorepo Structure

```txt
apps/
  web/
    - components/      # App-specific components (blocks, forms)
    - components.json

packages/
  ui/
    - src/
      - components/    # shadcn UI components
      - hooks/
      - lib/
      - styles/
    - components.json
```

## Adding Components

### From App Directory

**Always run from `apps/web`:**

```bash
cd apps/web
pnpm dlx shadcn@canary add [COMPONENT]
```

The CLI automatically routes components:

- **UI components** (button, input, card, etc.) -> `packages/ui/src/components/`
- **Blocks** (login-01, dashboard, etc.) -> `apps/web/components/`

### Examples

```bash
# Adds button.tsx to packages/ui/src/components/
pnpm dlx shadcn@canary add button

# Adds login-form.tsx to apps/web/components/
# Adds dependencies (button, input, card) to packages/ui
pnpm dlx shadcn@canary add login-01
```

## Import Patterns

### UI Components

```tsx
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { useTheme } from '@workspace/ui/hooks/use-theme';
```

### Internal UI Package Imports

Within `packages/ui`:

```tsx
import { cn } from '@cool-ice/ui/lib/utils';
```

## Configuration

### Required Files

Both workspaces need `components.json`:

**apps/web/components.json:**

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "../../packages/ui/src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "hooks": "@/hooks",
    "lib": "@/lib",
    "utils": "@cool-ice/ui/lib/utils",
    "ui": "@cool-ice/ui/components"
  }
}
```

**packages/ui/components.json:**

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@workspace/ui/components",
    "utils": "@workspace/ui/lib/utils",
    "hooks": "@workspace/ui/hooks",
    "lib": "@workspace/ui/lib",
    "ui": "@workspace/ui/components"
  }
}
```

### Critical Requirements

1. **Matching config**: Same `style`, `iconLibrary`, `baseColor` in both files
2. **Tailwind v4**: Leave `tailwind.config` empty (`""`)
3. **Workspace package**: UI package must be in dependencies: `"@cool-ice/ui": "workspace:*"`
4. **Transpilation**: Add to `next.config.ts`:

   ```ts
   transpilePackages: ['@cool-ice/ui'];
   ```

## Setting Up a New App

### 1. Add components.json

Create `apps/[app-name]/components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "../../packages/ui/src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "hooks": "@/hooks",
    "lib": "@/lib",
    "utils": "@cool-ice/ui/lib/utils",
    "ui": "@cool-ice/ui/components"
  }
}
```

### 2. Install UI Package

Add to `apps/[app-name]/package.json`:

```json
{
  "dependencies": {
    "@cool-ice/ui": "workspace:*",
    "lucide-react": "0.546.0",
    "next-themes": "0.4.6"
  }
}
```

### 3. Configure Next.js

Update `apps/[app-name]/next.config.ts`:

```ts
const nextConfig: NextConfig = {
  transpilePackages: ['@cool-ice/ui'],
};
```

### 4. Setup Tailwind

**PostCSS Config** - `apps/[app-name]/postcss.config.mjs`:

```js
export { default } from '@cool-ice/ui/postcss.config';
```

**Import Global Styles** - `apps/[app-name]/src/app/layout.tsx`:

```tsx
import '@cool-ice/ui/globals.css';
```

### 5. Add Theme Provider

Create `apps/[app-name]/src/components/providers.tsx`:

```tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
  );
}
```

Update layout:

```tsx
import { Providers } from '@/components/providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 6. Configure TypeScript

Update `apps/[app-name]/tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@workspace/ui/*": ["../../packages/ui/src/*"]
    }
  }
}
```

## Troubleshooting

### CLI can't find workspace

- Ensure running from app directory (`apps/[app-name]`)
- Check `components.json` exists in both app and `packages/ui`
- Verify workspace is listed in `pnpm-workspace.yaml`

### Import errors

- Verify `@workspace/ui/*` alias in `tsconfig.json`
- Check `@cool-ice/ui` package installed in app's `package.json`
- Run `pnpm install` from root

### Build errors

- Confirm `transpilePackages: ['@cool-ice/ui']` in `next.config.ts`
- Verify PostCSS config exports: `export { default } from '@cool-ice/ui/postcss.config'`
- Check global styles import: `import '@cool-ice/ui/globals.css'`
