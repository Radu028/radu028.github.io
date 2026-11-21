import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// One static page for GitHub Pages: prerendering writes index.html at build time,
// so nothing runs on a server after deploy.
export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: false, failOnError: true },
    }),
    // React's plugin must come after Start's.
    viteReact(),
  ],
})
