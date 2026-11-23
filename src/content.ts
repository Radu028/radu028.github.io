// Everything the page says lives here, so text edits never touch layout code.
// PaMuk-Bench is listed as an arXiv preprint and never names CVPR: the CVPR 2027
// author guidelines say "you should not list CVPR submissions on public websites".

export const me = "Radu Stefan Popa";

export const profile = {
  name: me,
  role: ["Final-year B.Sc. student in Computer Science", "University of Bucharest"],
  email: "radupopa028@gmail.com",
  photo: "/photo.jpg",
  links: [
    { label: "CV", href: "/cv.pdf" },
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=6-b6aLkAAAAJ" },
    { label: "GitHub", href: "https://github.com/Radu028" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/radupopa28/" },
  ],
  bio: [
    "I work on multimodal models and language models. I am ranked first of 282 students in my year.",
    "I started research in May 2026. In the seven months since, I have been first author of two papers on Romanian language models, with Sergiu Nisioi, and co-first author of PaMuk-Bench, a vision-language benchmark in seven languages, with Radu Tudor Ionescu. I do this alongside a full-time job as a software engineer and weekly teaching at my faculty.",
  ],
};

type Link = { label: string; href: string };

export type Paper = {
  title: string;
  href: string;
  /** The name equal to `me` is set in bold; a trailing "*" marks equal contribution. */
  authors: string[];
  venue: string;
  /** One sentence with the main result. */
  result: string;
  links: Link[];
};

export const papers: Paper[] = [
  {
    title: "PaMuk-Bench: A Parallel Multilingual Multitask Benchmark for Vision-Language Tasks",
    href: "https://arxiv.org/abs/2611.27521",
    authors: [
      "Silviu-Florin Gheorghe*",
      `${me}*`,
      "Adriana Valentina Costache*",
      "Adrian-Gabriel Chifu*",
      "Alessia Amelio",
      "Paul Irofti",
      "Anders Skaarup Johansen",
      "Lallouani Bouchakour",
      "Mohamed Lichouri",
      "Khaled Lounnas",
      "Neelu Madan",
      "Yashvir Malik",
      "Radu Tudor Ionescu",
    ],
    venue: "Preprint, 2026. *Equal contribution.",
    result:
      "The first parallel benchmark to cover five vision-language tasks in seven languages: 71,400 texts, built by 13 researchers from six countries. I led the captioning study on four models and devised the method that taught three image generators six more languages, closing up to 92% of the gap to English.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2611.27521" },
      { label: "code", href: "https://github.com/ghesil/pamuk_bench" },
    ],
  },
  {
    title: "BLiMP-RO: A Benchmark of Linguistic Minimal Pairs for Romanian",
    href: "https://arxiv.org/abs/2611.17836",
    authors: [me, "Valentin Feroiu", "Adina Camelia Bleotu", "Sergiu Nisioi"],
    venue: "Preprint, 2026.",
    result:
      "The first Romanian benchmark of minimal pairs written by linguists and tested on native speakers: 50 phenomena, over 6,400 pairs, over 40,000 human judgments.",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2611.17836" }],
  },
  {
    title: "Romanian Small Language Models Trained on Native Child-Targeted Media",
    href: "https://openreview.net/forum?id=JitnCb895x",
    authors: [me, "Adina Camelia Bleotu", "Sergiu Nisioi"],
    venue: "NeurIPS 2026 Workshop on Linguistic Principles for Foundation Models (LP4FM), poster.",
    result:
      "A corpus of 10M words from 2,100 hours of Romanian children's video, ten times larger than any Romanian dataset of its kind before it, with language models trained on it from scratch.",
    links: [
      { label: "paper", href: "https://openreview.net/forum?id=JitnCb895x" },
      { label: "code", href: "https://github.com/Radu028/ro-childlm" },
    ],
  },
];

/** Short dated facts, shown as "what" on the left and "when" on the right. */
export type Entry = { what: string; detail?: string; when: string };

export const education: Entry[] = [
  {
    what: "B.Sc. in Computer Science, University of Bucharest",
    detail: "Ranked 1st of 282 students in Year 2, with 10/10 in every course.",
    when: "2024 – 2027",
  },
];

export const honors: Entry[] = [
  { what: "PPC Romania research scholarship", when: "2026 – 2027" },
  { what: "University of Bucharest merit scholarship", when: "2025 – 2027" },
];

export const experience: Entry[] = [
  {
    what: "Undergraduate tutor, University of Bucharest",
    detail: "Algorithmic Programming, Data Structures, Fundamental Algorithms.",
    when: "2025 – present",
  },
  { what: "Software engineer, Liamis & HEB International", when: "2026 – present" },
];

export const lastUpdated = "November 2026";
