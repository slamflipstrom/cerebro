# Spaced Repetition Trainer

A modern spaced repetition learning application built with Svelte and PocketBase, implementing the FSRS (Free Spaced Repetition Scheduler) algorithm for optimized learning through scientifically-backed spaced repetition.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PNPM 8+
- PocketBase binary (see installation options below)

### PocketBase Installation

Choose one of the following installation methods:

#### Option A: Package Manager (Recommended)
```bash
# macOS
brew install pocketbase

# Linux (Ubuntu/Debian) - if available in repositories
# Check https://pocketbase.io/docs/ for current options

# Windows
# Use manual installation below
```

#### Option B: Manual Installation (Most Secure)
1. Visit [PocketBase Downloads](https://pocketbase.io/docs/)
2. Download the appropriate binary for your platform
3. Verify the download (optional but recommended):
   ```bash
   # Check SHA256 hash against published checksums
   sha256sum pocketbase  # Linux/macOS
   ```
4. Place the binary in `/backend/pocketbase`
5. Make it executable:
   ```bash
   chmod +x backend/pocketbase
   ```

### Development Setup

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd spaced-repetition-trainer
   pnpm install
   ```

2. **Install PocketBase:** Follow one of the installation options above

3. **Start development environment:**

   ```bash
   pnpm dev
   ```

   This starts both the UI and PocketBase backend in parallel.

4. **Access the application:**
   - **Frontend**: http://localhost:5173
   - **Backend Admin**: http://localhost:8090/\_/

## 🏗️ Project Structure

This project uses a **PNPM workspace monorepo** structure:

```
/
├── package.json              # Root workspace configuration
├── pnpm-workspace.yaml       # Workspace definition
├── pnpm-lock.yaml            # Lockfile for all packages
├── ui/                       # Svelte frontend (@spaced-repetition-trainer/ui)
│   ├── src/                  # Application source code
│   ├── package.json          # UI-specific dependencies
│   └── CLAUDE.md             # Development guidance
├── backend/                  # PocketBase backend
│   ├── pocketbase            # PocketBase binary
│   ├── pb_data/              # Database and configuration
│   └── pb_migrations/        # Database migrations
└── shared/                   # Shared packages
    └── types/                # Shared TypeScript types (@spaced-repetition-trainer/types)
        ├── src/index.ts      # Type definitions
        └── package.json      # Types package configuration
```

## 🛠️ Available Commands

### Root Workspace Commands (run from project root)

| Command            | Description                                  |
| ------------------ | -------------------------------------------- |
| `pnpm dev`         | **Start both UI and PocketBase in parallel** |
| `pnpm dev:ui`      | Start only the UI development server         |
| `pnpm dev:backend` | Start only PocketBase backend                |
| `pnpm build`       | Build UI for production                      |
| `pnpm preview`     | Preview UI production build                  |
| `pnpm test`        | Run UI tests with Vitest                     |
| `pnpm test:ui`     | Run UI tests with Vitest UI                  |
| `pnpm check`       | Type check UI with svelte-check              |
| `pnpm lint`        | Lint UI code with ESLint                     |
| `pnpm lint:fix`    | Lint and auto-fix UI issues                  |
| `pnpm format`      | Format UI code with Prettier                 |
| `pnpm install:all` | Install all workspace dependencies           |

### Individual Package Commands

You can also run commands directly within each package:

```bash
# From /ui directory
cd ui && pnpm dev

# From /shared/types directory
cd shared/types && pnpm build
```

## 🎯 Key Technologies

### Frontend (UI Package)

- **Svelte 5** - Reactive UI framework with TypeScript
- **Vite 6** - Fast build tool and development server
- **Vitest** - Unit testing framework
- **ESLint + Prettier** - Code linting and formatting

### Backend

- **PocketBase** - Self-contained backend with SQLite
- **Go Binary** - Standalone executable, no Node.js dependencies

### Development Tools

- **PNPM Workspaces** - Monorepo package management
- **Concurrently** - Parallel process execution with colored output
- **TypeScript** - Shared type safety across packages

## 🔧 Development Workflow

### Daily Development

1. `pnpm dev` - Starts both UI and backend
2. Make changes to UI in `/ui/src/`
3. Access PocketBase admin at http://localhost:8090/\_/
4. UI auto-reloads on changes at http://localhost:5173

### Code Quality

- **Linting**: `pnpm lint` (ESLint + TypeScript + Svelte)
- **Formatting**: `pnpm format` (Prettier)
- **Type Checking**: `pnpm check` (svelte-check)
- **Testing**: `pnpm test` (Vitest)

### Shared Types

The project includes a shared types package (`@spaced-repetition-trainer/types`) for type safety between frontend and backend:

```typescript
// Available types
import {
  User,
  Deck,
  Card,
  Review,
  CardSchedule,
} from "@spaced-repetition-trainer/types";
```

## 🗄️ Database & Backend

### PocketBase Features

- **SQLite Database** - File-based database in `/backend/pb_data/`
- **REST API** - Auto-generated API at http://localhost:8090/api/
- **Admin Dashboard** - Web interface at http://localhost:8090/\_/
- **Authentication** - Built-in user management
- **Real-time** - WebSocket subscriptions for live updates

### Database Schema

- **users** - User accounts and profiles
- **decks** - Flashcard collections
- **cards** - Individual flashcards
- **reviews** - Study session records
- **card_schedules** - FSRS scheduling data

## 🧠 FSRS Implementation

This application implements the **Free Spaced Repetition Scheduler (FSRS)** algorithm:

- **Adaptive Scheduling** - Cards scheduled based on individual performance
- **Four Difficulty Ratings** - Again, Hard, Good, Easy
- **Scientific Approach** - Algorithm based on memory research
- **Performance Tracking** - Detailed analytics on learning progress

## 🎨 UI Guidelines

### Styling Conventions

- **CSS Grid** - Preferred for layout (when possible)
- **Flexbox** - Secondary choice for layout
- **Component-scoped CSS** - Svelte's built-in scoping
- **Avoid nested ternaries** - Keep conditional rendering simple

### Component Structure

```
src/
├── App.svelte              # Main application component
├── lib/
│   ├── components/         # Reusable UI components
│   ├── services/           # API and business logic
│   ├── stores/             # Svelte stores for state management
│   └── types.ts            # Local type definitions
└── main.ts                 # Application entry point
```

## 🚀 Production Deployment

### Build for Production

```bash
pnpm build                  # Builds optimized UI bundle
```

### Backend Deployment

PocketBase is a single binary that can be deployed standalone:

```bash
cd backend
./pocketbase serve --http=0.0.0.0:8080
```

## 🤝 Contributing

1. **Setup**: Follow the Quick Start guide
2. **Development**: Use `pnpm dev` for local development
3. **Code Quality**: Run `pnpm lint` and `pnpm check` before committing
4. **Testing**: Add tests for new features with `pnpm test`
5. **Types**: Update shared types in `/shared/types/src/` when needed

## 📁 Important Configuration Files

| File                        | Purpose                           |
| --------------------------- | --------------------------------- |
| `package.json`              | Root workspace configuration      |
| `pnpm-workspace.yaml`       | Workspace package definitions     |
| `ui/package.json`           | Frontend dependencies and scripts |
| `ui/vite.config.ts`         | Vite build configuration          |
| `ui/tsconfig.json`          | TypeScript configuration          |
| `shared/types/package.json` | Shared types package              |

## 🛟 Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Kill existing processes
pkill -f pocketbase
pkill -f vite
```

**Dependencies out of sync:**

```bash
# Reinstall all workspace dependencies
rm -rf node_modules ui/node_modules shared/types/node_modules
pnpm install
```

**Type errors:**

```bash
# Rebuild shared types
cd shared/types && pnpm build
pnpm check
```

**PocketBase not found:**

```bash
# Verify PocketBase installation
which pocketbase          # Check if in PATH
ls -la backend/pocketbase  # Check local binary

# Reinstall if needed (see installation options above)
```

### Development Tips

- Use `pnpm dev:ui` or `pnpm dev:backend` to run services individually
- PocketBase data persists in `/backend/pb_data/`
- UI hot-reloads automatically on file changes
- Check browser console and terminal for error messages

## 🔮 Future Enhancements

### Planned Improvements
- **Docker Support** - Containerized development and deployment setup for easier environment management
- **Mobile App** - React Native or Capacitor-based mobile application
- **Advanced Analytics** - Enhanced learning progress visualization
- **Plugin System** - Extensible architecture for custom learning algorithms

---
