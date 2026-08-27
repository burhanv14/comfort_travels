# Comfort Travels Frontend
Production-ready travel agency website built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui.

## Tech Stack

- Next.js (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- shadcn/ui + Lucide Icons
- TanStack Query
- React Hook Form + Zod
- Axios
- Framer Motion (minimal, meaningful animation)
- next/image and next/font

## Features

- Premium responsive UI with dark mode support
- Home page sections: hero, search, popular destinations, featured packages, services, testimonials, stats, CTA
- Public pages: packages, package details, destinations, destination details, visa, flight, train, hotels, about, contact, blogs
- Centralized API layer under `lib/api`
- JWT-based admin login
- Protected admin section with dashboard, package/destination/testimonial/blog management, enquiries, users, settings
- API mock routes under `app/api/v1/*`
- SEO: Metadata API, OpenGraph, Twitter cards, JSON-LD, sitemap, robots
- Accessibility basics: semantic markup, keyboard-friendly controls, aria labels on key interactions

## Project Structure

```text
app/                      # App Router pages, route handlers, SEO files
features/                 # Feature modules (home, packages, booking, admin, blogs, etc.)
components/               # Shared layout, UI, and reusable blocks
lib/                      # API client, constants, auth, validation, SEO helpers
data/mock/                # Mock data used by API routes
hooks/                    # Reusable hooks (auth, debounce)
providers/                # App-wide providers (theme, query, toasts)
types/                    # Centralized TypeScript domain types
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure values.

```bash
cp .env.example .env.local
```

Required variables:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_APP_NAME`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run start` - Run production server
- `npm run lint` - ESLint checks
- `npm run typecheck` - TypeScript checks
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Validate formatting

## Quality Tooling

- Prettier configuration: `.prettierrc.json`
- Husky pre-commit hook: `.husky/pre-commit`
- lint-staged configured in `package.json`

Run once after install to enable git hooks:

```bash
npm run prepare
```

## Admin Access (Development)

- Route: `/admin/login`
- Default email/password come from `.env.local`

## Performance Notes

- Route-based code splitting through App Router
- Optimized images via `next/image`
- Data fetching with caching via TanStack Query
- Minimal animation for fast, clean interactions

## Deployment Checklist

- Set production env vars
- Replace default JWT secret and admin credentials
- Connect real backend APIs if needed
- Verify SEO metadata and canonical app URL
- Run `npm run lint` and `npm run typecheck`


Happy developing.