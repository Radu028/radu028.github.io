import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  currentWork,
  education,
  experience,
  honors,
  lastUpdated,
  me,
  papers,
  profile,
  type Entry,
  type Paper,
} from "@/content";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="mx-auto max-w-[760px] px-4 pt-8 pb-20 font-serif text-[17px] leading-[1.55] text-body sm:pt-16">
      <header className="flex flex-col gap-5 sm:flex-row sm:gap-8">
        <img
          src={profile.photo}
          alt={profile.name}
          width={160}
          height={160}
          className="size-28 shrink-0 object-cover sm:size-40"
        />
        <div>
          <h1 className="text-[30px] leading-tight font-semibold text-foreground">
            {profile.name}
          </h1>
          <div className="mt-1.5">
            {profile.role.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
          <div className="mt-2.5">
            <A href={`mailto:${profile.email}`}>{profile.email}</A>
          </div>
          <nav className="mt-0.5 flex flex-wrap gap-x-4 gap-y-0.5">
            {profile.links.map((l) => (
              <A key={l.label} href={l.href}>
                {l.label}
              </A>
            ))}
          </nav>
        </div>
      </header>

      <div className="mt-8 space-y-3">
        {profile.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <Section title="Publications">
        <ol className="space-y-4">
          {papers.map((paper) => (
            <PaperItem key={paper.title} paper={paper} />
          ))}
        </ol>
      </Section>

      <Section title="Current work">
        <p>
          <b className="font-semibold text-foreground">{currentWork.title}.</b> {currentWork.text}
        </p>
      </Section>

      <Section title="Education">
        <Entries items={education} />
      </Section>

      <Section title="Honors">
        <Entries items={honors} />
      </Section>

      <Section title="Teaching and work">
        <Entries items={experience} />
      </Section>

      <footer className="mt-12 border-t border-border pt-3 text-[15px] text-muted">
        Last updated {lastUpdated}
      </footer>
    </main>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="mb-3 border-b border-border pb-1 text-[21px] font-semibold text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function PaperItem({ paper }: { paper: Paper }) {
  return (
    <li>
      <a href={paper.href} className="font-semibold text-accent hover:underline">
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
      <div>
        <i>{paper.venue}</i>
        {paper.links.map((l) => (
          <span key={l.label}>
            {" "}
            [<A href={l.href}>{l.label}</A>]
          </span>
        ))}
      </div>
      <p className="mt-1 text-muted">{paper.result}</p>
    </li>
  );
}

function Entries({ items }: { items: Entry[] }) {
  return (
    <ul className="space-y-2">
      {items.map((e) => (
        <li key={e.what} className="flex flex-col sm:flex-row sm:justify-between sm:gap-6">
          <div>
            {e.what}
            {e.detail && <div className="text-muted">{e.detail}</div>}
          </div>
          <div className="shrink-0 text-muted tabular-nums">{e.when}</div>
        </li>
      ))}
    </ul>
  );
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="text-accent hover:underline">
      {children}
    </a>
  );
}
