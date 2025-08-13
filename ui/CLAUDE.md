# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Svelte-based spaced repetition trainer application with PocketBase as the backend. The project is built using Vite and TypeScript, designed to implement FSRS (Free Spaced Repetition Scheduler) for effective learning through spaced repetition.

## Code Design

Avoid nested ternaries.

## Key Technologies

- **Frontend**: Svelte 5 with TypeScript
- **Build Tool**: Vite 6
- **Backend**: PocketBase (standalone Go binary)
- **Testing**: Vitest with UI support
- **Linting**: ESLint with TypeScript and Svelte plugins
- **Formatting**: Prettier with Svelte plugin
- **Type Checking**: svelte-check
- **Package Management**: PNPM workspaces
- **Shared Types**: @spaced-repetition-trainer/types package

## Development Commands

**Root workspace commands (run from project root):**
- `pnpm dev` - **Start both UI and PocketBase backend in parallel**
- `pnpm dev:ui` - Start only UI development server
- `pnpm dev:backend` - Start only PocketBase backend
- `pnpm build` - Build UI for production
- `pnpm preview` - Preview UI production build
- `pnpm test` - Run UI tests with Vitest
- `pnpm test:ui` - Run UI tests with Vitest UI
- `pnpm check` - Type check UI with svelte-check
- `pnpm check:watch` - Type check UI in watch mode
- `pnpm lint` - Lint UI code with ESLint
- `pnpm lint:fix` - Lint and auto-fix UI issues
- `pnpm format` - Format UI code with Prettier
- `pnpm install:all` - Install all workspace dependencies

**UI-specific commands (run from /ui directory):**
- All the above commands work locally within the UI package

**Development Setup:**
- `pnpm dev` runs UI (localhost:5173) and PocketBase (localhost:8090) in parallel
- Uses `concurrently` for colored output: UI=cyan, Backend=green
- PocketBase admin UI available at http://localhost:8090/_/

## Architecture Notes

**Monorepo Structure:**
- Root workspace manages all packages with PNPM workspaces
- `/ui` - Svelte frontend application (@spaced-repetition-trainer/ui)
- `/backend` - PocketBase backend setup
- `/shared/types` - Shared TypeScript types (@spaced-repetition-trainer/types)

**Frontend Architecture:**
- Single-page application structure in `/ui/src`
- Main app component is `App.svelte`
- Uses pnpm workspaces for package management
- TypeScript configuration extends Svelte Kit defaults
- Shared types available from `@spaced-repetition-trainer/types`

**Using Shared Types:**
- Import types: `import { User, Deck, Card, Review, CardSchedule } from '@spaced-repetition-trainer/types'`
- Available types: User, Deck, Card, Review, CardSchedule, ApiResponse, AuthData, LoginCredentials, RegisterCredentials
- Types are built automatically and available across the monorepo
- Update types in `/shared/types/src/index.ts` when adding new data structures

### Styling

Please use CSS grid when possible, otherwise prefer Flexbox.

## Important Files

**UI Package:**
- `src/App.svelte` - Main application component
- `package.json` - UI dependencies and scripts
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration

**Root Workspace:**
- `../package.json` - Root workspace configuration
- `../pnpm-workspace.yaml` - Workspace package definitions
- `../README.md` - Project documentation

**Shared Types:**
- `../shared/types/src/index.ts` - Shared type definitions
- `../shared/types/package.json` - Types package configuration

**Backend:**
- `../backend/pocketbase` - PocketBase binary
- `../backend/pb_data/` - Database and configuration files
