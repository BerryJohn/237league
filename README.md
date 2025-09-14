# 237league

This repository contains the codebase for the 237league project, including both the backend (NestJS) and frontend (Next.js) applications.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
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
STEAM_API_KEY=your_steam_api_key
PORT=3001
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
NODE_ENV=development
```

### Frontend

```env
BACKEND_PORT = 3001
```

---

## Development Notes

- **Backend:** Built with [NestJS](https://nestjs.com/). Uses JWT authentication and Steam login. API docs available via Swagger at `/api/docs` when running.
- **Frontend:** Built with [Next.js 14](https://nextjs.org/) and [HeroUI](https://heroui.com/). Uses Tailwind CSS for styling.
- **Node.js version:** Use Node.js 18+ for best compatibility.
- **Monorepo:** Backend and frontend are developed separately. Start each in its own terminal.
- **Contributions:** PRs and issues are welcome!

---

## License

See individual `LICENSE` files in `client/` and `backend/` if present.
