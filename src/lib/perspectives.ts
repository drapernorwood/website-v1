export type Focus = "positioning" | "digital" | "systems" | "growth";
export const perspectives = {
  positioning: {
    label: "Be understood",
    discipline: "Positioning & strategy",
    number: "01",
    color: "#e7b28b",
    prompt: "People don’t quite get what we do.",
    title: ["Find the idea", "that holds it together."],
    intro:
      "A business can do many things and still stand for something clear. The work is finding the connection that makes the whole company make sense.",
    underneath: "The offer. The audience. The reason to choose you.",
    outputs: [
      "Positioning & offer structure",
      "Messaging & narrative",
      "Evidence & reasons to believe",
    ],
    hypothesis:
      "The starting point may be the gap between how you describe the work and why a customer would choose it.",
    nextStep:
      "Put your offer, your strongest proof, and your ideal customer in the same room. Look for the idea that connects all three.",
    caseOrder: [
      "healthlinks",
      "datacenter-dynamics",
      "creator-secrets",
      "the-lost-archives",
    ],
  },
  digital: {
    label: "Make a stronger impression",
    discipline: "Web & digital experiences",
    number: "02",
    color: "#acd0ca",
    prompt: "Our website undersells the business.",
    title: ["Give the business", "a better front door."],
    intro:
      "The website is where a stranger starts making up their mind. Positioning, design, proof, and the next step have to work together in that moment.",
    underneath: "The story. The experience. The path to a decision.",
    outputs: [
      "Website strategy & design",
      "Development & digital products",
      "Customer journeys & conversion paths",
    ],
    hypothesis:
      "The opportunity may be to connect the first impression with a clearer reason to believe and an easier next step.",
    nextStep:
      "Follow one important customer journey from arrival to inquiry. Identify the point where someone has to work too hard to understand, trust, or act.",
    caseOrder: [
      "healthlinks",
      "creator-secrets",
      "datacenter-dynamics",
      "the-lost-archives",
    ],
  },
  systems: {
    label: "Work more intelligently",
    discipline: "AI & practical systems",
    number: "03",
    color: "#b9c6eb",
    prompt: "Too much depends on manual work.",
    title: ["Put what you know", "to work."],
    intro:
      "Useful AI starts with the work itself: the knowledge people need, the decisions they make, and the steps that keep getting in their way.",
    underneath: "The knowledge. The workflow. The human judgment.",
    outputs: [
      "AI workflows & internal tools",
      "Knowledge & operating systems",
      "Automation with human checkpoints",
    ],
    hypothesis:
      "A useful first opportunity may be one repeated task where the inputs, decisions, and handoffs are already understood.",
    nextStep:
      "Map one recurring workflow. Separate what can be retrieved or automated from the decisions that still need a person.",
    caseOrder: [
      "creator-secrets",
      "healthlinks",
      "datacenter-dynamics",
      "the-lost-archives",
    ],
  },
  growth: {
    label: "Turn attention into business",
    discipline: "Creative & growth assets",
    number: "04",
    color: "#e5c779",
    prompt: "Our work should be reaching more people.",
    title: ["Give attention", "somewhere to go."],
    intro:
      "A good piece of content is a beginning. Connect the idea, its distribution, the proof, and the offer so that interest can become a useful relationship.",
    underneath: "The signal. The distribution. The commercial path.",
    outputs: [
      "Campaigns & creative direction",
      "Content, proof & sales assets",
      "Owned audience & distribution strategy",
    ],
    hypothesis:
      "The missing connection may be between the attention you earn and the relationship or action you want it to create.",
    nextStep:
      "Take one strong idea and trace its path: who encounters it, why they care, what makes it credible, and what they can do next.",
    caseOrder: [
      "creator-secrets",
      "datacenter-dynamics",
      "healthlinks",
      "the-lost-archives",
    ],
  },
} as const;
export const focusKeys = Object.keys(perspectives) as Focus[];
export function suggestFocus(text: string): Focus | null {
  const words = text.toLowerCase();
  const signals: Record<Focus, RegExp> = {
    systems:
      /\b(ai|automat\w*|manual|workflow\w*|process\w*|internal|efficien\w*|repetitiv\w*|knowledge|tool\w*)\b/g,
    digital:
      /\b(web\w*|site|online|digital|ux|interface|design|landing|app)\b/g,
    growth:
      /\b(grow\w*|sales|revenue|content|campaign\w*|audience|market\w*|leads|attention|social|reach)\b/g,
    positioning:
      /\b(position\w*|message|messaging|understand|explain|offer|brand|different\w*|clarity|story)\b/g,
  };
  const ranked = focusKeys
    .map((key) => ({ key, score: (words.match(signals[key]) || []).length }))
    .sort((a, b) => b.score - a.score);
  return ranked[0].score ? ranked[0].key : null;
}
