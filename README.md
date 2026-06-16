# Note-Keep — Full Stack Notes App

A full-stack web application for creating, storing and managing personal notes. Users can register, securely log in, and perform full CRUD operations on their notes. Data is stored in a cloud PostgreSQL database.

**Project from catalog:** https://theankurtyagi.com/notes-app-react-supabase/

## Tech Stack
- **Frontend:** React, Vite, TypeScript, React Router, Tailwind CSS
- **Backend:** Supabase (BaaS, PostgREST)
- **Database:** PostgreSQL (via Supabase)
- **Auth:** Supabase Auth (email/password)

## Features
- User registration and login
- Create, read, update, delete notes
- Row Level Security — users see only their own notes
- Responsive UI with Tailwind CSS

## Local Setup
```bash
npm install
# create .env.local with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm run dev