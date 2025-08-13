# UI Package (@spaced-repetition-trainer/ui)

The Svelte frontend for the Spaced Repetition Trainer application.

> **Note:** For complete setup instructions, see the [main README](../README.md) in the project root.

## Quick Start

### From Project Root (Recommended)
```bash
# Start both UI and backend
pnpm dev

# Start only UI
pnpm dev:ui
```

### From UI Directory
```bash
cd ui
pnpm dev
```

## Package-Specific Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run tests with Vitest |
| `pnpm test:ui` | Run tests with Vitest UI |
| `pnpm check` | Type check with svelte-check |
| `pnpm lint` | Lint code with ESLint |
| `pnpm lint:fix` | Lint and auto-fix issues |
| `pnpm format` | Format code with Prettier |

## UI Architecture

```
src/
├── App.svelte           # Main application component
├── lib/
│   ├── components/      # Reusable UI components
│   ├── services/        # API and business logic  
│   ├── stores/          # Svelte stores for state
│   └── types.ts         # Local type definitions
└── main.ts              # Application entry point
```

## Key Technologies

- **Svelte 5** - Reactive UI framework
- **Vite 6** - Build tool and dev server
- **TypeScript** - Type safety
- **Vitest** - Testing framework
- **ESLint + Prettier** - Code quality

## Styling Guidelines

- **CSS Grid** preferred for layout
- **Flexbox** as secondary choice
- **Component-scoped CSS** (Svelte default)
- **Avoid nested ternaries** in templates

## Using Shared Types

```typescript
import { User, Deck, Card, Review } from '@spaced-repetition-trainer/types'
```

See [CLAUDE.md](./CLAUDE.md) for detailed development guidance.
