# Subscriptly Frontend

Subscriptly is a frontend-only mock SaaS dashboard built with React and Vite.
It includes separate User and Admin panels, mock authentication, projects management UI, and billing flow screens.

## Tech Stack

- React + Vite
- TypeScript
- React Router
- Tailwind CSS

## Current Mode

This project is currently running in **frontend-only mock mode**.

- No backend integration is required to use the app UI.
- Authentication and session behavior are mocked in frontend state/local storage.
- Billing flow is UI-driven for demonstration.

## Available Screens

- Login / Register
- User panel:
  - Dashboard
  - Projects
  - Billing
  - Profile
- Admin panel:
  - Overview
  - Users
  - Subscriptions
  - Settings

## Run Locally

```bash
npm install
npm run dev
```

Default dev URL:

`http://localhost:5173`

## Test Login Credentials

Use these credentials for demo testing:

- Admin: `admin@test.com` / `Test@123`
- User: `user@test.com` / `Test@123`

Role logic in mock mode:

- If email contains `admin` -> Admin panel
- Otherwise -> User panel

## Notes

- Session is stored in browser local storage.
- UI and flows are intentionally simple for demo and learning purposes.
