# 237league

This repository contains the codebase for the 237league project, including both the backend (NestJS) and frontend (Next.js) applications.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Database & Prisma Setup](#database--prisma-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Development Notes](#development-notes)

---

## Project Structure

```
237league/
  backend/   # NestJS API
  client/    # Next.js frontend
```

---

## Backend Setup (NestJS)

1. **Install dependencies:**
	```bash
	cd backend
	npm install
	```
2. **Configure environment variables:**
	- Copy `.env` or create your own `.env` file in the `backend/` directory. See [Environment Variables](#environment-variables).
3. **Run the server:**
	```bash
	# Development
	npm run start:dev
	# Production
	npm run start:prod
	```
4. **Run tests:**
	```bash
	npm run test       # Unit tests
	npm run test:e2e   # End-to-end tests
	npm run test:cov   # Test coverage
	```

---

## Database & Prisma Setup

This project uses PostgreSQL with Prisma as the ORM. The database schema is defined in `backend/prisma/schema.prisma`.

### 1. Start the Database

Using Docker (recommended):
```bash
cd backend
docker-compose up -d
```

This will start a PostgreSQL database on port 5432 with the following credentials:
- **User:** `user`
- **Password:** `setMePlease`
- **Database:** `league_db`

### 2. Environment Variables

Add the database connection string to your `backend/.env` file:
```env
DATABASE_URL="postgresql://user:setMePlease@localhost:5432/league_db"
```

### 3. Prisma Commands

Install Prisma CLI globally (optional but recommended):
```bash
npm install -g prisma
```

**Apply migrations to your database:**
```bash
cd backend
npx prisma migrate dev
```

**Generate Prisma Client:**
```bash
npx prisma generate
```

**Reset database (⚠️ development only):**
```bash
npx prisma migrate reset
```

**View your data with Prisma Studio:**
```bash
npx prisma studio
```

### 4. Database Schema Management

- **Schema file:** `backend/prisma/schema.prisma`
- **Migrations:** `backend/prisma/migrations/`
- **Generated client:** `backend/generated/prisma/`

### 5. Common Workflows

**After making schema changes:**
1. Update `schema.prisma`
2. Run `npx prisma migrate dev --name describe_your_changes`
3. The Prisma client will be automatically regenerated

**Setting up a fresh database:**
1. Ensure Docker container is running
2. Run `npx prisma migrate dev` to apply all migrations
3. Optionally, run `npx prisma db seed` if you have seed data

**Checking migration status:**
```bash
npx prisma migrate status
```

---

## Frontend Setup (Next.js)

1. **Install dependencies:**
	```bash
	cd client
	npm install
	# or use yarn, pnpm, or bun
	```
2. **Run the development server:**
	```bash
	npm run dev
	```
	The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

### Backend (`backend/.env`)

Create a `.env` file in the `backend/` directory. Example:

```env
# Database
DATABASE_URL="postgresql://user:setMePlease@localhost:5432/league_db"

# Steam API
STEAM_API_KEY=your_steam_api_key

# Server Configuration
PORT=3001
CLIENT_URL=http://localhost:3000

# JWT Authentication
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret

# Environment
NODE_ENV=development
```

### Frontend

```env
BACKEND_PORT = 3001
```

---

## Development Notes

- **Backend:** Built with [NestJS](https://nestjs.com/). Uses JWT authentication and Steam login. API docs available via Swagger at `/api/docs` when running.
- **Database:** PostgreSQL with [Prisma ORM](https://prisma.io/) for type-safe database access and migrations.
- **Frontend:** Built with [Next.js 14](https://nextjs.org/) and [HeroUI](https://heroui.com/). Uses Tailwind CSS for styling.
- **Node.js version:** Use Node.js 18+ for best compatibility.
- **Docker:** Database runs in Docker container for consistent development environment.
- **Monorepo:** Backend and frontend are developed separately. Start each in its own terminal.
- **Contributions:** PRs and issues are welcome!

---

## License

See individual `LICENSE` files in `client/` and `backend/` if present.
