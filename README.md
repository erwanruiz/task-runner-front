# Task Runner Docker Environment

This Docker environment automatically clones and sets up your task-runner backend and frontend projects.

## Setup Instructions

1. **Configure your repositories**:
   Edit `config.env` and update the repository URLs:
   ```bash
   BACKEND_REPO_URL=https://github.com/your-username/task-runner-back.git
   FRONTEND_REPO_URL=https://github.com/your-username/task-runner-front.git
   ```

2. **Run the setup** (first time only):
   ```bash
   ./setup.sh
   ```
   Or use Docker:
   ```bash
   docker-compose --profile setup up
   ```

3. **Start the environment**:
   ```bash
   docker-compose up -d --build
   ```

## What happens during setup

1. Clones the backend repository into `task-runner-back/`
2. Clones the frontend repository into `task-runner-front/`
3. Docker builds and installs all dependencies automatically

## Services

- **Database**: PostgreSQL on port 5432
- **Backend**: PHP/Laravel application
- **Frontend**: Vue.js/Nuxt application on port 3000
- **Nginx**: Reverse proxy on port 80

## Git Repository

This repository only contains:
- Docker configuration files
- Setup scripts
- Environment configuration

The actual application code (`task-runner-back/` and `task-runner-front/`) is excluded from git and will be cloned automatically.