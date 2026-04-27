<div align="center">

# FARKETMEZ

**Venue discovery and group decision-making app**

[![React Native](https://img.shields.io/badge/React_Native-Expo-000020?style=for-the-badge&logo=expo)](https://expo.dev/)
[![Go](https://img.shields.io/badge/Go-1.21-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://go.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

</div>

---

## Overview

FARKETMEZ simplifies venue selection and group decision-making for social outings. It combines a mobile-first experience with gamified decision flows and an extensible backend architecture.

## Features

- Group and individual venue discovery flows
- Onboarding and preference collection
- Go-based REST API with extensible routing
- Supabase Auth integration for mobile

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile Client | React Native, Expo Router, TypeScript |
| API | Go, chi router |
| Database | PostgreSQL, Redis (Docker for local dev) |
| Auth (mobile) | Supabase Auth |

## Getting Started

`ash
# Clone the repository
git clone https://github.com/umitaltinozzz/farketmez.git
cd farketmez

# Install root and mobile dependencies
npm install
cd apps/mobile && npm install && cd ../..
`

## Project Structure

`
farketmez/
├── apps/mobile/       # Expo (React Native) client
├── backend/           # Go API and migrations
├── packages/          # Shared TypeScript packages
├── scripts/           # Utility scripts
└── docker-compose.yml
`

## License

MIT
