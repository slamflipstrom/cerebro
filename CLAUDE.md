# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Svelte-based spaced repetition trainer application with PocketBase as the backend. The project is built using Vite and TypeScript, designed to implement FSRS (Free Spaced Repetition Scheduler) for effective learning through spaced repetition.

## Key Technologies

- **Frontend**: Svelte 5 with TypeScript
- **Build Tool**: Vite 6
- **Backend**: PocketBase (included as dependency)
- **Testing**: Vitest with UI support
- **Linting**: ESLint with TypeScript and Svelte plugins
- **Formatting**: Prettier with Svelte plugin
- **Type Checking**: svelte-check

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests with Vitest
- `pnpm test:ui` - Run tests with Vitest UI
- `pnpm check` - Type check with svelte-check
- `pnpm check:watch` - Type check in watch mode
- `pnpm lint` - Lint code with ESLint
- `pnpm lint:fix` - Lint and auto-fix issues
- `pnpm format` - Format code with Prettier

## Architecture Notes

- Single-page application structure in `/src`
- Main app component is `App.svelte`
- Uses pnpm for package management
- TypeScript configuration extends Svelte Kit defaults
- Project appears to be in early development stage with basic Svelte setup

## Important Files

- `src/App.svelte` - Main application component
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration