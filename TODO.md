# TODO: Future Enhancements

## Docker Implementation (Future Priority)

**Goal:** Create containerized development and deployment setup for easier environment management.

### Docker Development Setup
- [ ] Create `Dockerfile` for PocketBase backend
- [ ] Create `docker-compose.yml` for local development
- [ ] Configure volume mounting for persistent data
- [ ] Set up hot-reload for development
- [ ] Update PNPM scripts to support Docker option

### Docker Production Setup  
- [ ] Multi-stage Dockerfile for production builds
- [ ] Separate containers for UI (nginx) and backend (PocketBase)
- [ ] Configure proper networking between containers
- [ ] Environment variable management
- [ ] Health checks and restart policies

### Documentation
- [ ] Add Docker installation option to README
- [ ] Document Docker development workflow
- [ ] Add production Docker deployment guide
- [ ] Create troubleshooting section for Docker issues

### Benefits of Docker Implementation
- **Environment Consistency** - Same environment across all developer machines
- **Easy Onboarding** - New developers can start with single `docker-compose up`
- **Production Parity** - Development closely matches production
- **Dependency Isolation** - No need to install PocketBase binary locally
- **Deployment Simplification** - Container-based deployment to any platform

### Implementation Notes
```yaml
# Example docker-compose.yml structure
version: '3.8'
services:
  pocketbase:
    build: ./backend
    ports:
      - "8090:8090"
    volumes:
      - ./backend/pb_data:/pb_data
      - ./backend/pb_migrations:/pb_migrations
    
  ui:
    build: ./ui
    ports:
      - "5173:5173"
    volumes:
      - ./ui:/app
    depends_on:
      - pocketbase
```

**Status:** Planned for future implementation once core functionality is stable.
**Priority:** Low - Current development setup works well for early development phase.