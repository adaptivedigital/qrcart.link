# QRCart.link Deployment Guide

To deploy your store to Vercel with a Supabase database, follow these steps:

## 1. Supabase Setup
- Create a project at [supabase.com](https://supabase.com).
- Go to **Project Settings > Database**.
- Copy the **Connection String (URI)**.
- Choose **Transaction Mode** (Port 6543) for `DATABASE_URL`.
- Choose **Session Mode** (Port 5432) for `DIRECT_URL`.

## 2. Environment Variables
Create a `.env.local` file (it is already in `.gitignore`) and add these:

```bash
# Supabase Connection
DATABASE_URL="postgres://postgres.[YOUR-ID]:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgres://postgres.[YOUR-ID]:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

# Auth.js (NextAuth)
AUTH_SECRET="[Generate with: npx auth secret]"
AUTH_URL="http://localhost:3000" # Change to your domain in production

# Google OAuth
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
```

## 3. Database Sync
Once the variables are set, run:
`npx prisma db push`

## 4. Deploy to Vercel
- Push your code to a GitHub repository.
- Connect the repository to Vercel.
- Add the same environment variables in the Vercel dashboard.
