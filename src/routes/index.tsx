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

// Type sizes and the column width are in rem, so they follow the reader's
// browser font size. The pixel values in these comments assume the usual 16px.
//
// Text has three levels of emphasis. Dark and prominent: the name, headings, the
// lead, paper titles and the key phrases marked in content.ts. Gray at body size:
// the bio and each paper's result. Gray and smaller: authors, dates and details.
//
// Spacing has three steps so groups read as groups: up to 8px inside an item,
// 28px between papers, 52px between sections. The 640px text column holds
// about 78 characters per line. `max-[23rem]` rules cover phones under 368px.
function Home() {
  return (
    <div className="mx-auto max-w-[42.5rem] px-5 pt-8 pb-20 font-serif text-[1.0625rem] leading-[1.55] wrap-break-word text-body sm:pt-16 print:py-0">
      {/* Phone: a small photo beside the name, contacts on a full-width row below.
          Wider screens: the photo spans both rows on the left. */}
      <header className="grid grid-cols-[72px_minmax(0,1fr)] items-start gap-x-4 gap-y-3 max-[23rem]:grid-cols-[56px_minmax(0,1fr)] max-[23rem]:gap-x-3 sm:grid-cols-[148px_minmax(0,1fr)] sm:grid-rows-[auto_1fr] sm:gap-x-7 sm:gap-y-2.5">
        <img
          src={profile.photo}
          alt={profile.name}
          width={148}
          height={148}
          className="size-[72px] object-cover max-[23rem]:size-14 sm:row-span-2 sm:size-[148px]"
        />
        <div>
          <h1 className="text-[1.625rem] leading-tight font-semibold text-foreground max-[23rem]:text-[1.5rem] sm:text-[2rem]">
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
          <nav className="mt-0.5 flex flex-wrap gap-x-[18px] gap-y-0.5 max-[23rem]:gap-x-3">
            {profile.links.map((l) => (
              <A key={l.label} href={l.href}>
                {l.label}
              </A>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <p className="mt-7 text-[1.1875rem] leading-[1.45] text-pretty text-foreground sm:text-[1.25rem]">
          <Rich text={profile.lead} strong="font-semibold" />
        </p>
        <div className="mt-3.5 space-y-3 text-muted">
          {profile.bio.map((p) => (
            <p key={p} className="text-pretty">
              <Rich text={p} />
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
      </main>

      <footer className="mt-14 border-t border-border pt-3 text-[0.90625rem] text-muted print:mt-4">
        Last updated {lastUpdated}
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-13 print:mt-6">
      <h2 className="mb-4 border-b border-border pb-1.5 text-[1.25rem] leading-snug font-semibold text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

// The title leads. Authors and venue follow in the smaller `text-meta` size.
// The result is gray at body size, with its key phrases dark.
function PaperItem({ paper }: { paper: Paper }) {
  return (
    <li className="break-inside-avoid">
      <h3 className="leading-snug font-semibold text-balance sm:text-[1.15625rem]">
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
            {/* From `sm` up, nowrap keeps a name from splitting across two lines.
                Phones let names split, which saves lines in long author lists. */}
            <span
              className={
                a.replace(/\*$/, "") === me
                  ? "font-semibold text-foreground sm:whitespace-nowrap"
                  : "sm:whitespace-nowrap"
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
      <p className="mt-2 text-pretty text-muted">
        <Rich text={paper.result} />
      </p>
    </li>
  );
}

// The date sits in a right-hand column, and the optional detail spans the full
// row below so the date column never squeezes it. Under 368px the date column
// would leave too little room for the name, so the three parts stack.
function Entries({ items }: { items: Entry[] }) {
  return (
    <ul className="space-y-3">
      {items.map((e) => (
        <li
          key={e.what}
          className="grid break-inside-avoid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-5 max-[23rem]:block"
        >
          <div>{e.what}</div>
          <div className="text-meta text-muted tabular-nums">{e.when}</div>
          {e.detail && <div className="col-span-2 text-meta text-muted">{e.detail}</div>}
        </li>
      ))}
    </ul>
  );
}

// Renders text from content.ts, setting each **marked** key phrase dark.
// `strong` is the weight class for those phrases.
function Rich({ text, strong = "font-medium" }: { text: string; strong?: string }) {
  // split() with one capture group alternates plain text and key phrases.
  return text.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={part} className={`${strong} text-foreground`}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

// Used for every link except paper titles. The underline stays visible at rest,
// because touch screens have no hover.
function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="text-accent underline decoration-accent/60 decoration-1 underline-offset-[3px] hover:decoration-accent"
    >
      {children}
    </a>
  );
}
