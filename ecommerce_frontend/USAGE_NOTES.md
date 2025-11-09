# Frontend Usage Notes

- Create a .env file in ecommerce_frontend based on .env.example.
- Set REACT_APP_BACKEND_URL to the backend URL (e.g., http://localhost:3001).
- Optional: set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY to enable realtime updates on the Orders page.
- Ensure backend CORS allows http://localhost:3000 (set ALLOW_ORIGINS in backend .env).
- npm start to run the app. Routes:
  - /login
  - /orders
  - /returns
  - /recommendations
