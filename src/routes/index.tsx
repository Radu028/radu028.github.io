import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { lastUpdated, me, profile, works, type Work } from "@/content";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="mx-auto max-w-[640px] px-4 pt-9 pb-24 font-sans text-base leading-[1.62] text-body sm:pt-24">
      <header className="flex items-center gap-4.5">
        <img
          src={profile.photo}
          alt={profile.name}
          width={72}
          height={72}
          className="size-16 shrink-0 rounded-full object-cover sm:size-18"
        />
        <div>
          <h1 className="font-serif text-[27px] leading-[1.15] font-medium tracking-[-0.01em] text-foreground sm:text-[32px]">
            {profile.name}
          </h1>
          <div className="mt-1 leading-snug text-muted">{profile.role}</div>
        </div>
      </header>

      <p className="mt-9 font-serif text-[19px] leading-normal text-foreground">{profile.lede}</p>
      <p className="mt-3">{profile.aside}</p>

      <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-1 font-medium">
        <A href={`mailto:${profile.email}`}>{profile.email}</A>
        {profile.links.map((l) => (
          <A key={l.label} href={l.href}>
            {l.label}
          </A>
        ))}
      </nav>

      <section className="mt-16">
        {works.map((work) => (
          <WorkEntry key={work.title} work={work} />
        ))}
      </section>

      <footer className="mt-10 text-sm text-muted">Last updated {lastUpdated}</footer>
    </main>
  );
}

function WorkEntry({ work }: { work: Work }) {
  return (
    <article className="border-t border-border py-7">
      <h2 className="font-serif text-[20px] leading-[1.35] font-medium text-foreground">
        {work.href ? (
          <a href={work.href} className="hover:text-accent">
            {work.title}
          </a>
        ) : (
          work.title
        )}
      </h2>
      <div className="mt-1.5">
        {work.authors
          ? work.authors.map((a, i) => (
              <span key={a}>
                {i > 0 && ", "}
                {a === me ? <b className="font-semibold text-foreground">{a}</b> : a}
              </span>
            ))
          : work.byline}
      </div>
      <div className="text-muted">{work.status}</div>
      <p className="mt-2.5">{work.summary}</p>
      {work.links.length > 0 && (
        <div className="mt-2 flex gap-5 font-medium">
          {work.links.map((l) => (
            <A key={l.label} href={l.href}>
              {l.label}
            </A>
          ))}
        </div>
      )}
    </article>
  );
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="text-accent hover:underline hover:underline-offset-3">
      {children}
    </a>
  );
}
