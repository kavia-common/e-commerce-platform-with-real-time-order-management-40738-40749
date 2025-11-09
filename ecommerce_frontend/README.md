# E-commerce Frontend (React)

Customer-facing web interface for querying orders, managing returns, and viewing personalized product recommendations.

## Environment

Create a `.env` file based on `.env.example` with:

- REACT_APP_BACKEND_URL=http://localhost:3001
- Optional:
  - REACT_APP_SUPABASE_URL=
  - REACT_APP_SUPABASE_ANON_KEY=

Notes:
- The backend must be reachable on port 3001.
- If Supabase vars are set, Orders page will subscribe to realtime updates on `orders` table.

## Getting Started

1) Install dependencies
- npm install

2) Run locally
- npm start
- Open http://localhost:3000

3) Routes
- /login
- /orders
- /returns
- /recommendations

## Integration Checklist

- Backend URL in .env points to http://localhost:3001
- Backend CORS allows http://localhost:3000 (see backend .env ALLOW_ORIGINS)
- Database running at postgresql://appuser:dbuser123@localhost:5000/myapp (see database README)
- Optional Supabase realtime variables configured if you want realtime on Orders page

## Quick Verification Steps

1. Run database migrations/seed:
   psql postgresql://appuser:dbuser123@localhost:5000/myapp -f ../ecommerce_database/startup.sql

2. Start backend:
   uvicorn src.api.main:app --host 0.0.0.0 --port 3001 --reload

3. Start frontend:
   npm start

4. App flow:
   - Visit /login, register then login via /auth endpoints
   - Go to /orders and view user orders
   - Create a return on /returns
   - View recommendations on /recommendations
   - If Supabase configured, trigger an order change and observe realtime updates on /orders
