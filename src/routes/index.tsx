import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { lastUpdated, me, profile, works, type Specimen, type Work } from "@/content";

export const Route = createFileRoute("/")({ component: Home });

// Below 820px the identity rail becomes a compact header above the research.
function Home() {
  return (
    <div className="mx-auto grid max-w-[1040px] gap-7 px-4 pt-7 pb-22 font-sans text-base leading-[1.62] text-body min-[820px]:grid-cols-[250px_minmax(0,1fr)] min-[820px]:gap-18 min-[820px]:pt-18">
      <Rail />
      <main>
        <p className="max-w-[34em] font-serif text-[19px] leading-normal text-foreground min-[820px]:text-[21px]">
          {profile.lede}
        </p>
        <p className="mt-3.5 max-w-[40em]">{profile.aside}</p>

        {works.map((work) => (
          <WorkEntry key={work.title} work={work} />
        ))}

        <footer className="mt-16 text-sm text-muted">Last updated {lastUpdated}</footer>
      </main>
    </div>
  );
}

function Rail() {
  return (
    <header>
      <div className="grid grid-cols-[64px_1fr] items-center gap-x-3.5 min-[820px]:sticky min-[820px]:top-18 min-[820px]:block">
        <img
          src={profile.photo}
          alt={profile.name}
          width={112}
          height={112}
          className="row-span-2 size-16 rounded-full object-cover min-[820px]:size-28"
        />
        <h1 className="font-serif text-[25px] leading-[1.15] font-medium tracking-[-0.01em] text-foreground min-[820px]:mt-5 min-[820px]:text-[30px]">
          {profile.name}
        </h1>
        <div className="text-[15px] leading-snug text-muted min-[820px]:mt-1.5 min-[820px]:text-base">
          {profile.role}
        </div>
        <ul className="col-span-full mt-3.5 flex flex-wrap gap-x-4.5 gap-y-0.5 font-medium min-[820px]:mt-5.5 min-[820px]:block min-[820px]:space-y-1">
          <li>
            <A href={`mailto:${profile.email}`}>{profile.email}</A>
          </li>
          {profile.links.map((l) => (
            <li key={l.label}>
              <A href={l.href}>{l.label}</A>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function WorkEntry({ work }: { work: Work }) {
  return (
    <article className="mt-9 border-t border-border pt-5.5 min-[820px]:mt-13 min-[820px]:pt-7">
      <h2 className="font-serif text-[21px] leading-[1.3] font-medium text-foreground min-[820px]:text-[23px]">
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
      <p className="mt-3 max-w-[40em]">{work.summary}</p>
      {work.specimen && <SpecimenFigure specimen={work.specimen} />}
      {work.links.length > 0 && (
        <div className="mt-2.5 flex gap-4.5 font-medium">
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

function SpecimenFigure({ specimen }: { specimen: Specimen }) {
  return (
    <figure className="mt-5 rounded-[10px] bg-tint px-5 py-4.5">
      {specimen.kind === "languages" ? (
        <dl className="grid grid-cols-[2.4em_1fr] items-baseline gap-x-3 gap-y-0.5">
          {specimen.rows.map((row) => (
            <div key={row.code} className="contents">
              <dt className="text-[13px] text-muted">{row.code}</dt>
              <dd
                lang={row.code}
                dir={row.script === "arabic" ? "rtl" : undefined}
                className={`text-[17px] leading-normal text-foreground ${
                  row.script === "arabic"
                    ? "text-left font-arabic"
                    : row.script === "devanagari"
                      ? "font-devanagari text-base"
                      : "font-serif"
                }`}
              >
                {row.text}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        // Linguists mark the ungrammatical sentence with an asterisk.
        <p
          lang="ro"
          className="pl-[0.7em] font-serif text-[18px] leading-[1.55] text-foreground min-[820px]:text-[20px]"
        >
          {specimen.before} <span className="border-b-2 border-accent pb-px">{specimen.word}</span>{" "}
          {specimen.after}
          <br />
          <span className="text-muted">
            <span className="-ml-[0.7em] inline-block w-[0.7em] text-star">*</span>
            {specimen.before}{" "}
            <span className="mx-[0.1em] inline-block h-[0.9em] w-[1.3em] border-b-2 border-star" />{" "}
            {specimen.after}
          </span>
        </p>
      )}
      <figcaption className="mt-3 text-sm text-muted">{specimen.caption}</figcaption>
    </figure>
  );
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="text-accent hover:underline hover:underline-offset-3">
      {children}
    </a>
  );
}
