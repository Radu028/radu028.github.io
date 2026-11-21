// Everything the page says lives here, so text edits never touch layout code.
// PaMuk-Bench stays current work with no venue or author list: the CVPR 2027
// author guidelines say "you should not list CVPR submissions on public websites".

export const me = "Radu Stefan Popa";

export const profile = {
  name: me,
  role: "Computer Science, University of Bucharest",
  email: "radupopa028@gmail.com",
  photo: "/photo.jpg",
  links: [
    { label: "CV", href: "/cv.pdf" },
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=6-b6aLkAAAAJ" },
    { label: "GitHub", href: "https://github.com/Radu028" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/radupopa28/" },
  ],
  bio: [
    "I am a final-year Computer Science student at the University of Bucharest. I work on multimodal models and language models: vision-language models across languages with Radu Tudor Ionescu, and small language models for Romanian with Sergiu Nisioi.",
    "Alongside my studies I work full-time as a software engineer at Liamis & HEB International and teach weekly algorithms classes at my faculty.",
  ],
};

type Link = { label: string; href: string };

export type Paper = {
  title: string;
  href: string;
  /** The name equal to `me` is set in bold. */
  authors: string[];
  venue: string;
  links: Link[];
};

export const papers: Paper[] = [
  {
    title: "BLiMP-RO: A Benchmark of Linguistic Minimal Pairs for Romanian",
    href: "https://arxiv.org/abs/2611.17836",
    authors: [me, "Valentin Feroiu", "Adina Camelia Bleotu", "Sergiu Nisioi"],
    venue: "Preprint, 2026",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2611.17836" }],
  },
  {
    title: "Romanian Small Language Models Trained on Native Child-Targeted Media",
    href: "https://openreview.net/forum?id=JitnCb895x",
    authors: [me, "Adina Camelia Bleotu", "Sergiu Nisioi"],
    venue: "NeurIPS 2026 Workshop on Linguistic Principles for Foundation Models (LP4FM), poster",
    links: [
      { label: "Paper", href: "https://openreview.net/forum?id=JitnCb895x" },
      { label: "Code", href: "https://github.com/Radu028/ro-childlm" },
    ],
  },
];

export const currentWork = {
  title: "PaMuk-Bench",
  text: "A parallel benchmark for vision-language tasks in seven languages, with Radu Tudor Ionescu and a team of 13 researchers. I led the captioning study and built the method that taught three image generators six more languages, by distilling each model's own English behavior into its text encoder.",
};

export const lastUpdated = "November 2026";
