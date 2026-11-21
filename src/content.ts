// Everything the page says lives here, so text edits never touch layout code.
// PaMuk-Bench stays a project in progress with no venue or author list: the CVPR 2027
// author guidelines say "you should not list CVPR submissions on public websites".

export const me = "Radu Stefan Popa";

export const profile = {
  name: me,
  role: "Final-year Computer Science student, University of Bucharest",
  email: "radupopa028@gmail.com",
  photo: "/photo.jpg",
  links: [
    { label: "CV", href: "/cv.pdf" },
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=6-b6aLkAAAAJ" },
    { label: "GitHub", href: "https://github.com/Radu028" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/radupopa28/" },
  ],
  lede: "I work on multimodal models and language models: vision-language models across languages with Radu Tudor Ionescu, and small language models for Romanian with Sergiu Nisioi.",
  aside:
    "Alongside my studies I work full-time as a software engineer at Liamis & HEB International and teach weekly algorithms classes at my faculty.",
};

type Link = { label: string; href: string };

export type Work = {
  title: string;
  href?: string;
  /** Author list for papers; the name equal to `me` is set in bold. */
  authors?: string[];
  /** Used instead of `authors` for projects without a public author list. */
  byline?: string;
  status: string;
  summary: string;
  links: Link[];
};

export const works: Work[] = [
  {
    title: "PaMuk-Bench",
    byline: "With Radu Tudor Ionescu and a team of 13 researchers",
    status: "In progress",
    summary:
      "A parallel benchmark for vision-language tasks in seven languages. I led the captioning study and built the method that taught three image generators six more languages.",
    links: [],
  },
  {
    title: "BLiMP-RO: A Benchmark of Linguistic Minimal Pairs for Romanian",
    href: "https://arxiv.org/abs/2611.17836",
    authors: [me, "Valentin Feroiu", "Adina Camelia Bleotu", "Sergiu Nisioi"],
    status: "Preprint, 2026",
    summary:
      "A benchmark of Romanian grammar covering 50 phenomena, built with linguists and validated with native speakers.",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2611.17836" }],
  },
  {
    title: "Romanian Small Language Models Trained on Native Child-Targeted Media",
    href: "https://openreview.net/forum?id=JitnCb895x",
    authors: [me, "Adina Camelia Bleotu", "Sergiu Nisioi"],
    status: "NeurIPS 2026 Workshop on Linguistic Principles for Foundation Models (LP4FM), poster",
    summary:
      "A corpus of 10M words from Romanian children's video, and language models trained on it from scratch.",
    links: [
      { label: "OpenReview", href: "https://openreview.net/forum?id=JitnCb895x" },
      { label: "Code", href: "https://github.com/Radu028/ro-childlm" },
    ],
  },
];

export const lastUpdated = "November 2026";
