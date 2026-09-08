export type WorkCase = {
  slug: string;
  number: string;
  name: string;
  client: string;
  discipline: string;
  short: string;
  title: string;
  intro: string;
  material: string;
  insight: string;
  built: string[];
  outcome: string;
  scope: string;
  image: string;
  imageAlt: string;
  evidence: string;
  metrics: { value: string; label: string }[];
};
export const cases: WorkCase[] = [
  {
    slug: "the-lost-archives",
    number: "01",
    name: "The Lost Archives",
    client: "University of Science and Philosophy",
    discipline: "Archive / Media / Distribution",
    short: "A rare archive. A new point of entry.",
    title: "A way into what was already there.",
    intro:
      "Rare recordings and buried material became a discovery-driven media property for the institution carrying the work of Walter and Lao Russell forward.",
    material:
      "The University of Science and Philosophy held recordings, ideas, and an institutional history with real weight. The material existed. A clear way for a new audience to encounter it did not.",
    insight:
      "The archive needed an invitation. Context, pacing, naming, and a coherent visual language could make rare material feel accessible without flattening what made it worth preserving.",
    built: [
      "Discovery-led positioning and narrative structure",
      "The Lost Archives identity and media packaging",
      "Editorial pacing, context, and release assets",
      "Audience pathways from first encounter to deeper exploration",
    ],
    outcome:
      "An early launch window brought the material to audiences well beyond the existing following. Facebook and YouTube monetization were also unlocked during the launch period.",
    scope:
      "Early launch-window results recorded in the project’s proof notes. Platform totals reflect the performance of the property; they are not a controlled measure of the contribution of any single tactic. These are historical figures, not live counters.",
    image: "/archive/tapes.webp",
    imageAlt:
      "Labeled U-matic recordings from the Lost Archives production archive",
    evidence: "/la-results-1.png",
    metrics: [
      { value: "1.4M+", label: "Facebook views" },
      { value: "11,985", label: "Net new Facebook followers" },
      { value: "93.9%", label: "Facebook views from non-followers" },
    ],
  },
  {
    slug: "datacenter-dynamics",
    number: "02",
    name: "DatacenterDynamics",
    client: "DCD Madrid",
    discipline: "B2B / Campaign strategy",
    short: "An important event. A more precise audience.",
    title: "Precision was the real brief.",
    intro:
      "Enterprise event strategy and digital campaign direction for DCD Madrid, in a global data center media and events context.",
    material:
      "A specialist event, a commercially important audience, and a familiar challenge: getting the right executives to give it their attention.",
    insight:
      "Promoting an event is too broad a problem. The more useful question was who needed to be in the room, why it mattered to them, and how to reach them with less wasted effort.",
    built: [
      "Audience framing around IT executives and decision-makers",
      "Targeted digital campaign direction",
      "Retargeting and distribution strategy",
      "A focus on meaningful attendance rather than reach alone",
    ],
    outcome:
      "The work gave the campaign a more specific audience and distribution direction. The existing case material documents the strategic contribution, rather than an attributable attendance or revenue uplift.",
    scope:
      "The original evidence sheet also lists global platform/event-scale figures. They are context for DCD’s operation, not results attributed to this campaign, and are not presented as Draper Norwood performance metrics.",
    image: "/dcd-work.png",
    imageAlt:
      "Original DCD Madrid campaign case artwork describing enterprise event strategy and targeted digital campaigns",
    evidence: "/dcd-results.png",
    metrics: [],
  },
  {
    slug: "creator-secrets",
    number: "03",
    name: "Creator Secrets",
    client: "Creator systems & commerce",
    discipline: "Content / Commerce / Systems",
    short: "Attention, understood as a system.",
    title: "The mechanics beneath the moment.",
    intro:
      "A body of content and commerce work built around a recurring question: what makes someone stop, care, and act?",
    material:
      "Content ideas, platform behavior, creative experiments, and commerce performance across TikTok Shop and Snapchat.",
    insight:
      "The idea, its packaging, and its distribution environment work together. Studying that relationship makes a result useful beyond the moment it happens.",
    built: [
      "Content structure and creative packaging",
      "Platform-specific distribution thinking",
      "Attention-to-commerce analysis",
      "A systems perspective on repeatable creative judgment",
    ],
    outcome:
      "The existing commerce proof records $264K+ in lifetime TikTok Shop gross merchandise value, 11.5K+ units sold, and 21.8M+ views. These are distinct measures of commercial activity and attention.",
    scope:
      "Lifetime figures as reported in the existing April 2026 proof asset. GMV is merchandise value, not Draper Norwood revenue or profit. The separate Snapchat notification in that asset is provisional; it is not counted here as confirmed income.",
    image: "/cs-work.png",
    imageAlt: "Existing Creator Secrets project artwork",
    evidence: "/cs-results.png",
    metrics: [
      { value: "$264K+", label: "Lifetime TikTok Shop GMV" },
      { value: "11.5K+", label: "Units sold" },
      { value: "21.8M+", label: "Views in the proof asset" },
    ],
  },
  {
    slug: "healthlinks",
    number: "04",
    name: "HealthLinks",
    client: "HealthLinks Magazine",
    discipline: "Brand / Media / Sales support",
    short: "A publication with more ways to matter.",
    title: "Make the parts work together.",
    intro:
      "Media and brand strategy connecting a healthcare publication, its expertise, its audience, and its commercial relationships.",
    material:
      "HealthLinks had a publication, an audience, advertisers, and access to healthcare expertise. The elements were valuable, but they were not fully aligned.",
    insight:
      "Media could become part of the business’s structure. A podcast and a clearer content strategy could connect expertise, visibility, and sales support.",
    built: [
      "Marketing strategy and positioning support",
      "Podcast and media asset development",
      "Content structure around healthcare expertise",
      "Sales-support thinking across the publication and media",
    ],
    outcome:
      "The existing case material reports more than 10,000 listeners early in the podcast’s launch. The wider contribution was a connected media asset supporting the publication’s content strategy.",
    scope:
      "Early-launch listener figure reported in the existing HealthLinks case asset. The source does not provide a dated measurement window or a sales-attribution analysis; no revenue outcome is claimed.",
    image: "/hl-work.png",
    imageAlt:
      "Existing HealthLinks Podcast artwork with a microphone and healthcare theme",
    evidence: "/hl-results.png",
    metrics: [
      { value: "10,000+", label: "Listeners reported early in launch" },
    ],
  },
];
