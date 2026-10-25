# EMBER — Premium 3D Product Showcase

An Apple / Tesla / Awwwards-style interactive product experience: eight floating 3D energy-drink cans,
cinematic camera zooms, glassmorphism UI and buttery-smooth scroll animation.

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS · Three.js · React Three Fiber · drei · GSAP + ScrollTrigger · Framer Motion · Lenis · React Icons

## Run it in VS Code

```bash
# 1. open the folder
code product-showcase

# 2. in the VS Code terminal (Ctrl + `)
npm install
npm run dev
```

The dev server opens at http://localhost:5173 .

Other commands:

```bash
npm run build       # type-check + production build into /dist
npm run preview     # serve the production build locally
npm run typecheck   # TypeScript only
```

Requires Node.js 18+ (Node 20+ recommended).

## What's inside

| Area | Where |
| --- | --- |
| 3D can model (lathe geometry + procedural label textures) | `src/components/three/CanModel.tsx`, `labelTexture.ts` |
| Hero scene (large floating can, scroll + pointer reactive) | `src/components/three/HeroScene.tsx` |
| 8-can lineup, hover / click / camera zoom (GSAP) | `src/components/three/LineupScene.tsx` |
| Flavor data (name, description, ingredients, sugar, calories, energy, colors) | `src/data/flavors.ts` |
| Site copy: features, ingredients, FAQ, reviews | `src/data/content.ts` |
| Global flavor state + animated theme colors | `src/context/FlavorContext.tsx` |
| Sections: Hero, About, Features, Flavors, Ingredients, Nutrition, Testimonials, FAQ, Contact, Footer | `src/sections/` |
| Loader, cursor glow, particles, magnetic buttons, page-transition wipe | `src/components/` |

## Customize

* **Flavors / colors:** edit `src/data/flavors.ts`. The cans, label art, lighting, theme and nutrition bars all update automatically.
* **Brand name & copy:** `index.html`, `src/data/content.ts`, `src/sections/Footer.tsx`.
* **Contact form:** `src/sections/Contact.tsx` currently simulates sending; connect it to your API / form service in `onSubmit`.

## Notes

* No 3D model or HDR downloads are needed. The cans, labels and studio reflections are generated in code.
* Fonts (Inter, Sora) load from Google Fonts; the site falls back to system fonts if offline.
* Respects `prefers-reduced-motion`; keyboard navigable with a skip link, ARIA labels, and semantic landmarks.
