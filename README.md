# Padel Connect

A full-stack application designed to connect padel players, clubs, tournaments, and communities.

The goal of this project is to create a platform where players can find partners, join matches, discover available courts, participate in tournaments, and where clubs can manage their facilities and events.

## 🚀 Tech Stack

### Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Swagger API Documentation

### Frontend

- Next.js
- TypeScript
- Tailwind CSS

### Infrastructure

- Docker
- pnpm Workspaces
- Turborepo

## 📁 Project Structure

```
padel-connect/
│
├── apps/
│   ├── api/        # NestJS Backend API
│   └── web/        # Next.js Frontend
│
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## ✅ Current Features

### Authentication

- Cookie-based sessions (httpOnly JWT)
- Register, login, logout
- Route guards: unauthenticated, onboarding, and authenticated areas

### Players

- Player profile with city, position, dominant hand and preferred match type
- **Categories follow the Argentine system**: `C1`–`C8` for men, `D1`–`D7` for women.
  Careful with the order: the _lower_ the number, the _better_ the player
  (C1 is professional, C8 a beginner)
- Editable profile at `/profile`
- Public player view hides contact details (email, phone, WhatsApp, Instagram)

### Matches

- Create a match: venue, city, date, duration, accepted categories, notes
- Padel is 2v2, so every match has exactly 4 slots and the organiser takes one
- Join / leave; only the organiser can edit or cancel, and cancelling asks for confirmation
- Concurrent joins are serialised, so the last slot never gets double-booked
- Browse upcoming matches grouped by day, filter by free slots, or look at played ones
- Shareable URL per match

### Clubs

- Community-filled directory: any player can add the club they play at
- Unique per name and city, so the same club is not loaded twice
- A club page lists the upcoming matches and tournaments held there

### Tournaments

- Publish a tournament: venue, dates, accepted categories, team cap, entry fee
- **Registration is per player, and the partner is free text**: requiring the
  partner to already have an account would leave out half the sign-ups
- Only the organiser can edit or cancel; the cap can never drop below the
  teams already registered

### Venues

- A match or tournament is either at a loaded `Club` or at a free-text place.
  One field covers both. When a club is picked, its name and city win — otherwise
  nothing would stop a club from Lomas showing up in the Avellaneda listing.

### Location Management

- City database with autocomplete
- Player and match location relationship

### Backend API

- REST API with NestJS
- Prisma database integration
- Swagger documentation
- DTO validation
- Clean architecture structure

### Frontend

- Next.js App Router with route groups per access level
- Responsive shell: sidebar on desktop, bottom tab bar on mobile
- Light and dark theme, following the system preference

## 📐 Design Decisions

[`docs/DECISIONES.md`](docs/DECISIONES.md) explains _why_ the code looks the way
it does — the modelling calls, the trade-offs that were taken on purpose, and
what has not been verified yet. Read it before changing the category system,
the venue handling or the route groups.

## 🛠️ Getting Started

### Requirements

- Node.js >= 20
- pnpm
- Docker

### Installation

Clone the repository:

```bash
git clone https://github.com/FerRom1979/padel-connect-v2.git
```

Install dependencies:

```bash
pnpm install
```

Start PostgreSQL:

```bash
docker compose up -d
```

Configure environment variables:

Create a `.env` file inside:

```
apps/api
```

Example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/padel_connect"
JWT_SECRET="change-me-in-development"
JWT_EXPIRES_IN="7d"
```

Run Prisma migrations and seed the cities:

```bash
cd apps/api

pnpm prisma migrate dev
pnpm prisma db seed
```

Start the backend:

```bash
pnpm start:dev
```

Start the frontend (from `apps/web`, needs `NEXT_PUBLIC_API_URL`):

```bash
pnpm dev
```

Create `apps/web/.env.local`:

```
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

## 📚 API Documentation

Swagger documentation is available at:

```
http://localhost:3001/docs
```

## 🗺️ Roadmap

### Authentication

- Password reset
- Email verification
- Refresh tokens
- Role-based access

### Players

- Player ratings
- Sorting by proximity (`latitude` / `longitude` / `travelDistanceKm` exist on
  `User` but nothing uses them yet)

### Everywhere

- Pagination. Lists are capped at 50 rows and warn when results are cut off,
  but there is no way to page past that yet
- Notifications when a match or tournament you joined gets cancelled

### Clubs

- Club registration
- Court availability management
- Tournament creation
- Club dashboard

### Marketplace

- Merchandise management
- Product listings
- Club stores

### Future Features

- Notifications
- Chat between players
- Mobile application
- Payment integration

## 🎯 Project Goals

This project is being developed as a real-world full-stack application to improve skills in:

- Backend architecture
- Database design
- API development
- Authentication systems
- Frontend integration
- Scalable application design

## 📄 License

This project is for learning and portfolio purposes.
