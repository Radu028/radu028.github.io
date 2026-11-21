import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { lastUpdated, me, ongoing, papers, profile, type Paper } from "@/content";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="mx-auto max-w-[720px] px-4 pt-10 pb-22 font-sans text-[15.5px] leading-[1.7] text-body sm:pt-20">
      <Header />

      <div className="mt-9 space-y-3.5">
        {profile.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <Section title="Papers">
        <div className="divide-y divide-border">
          {papers.map((paper) => (
            <PaperRow key={paper.title} paper={paper} />
          ))}
        </div>
      </Section>

      <Section title="Ongoing">
        {ongoing.map((item) => (
          <p key={item.title} className="mt-3">
            <span className="block font-semibold text-foreground">{item.title}</span>
            {item.text}
          </p>
        ))}
      </Section>

      <footer className="mt-16 text-[13px] text-muted">Last updated {lastUpdated}</footer>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-start gap-4.5 sm:flex-row sm:items-center sm:gap-7">
      <img
        src={profile.photo}
        alt={profile.name}
        width={132}
        height={132}
        className="size-26 shrink-0 rounded-full object-cover sm:size-33"
      />
      <div>
        <h1 className="text-[30px] leading-tight font-semibold tracking-[-0.025em] text-foreground">
          {profile.name}
        </h1>
        <div className="mt-1 text-muted">{profile.role}</div>
        <nav className="mt-3.5 flex flex-wrap gap-x-4.5 gap-y-1.5 text-[14.5px] font-medium">
          <A href={`mailto:${profile.email}`}>{profile.email}</A>
          {profile.links.map((l) => (
            <A key={l.label} href={l.href}>
              {l.label}
            </A>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-13">
      <h2 className="mb-1.5 text-[13px] font-semibold tracking-[0.07em] text-muted uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

function PaperRow({ paper }: { paper: Paper }) {
  return (
    <article className="grid gap-x-3 py-4 sm:grid-cols-[52px_1fr]">
      <div className="text-sm text-muted tabular-nums">{paper.year}</div>
      <div>
        <a href={paper.href} className="font-semibold text-foreground hover:text-accent">
          {paper.title}
        </a>
        <div className="mt-0.5">
          {paper.authors.map((a, i) => (
            <span key={a}>
              {i > 0 && ", "}
              {a === me ? <b className="font-semibold text-foreground">{a}</b> : a}
            </span>
          ))}
        </div>
        <div className="text-muted">{paper.venue}</div>
        <div className="mt-1 flex gap-3.5 text-sm font-medium">
          {paper.links.map((l) => (
            <A key={l.label} href={l.href}>
              {l.label}
            </A>
          ))}
        </div>
      </div>
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
