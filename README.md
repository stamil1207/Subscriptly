# Subscription Frontend (React + Vite)

Frontend implementation for a project management SaaS with separate User and Admin panels.

## Stack

- React + Vite
- React Router
- Axios
- Tailwind CSS
- Stripe.js

## Features

- JWT-based auth flow (register, login, session restore)
- Role-based route guards (`user` vs `admin`)
- User panel routes under `/app/*`
- Admin panel routes under `/admin/*`
- Projects page with create/list/delete actions
- Billing page with Stripe Checkout redirect and cancel action
- Profile and admin monitoring pages

## Environment Variables

Copy `.env.example` to `.env` and fill values:

- `VITE_API_BASE_URL`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_STRIPE_PRO_PRICE_ID`

## Run Locally

```bash
npm install
npm run dev
```

App runs by default at `http://localhost:5173`.

## API Contract Expectations

The frontend expects these backend endpoints:

- `POST /auth/register`
- `POST /auth/login` -> `{ access_token, user }`
- `GET /auth/me`
- `GET/POST/PUT/DELETE /projects`
- `GET /billing/subscription`
- `POST /billing/checkout-session` -> `{ session_id }`
- `POST /billing/cancel`
- `GET /admin/users`
- `GET /admin/subscriptions`

## Notes and Tradeoffs

- Project-limit enforcement (free max 3) is expected from backend and surfaced as API errors in UI.
- Frontend keeps auth token/user in local storage for fast session restore.
- UI is intentionally simple to prioritize architecture and correctness over styling complexity.
