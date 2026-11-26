# Gemini API Setup for Netlify Functions (`/api/chat`)

## 1. Required Environment Variables
Configure these in **Netlify Dashboard -> Site configuration -> Environment variables** (server-side only; **never** prefix with `VITE_`):

- `GEMINI_API_KEY` — Your Google Gemini API key from Google AI Studio.
- `GEMINI_MODEL` *(optional)* — Defaults to `gemini-2.5-flash`.

## 2. Local Development (Optional)
Create a local `.env` file (gitignored) in the Netlify base directory (`frontend/`) or root:

```env
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.5-flash
```

Then run `netlify dev` from `frontend/` so `/api/chat` routes to `netlify/functions/chat.mjs`.

## 3. Endpoint Contract (`POST /api/chat`)
- **Request JSON:** `{ "message": "...", "language": "EN|HI|MR|GU|BN|AR", "category": "symptoms", "history": [] }`
- **Response JSON:** `{ "replyText": "...", "urgency": "RED|YELLOW|GREEN", "sources": ["..."] }`
