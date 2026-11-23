import { Fragment, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
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

// Spacing has three steps so groups read as groups: up to 8px inside an item,
// 28px between papers, 52px between sections. The 640px text column holds
// about 78 characters per line.
function Home() {
  return (
    <main className="mx-auto max-w-[680px] px-5 pt-8 pb-20 font-serif text-[17px] leading-[1.55] text-body sm:pt-16">
      {/* Phone: a small photo beside the name, contacts on a full-width row below.
          Wider screens: the photo spans both rows on the left. */}
      <header className="grid grid-cols-[72px_minmax(0,1fr)] items-start gap-x-4 gap-y-3 sm:grid-cols-[148px_minmax(0,1fr)] sm:grid-rows-[auto_1fr] sm:gap-x-7 sm:gap-y-2.5">
        <img
          src={profile.photo}
          alt={profile.name}
          width={148}
          height={148}
          className="size-[72px] object-cover sm:row-span-2 sm:size-[148px]"
        />
        <div>
          <h1 className="text-[26px] leading-tight font-semibold text-foreground sm:text-[32px]">
            {profile.name}
          </h1>
          <div className="mt-1.5">
            {profile.role.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1 sm:col-start-2">
          <A href={`mailto:${profile.email}`}>{profile.email}</A>
          <nav className="mt-0.5 flex flex-wrap gap-x-[18px] gap-y-0.5">
            {profile.links.map((l) => (
              <A key={l.label} href={l.href}>
                {l.label}
              </A>
            ))}
          </nav>
        </div>
      </header>

      <div className="mt-7 space-y-3">
        {profile.bio.map((p) => (
          <p key={p} className="text-pretty">
            {p}
          </p>
        ))}
      </div>

      <Section title="Publications">
        <ol className="space-y-7">
          {papers.map((paper) => (
            <PaperItem key={paper.title} paper={paper} />
          ))}
        </ol>
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

      <footer className="mt-14 border-t border-border pt-3 text-[14.5px] text-muted">
        Last updated {lastUpdated}
      </footer>
    </main>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-13">
      <h2 className="mb-4 border-b border-border pb-1.5 text-[20px] leading-snug font-semibold text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

// A paper reads in order of importance: the title, then the result in body text.
// Authors and venue sit between them in the smaller `text-meta` size.
function PaperItem({ paper }: { paper: Paper }) {
  return (
    <li>
      <h3 className="leading-snug font-semibold text-balance">
        <a
          href={paper.href}
          className="text-accent decoration-1 underline-offset-[3px] hover:underline focus-visible:underline"
        >
          {paper.title}
        </a>
      </h3>
      <div className="mt-1 text-meta text-muted">
        {paper.authors.map((a, i) => (
          <Fragment key={a}>
            {i > 0 && ", "}
            {/* nowrap keeps a name from splitting across two lines. */}
            <span
              className={
                a.replace(/\*$/, "") === me
                  ? "font-semibold whitespace-nowrap text-foreground"
                  : "whitespace-nowrap"
              }
            >
              {a}
            </span>
          </Fragment>
        ))}
      </div>
      <div className="mt-0.5 text-meta">
        <i>{paper.venue}</i>{" "}
        {/* nowrap keeps "[paper] [code]" together when the venue fills the line. */}
        <span className="whitespace-nowrap">
          {paper.links.map((l, i) => (
            <Fragment key={l.label}>
              {i > 0 && " "}[<A href={l.href}>{l.label}</A>]
            </Fragment>
          ))}
        </span>
      </div>
      <p className="mt-2 text-pretty">{paper.result}</p>
    </li>
  );
}

// The date stays in a right-hand column at every width. The optional detail
// spans the full row below, so the date column never squeezes it.
function Entries({ items }: { items: Entry[] }) {
  return (
    <ul className="space-y-3">
      {items.map((e) => (
        <li key={e.what} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-5">
          <div>{e.what}</div>
          <div className="text-meta text-muted tabular-nums">{e.when}</div>
          {e.detail && <div className="col-span-2 text-meta text-muted">{e.detail}</div>}
        </li>
      ))}
    </ul>
  );
}

// Links keep a faint underline at rest, because touch screens have no hover.
function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="text-accent underline decoration-accent/35 decoration-1 underline-offset-[3px] hover:decoration-accent"
    >
      {children}
    </a>
  );
}
