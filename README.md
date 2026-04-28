# Venue Picker

**Mobile-first venue discovery and group decision-making app.**

[![React Native](https://img.shields.io/badge/React_Native-Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Go](https://img.shields.io/badge/Go-1.21-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://go.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Local_Dev-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

---

## Overview

Venue Picker helps people decide where to go without long group chats and indecision. It combines a mobile app, preference collection, venue discovery flows, and a Go backend for decision sessions.

The project is organized as a monorepo with an Expo mobile client, backend services, shared packages, and local development infrastructure.

## Project Status

Mobile app prototype. The repository is kept public as a portfolio project for venue discovery, group decision flows, and mobile-first product architecture.

## Features

- **Group venue decisions** - Create a session, collect preferences, and narrow down options
- **Individual discovery** - Explore venue ideas based on taste, location, and context
- **Mobile-first UX** - Expo and React Native app structure for iOS and Android flows
- **Preference onboarding** - Capture cuisine, budget, distance, mood, and social context
- **Go API** - Lightweight backend service with chi routing
- **Supabase Auth** - Authentication integration for the mobile client
- **Local services** - PostgreSQL and Redis support through Docker Compose

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile Client | React Native, Expo Router, TypeScript |
| API | Go, chi router |
| Database | PostgreSQL, Redis for local development |
| Auth | Supabase Auth |
| Tooling | npm workspaces, Prettier, Docker Compose |

## Getting Started

```bash
git clone https://github.com/umitaltinozzz/venue-picker.git
cd venue-picker
npm install
cd apps/mobile
npm install
npm start
```

Root scripts:

| Command | Description |
|---|---|
| `npm run dev:mobile` | Start the Expo mobile app |
| `npm run dev:web` | Start the web app, if enabled |
| `npm run format` | Format supported files with Prettier |

## Project Structure

```text
venue-picker/
|-- apps/mobile/       # Expo React Native client
|-- apps/web/          # Web app, if enabled
|-- backend/           # Go API and migrations
|-- packages/          # Shared TypeScript packages
|-- scripts/           # Utility scripts
`-- docker-compose.yml
```

## Environment

Configure mobile and backend environment files according to the services you enable locally. Keep Supabase, database, and API secrets out of version control.

## License

[MIT License](./LICENSE)