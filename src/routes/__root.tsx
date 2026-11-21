import type { ReactNode } from "react";
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import serifUrl from "@fontsource-variable/literata/files/literata-latin-wght-normal.woff2?url";
import sansUrl from "@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2?url";
import appCss from "@/styles.css?url";
import { profile } from "@/content";

const description = `${profile.name}, ${profile.role}. Research on multimodal models and language models.`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: profile.name },
      { name: "description", content: description },
      { property: "og:title", content: profile.name },
      { property: "og:description", content: description },
      { property: "og:image", content: "https://radu028.github.io/photo.jpg" },
      { property: "og:type", content: "profile" },
      { name: "color-scheme", content: "light dark" },
    ],
    links: [
      { rel: "preload", href: sansUrl, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: serifUrl, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/photo.jpg" },
    ],
  }),
  component: () => (
    <RootDocument>
      <Outlet />
    </RootDocument>
  ),
});

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {/* Dev hot reload needs these; scripts/static-only.mjs strips them from the build. */}
        <Scripts />
      </body>
    </html>
  );
}
