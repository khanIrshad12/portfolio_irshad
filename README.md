# Portfolio — Neo-Brutalist Next.js Site

Personal resume portfolio with neo-brutalism design, Framer Motion animations, and an admin panel for content + theme customization.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion**
- **Fonts:** [Archivo Black](https://fonts.google.com/specimen/Archivo+Black) + [Lexend Mega](https://fonts.google.com/specimen/Lexend+Mega)

## Quick Start

```bash
cd portfolio
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the portfolio.

## Admin Panel

1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Default password: `changeme123`
3. Change it in `.env.local`:

```env
ADMIN_PASSWORD=your-secure-password
```

### What you can customize

| Tab | Editable |
|-----|----------|
| **Profile** | Name, title, tagline, email, phone, location, resume URL, social links |
| **About** | Headline, bio, highlight bullets |
| **Projects** | Add/remove projects, tags, featured flag, GitHub links |
| **Skills** | Skill names + proficiency levels |
| **Experience** | Work history entries |
| **Theme** | OKLCH colors (primary, accent, background, surface, ink) |
| **SEO** | Page title + meta description |

Content is stored in `data/portfolio.json`.

## Design

Neo-brutalism: thick ink borders, hard offset shadows, crimson + yellow palette, zero-radius cards, Archivo Black display type.

See `PRODUCT.md` and `DESIGN.md` for brand context.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |

## Customize for yourself

1. Log into `/admin`
2. Update Profile with your name, email, LinkedIn, GitHub
3. Add your real projects and experience
4. Upload a resume PDF to `public/resume.pdf` and set the resume URL to `/resume.pdf`
5. Tweak theme colors in the Theme tab
