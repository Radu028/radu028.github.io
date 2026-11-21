import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { currentWork, lastUpdated, me, papers, profile, type Paper } from "@/content";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="mx-auto max-w-[860px] px-4 pt-10 pb-24 font-sans text-base leading-[1.6] text-body sm:pt-22">
      <header className="flex items-center justify-between gap-6 pb-7 sm:pb-11">
        <div>
          <h1 className="text-[31px] leading-[1.1] font-semibold tracking-[-0.035em] text-foreground sm:text-[40px]">
            {profile.name}
          </h1>
          <div className="mt-2 text-[17px] text-muted">{profile.role}</div>
        </div>
        <img
          src={profile.photo}
          alt={profile.name}
          width={84}
          height={84}
          className="size-16 shrink-0 rounded-full object-cover sm:size-21"
        />
      </header>

      <Row label="About">
        <div className="max-w-[38em] space-y-3">
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Row>

      <Row label="Publications">
        <ul className="max-w-[40em] space-y-5">
          {papers.map((paper) => (
            <PaperItem key={paper.title} paper={paper} />
          ))}
        </ul>
      </Row>

      <Row label="Current work">
        <p className="max-w-[38em]">
          <b className="font-semibold text-foreground">{currentWork.title}.</b> {currentWork.text}
        </p>
      </Row>

      <Row label="Contact">
        <nav className="flex flex-wrap gap-x-5.5 gap-y-1.5">
          <A href={`mailto:${profile.email}`}>{profile.email}</A>
          {profile.links.map((l) => (
            <A key={l.label} href={l.href}>
              {l.label}
            </A>
          ))}
        </nav>
      </Row>

      <footer className="border-t border-border pt-4.5 text-sm text-muted">
        Last updated {lastUpdated}
      </footer>
    </main>
  );
}

/** One labelled band of the page; the label sits in a left column from 640px up. */
function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="grid gap-x-6 gap-y-2 border-t border-border py-5.5 sm:grid-cols-[170px_1fr] sm:py-7.5">
      <h2 className="pt-px text-[15px] font-normal text-muted">{label}</h2>
      {children}
    </section>
  );
}

function PaperItem({ paper }: { paper: Paper }) {
  return (
    <li>
      <a href={paper.href} className="font-medium text-foreground hover:text-accent">
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
      <div className="text-muted">{paper.venue}</div>
      <div className="mt-0.5 flex gap-4">
        {paper.links.map((l) => (
          <A key={l.label} href={l.href}>
            {l.label}
          </A>
        ))}
      </div>
    </li>
  );
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="text-foreground underline decoration-underline decoration-1 underline-offset-4 hover:text-accent hover:decoration-accent"
    >
      {children}
    </a>
  );
}
