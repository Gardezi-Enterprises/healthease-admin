# Project Overview
This project is a modern web application called **Healthease Admin**. It is built using Vite, React, TypeScript, Tailwind CSS, and Supabase. The primary purpose is to manage healthcare services via an admin panel.

## Deployment
- **Host:** Vercel
- **Vercel CLI:** Installed via npm
- **Git Remote:** Originally pointed to Gardezi-Enterprises org, then changed to personal account. Final successful push was to Gardezi-Enterprises.

## Project Structure
- **Frontend:** React with TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Context API

## Database
- **Backend:** Supabase
- **Usage:** 
  - Authentication management
  - Services data is stored in Supabase
- **Schema Migrations:**
  - Initially problematic due to mismatched migration versions and RLS policies
  - Solved using SQL script via Supabase Dashboard
  - Supabase CLI used for linking and pushing migrations

## Routing Issues
- 404 errors on client-side routes like `/admin`
- Fixed by adding a `vercel.json` file with rewrite rules

## Service Management
- Services added in the admin panel are stored in Supabase
- TypeScript types updated to match database schema
- Differences in camelCase used in app vs. snake_case in DB resolved

## Errors & Solutions
- **RLS Policy Violations:**
  - Errors occurred due to row-level security (RLS) policies
  - Fixed by disabling RLS on services table via SQL migration
- **Schema Mismatch:**
  - Column naming issues resolved between client and database
  - Updated TypeScript types to match database schema

## Environment
- **OS:** Windows
- **Shell:** PowerShell
- **Working Directory:** `C:\Users\HP\OneDrive\Desktop\work\healthease-admin`

## Instructions for Future Agents
- Verify database migrations are consistent between local migration files and remote database.
- Confirm RLS policies align with authentication methods used in the app.
- Ensure Vercel deployment is configured to handle SPA routing properly.
- Keep TypeScript types in sync with the database schema to prevent runtime errors.

## Miscellaneous
- **Supabase CLI:** Originally had installation problems, solved via npx
- **Supabase Dashboard:** Used for manual SQL migration due to CLI authentication issues
