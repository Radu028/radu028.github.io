# Homepage

Radu Stefan Popa's academic homepage. One static page, built with TanStack Start, Tailwind CSS and Vite+ (pnpm), and published on GitHub Pages.

- Text and links: `src/content.ts`. Layout: `src/routes/index.tsx`.
- `pnpm dev` runs it at http://localhost:3000. `pnpm check` formats, lints and type-checks through `vp check`.
- `pnpm build` prerenders `dist/client/index.html`, then `scripts/static-only.mjs` removes the JavaScript, since the page has nothing interactive.
- Pushing to `main` deploys through `.github/workflows/deploy.yml`.
- `public/cv.pdf` is the public CV. It must not mention the CVPR submission: the CVPR 2027 author guidelines say "you should not list CVPR submissions on public websites".
