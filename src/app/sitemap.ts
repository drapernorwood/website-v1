import type { MetadataRoute } from "next";
import { cases } from "@/lib/work";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.drapernorwood.com", priority: 1 },
    ...cases.map((c) => ({
      url: `https://www.drapernorwood.com/work/${c.slug}`,
      priority: 0.8,
    })),
  ];
}
