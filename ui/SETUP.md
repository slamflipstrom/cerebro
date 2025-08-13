# PocketBase Setup Guide

This project uses PocketBase as the backend. Here's how to set it up:

## 1. Download PocketBase Server

1. Go to https://pocketbase.io/docs/
2. Download the appropriate binary for your system (macOS, Windows, Linux)
3. Extract the binary to your project root or a convenient location

## 2. Start PocketBase Server

```bash
# If you placed the binary in your project root:
./pocketbase serve

# Or from another location:
/path/to/pocketbase serve
```

The server will start on `http://127.0.0.1:8090` by default.

## 3. Set Up Database Schema

1. Open the PocketBase Admin UI at `http://127.0.0.1:8090/_/`
2. Create an admin account
3. Import the database schema from `pb_schema.json` in this project, or create the collections manually:

### Collections to create:
- **users** (already exists)
- **decks** - name (text), description (text), user (relation to users)
- **cards** - deck (relation to decks), front (text), back (text), tags (json)
- **reviews** - card (relation to cards), user (relation to users), rating (number 1-4), duration (number)
- **card_schedules** - card (relation to cards), due (date), stability (number), difficulty (number), elapsed_days (number), scheduled_days (number), reps (number), lapses (number), state (select: new, learning, review, relearning), last_review (date)

## 4. Run Your App

```bash
pnpm dev
```

Your app will connect to the PocketBase server using the JavaScript SDK.

## Configuration

The PocketBase client is configured in `src/lib/pocketbase.ts`. By default, it connects to `http://127.0.0.1:8090`. 

To change the server URL, modify:
```typescript
export const pb = new PocketBase('http://your-server-url:port')
```

## Alternative: PocketBase Cloud

Instead of running locally, you can also use PocketBase Cloud (when available) or deploy PocketBase to a cloud provider.