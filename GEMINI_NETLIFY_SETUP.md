# Gemini API Setup for Netlify Functions (`/api/chat`)

## 1. Local Development Setup (Netlify CLI + Root `.env`)

1. Open the gitignored root `.env` file:
   `C:\Users\91969\Downloads\global ai\.env`
2. Paste your Google AI Studio key into `GEMINI_API_KEY`:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   GEMINI_MODEL=gemini-3.7-flash
   ```
   *(Do not prefix with `VITE_`, and never commit `.env`.)*

3. Start Netlify Dev from `frontend/`:
   ```powershell
   cd "C:\Users\91969\Downloads\global ai\frontend"
   npx netlify-cli dev
   ```
   - Vite runs on `http://localhost:5173` and Netlify Dev proxies both the frontend and `/api/chat` on `http://localhost:8888`.
   - `frontend/netlify/functions/chat.mjs` reads `GEMINI_API_KEY` from `process.env` (and falls back to the root `.env` locally if needed).

4. Test `/api/chat` locally after adding your key:
   ```powershell
   Invoke-RestMethod -Method Post -Uri "http://localhost:8888/api/chat" -ContentType "application/json" -Body '{"message":"mild headache since morning","language":"EN","category":"symptoms"}'
   ```

## 2. Production Deployment (Netlify Dashboard)
Configure the same variables in **Netlify Dashboard -> Site configuration -> Environment variables**:
- `GEMINI_API_KEY` — Your Google Gemini API key (server-side only).
- `GEMINI_MODEL` *(optional)* — Defaults to `gemini-3.7-flash`.

## 3. Endpoint Contract (`POST /api/chat`)
- **Request JSON:** `{ "message": "...", "language": "EN|HI|MR|GU|BN|AR", "category": "symptoms", "history": [] }`
- **Response JSON:** `{ "replyText": "...", "urgency": "RED|YELLOW|GREEN", "sources": ["..."] }`
