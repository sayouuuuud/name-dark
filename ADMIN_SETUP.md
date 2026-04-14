# Admin Panel Setup Guide

## Environment Variables Required

Add these to your `.env.local` or Vercel project settings:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Admin Panel Access

**URL:** `https://yourdomain.com/admin/login`  
**Default Password:** `admin123` (change this in `/app/admin/login/page.tsx`)

## Features

### Dashboard
- View total visits and unique IPs
- See top visiting countries with bar chart
- Current domain price display

### Settings Management
- Change domain price
- Update purchase link (e.g., Spaceship URL)
- Update contact email

### Keep-Alive Service
The app automatically pings the database daily to prevent Supabase from pausing it.

**Schedule:** Every day at 9 AM UTC (configured in `next.config.mjs`)

You can also manually run the script:
```bash
node scripts/keep-alive.js
```

Or set up an external cron service to call:
```
POST https://yourdomain.com/api/keep-alive
```

## Database Schema

Three tables are automatically created:

1. **site_settings** - Stores price, links, contact info
2. **visits** - Tracks each page visit with country/city/IP
3. **keep_alive** - Logs daily pings to prevent database pause

All tables have automatic timestamps.
