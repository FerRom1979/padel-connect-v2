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

### User Management

- Create player accounts
- Secure password hashing
- Player profile completion
- Player information:

  - Playing level
  - Position (Drive / Reves / Both)
  - Dominant hand
  - Preferred match type
  - Location
  - Player preferences

### Location Management

- City database
- Player location relationship

### Backend API

- REST API with NestJS
- Prisma database integration
- Swagger documentation
- DTO validation
- Clean architecture structure

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
DATABASE_URL="postgresql://user:password@localhost:5432/padel_connect"
```

Run Prisma migrations:

```bash
cd apps/api

pnpm prisma migrate dev
```

Start the backend:

```bash
pnpm start:dev
```

## 📚 API Documentation

Swagger documentation is available at:

```
http://localhost:3000/docs
```

## 🗺️ Roadmap

### Authentication

- JWT authentication
- Login system
- Refresh tokens
- Role-based access

### Players

- Search players nearby
- Create matches
- Find missing players
- Player ratings

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
