import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { currentWork, lastUpdated, me, papers, profile, type Paper } from "@/content";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="mx-auto max-w-[800px] px-4 pt-8 pb-20 font-sans text-[15.5px] leading-[1.6] text-body sm:pt-14">
      <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h1 className="text-[26px] font-semibold tracking-[-0.01em] text-foreground">
          {profile.name}
        </h1>
        <nav className="flex flex-wrap gap-x-5 gap-y-1">
          <A href={`mailto:${profile.email}`}>Email</A>
          {profile.links.map((l) => (
            <A key={l.label} href={l.href}>
              {l.label}
            </A>
          ))}
        </nav>
      </header>

      <section className="mt-8 flex flex-col gap-6 sm:flex-row sm:gap-8">
        <img
          src={profile.photo}
          alt={profile.name}
          width={176}
          height={176}
          className="size-32 shrink-0 rounded-md object-cover sm:size-44"
        />
        <div className="space-y-3.5">
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="text-muted">{profile.email}</p>
        </div>
      </section>

      <Section title="Publications">
        <ul className="space-y-5">
          {papers.map((paper) => (
            <PaperItem key={paper.title} paper={paper} />
          ))}
        </ul>
      </Section>

      <Section title="Current work">
        <p>
          <span className="font-semibold text-foreground">{currentWork.title}.</span>{" "}
          {currentWork.text}
        </p>
      </Section>

      <footer className="mt-14 border-t border-border pt-4 text-[13px] text-muted">
        Last updated {lastUpdated}
      </footer>
    </main>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-11">
      <h2 className="mb-3.5 text-[19px] font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

function PaperItem({ paper }: { paper: Paper }) {
  return (
    <li>
      <a
        href={paper.href}
        className="font-medium text-accent hover:underline hover:underline-offset-3"
      >
        {paper.title}
      </a>
      <div>
        {paper.authors.map((a, i) => (
          <span key={a}>
            {i > 0 && ", "}
            {a === me ? <b className="font-semibold text-foreground">{a}</b> : a}
          </span>
        ))}
      </div>
      <div className="text-muted">
        {paper.venue}
        {paper.links.map((l) => (
          <span key={l.label}>
            {" "}
            [<A href={l.href}>{l.label}</A>]
          </span>
        ))}
      </div>
    </li>
  );
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="text-accent hover:underline hover:underline-offset-3">
      {children}
    </a>
  );
}
