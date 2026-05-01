import fs from "fs";
import path from "path";

export interface Lead {
  id: string;
  source: string;
  topic: string;
  title: string;
  url: string;
  price: number | null;
  area: number | null;
  rooms: number | null;
  location: string;
  imageUrl: string;
  score: number;
  reasons: string[];
  status: string;
  savedAt: string;
  sellerType?: string;
}

export function getDeals(): Lead[] {
  const filePath = path.join(process.cwd(), "data", "leads.json");
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  const leads: Lead[] = JSON.parse(raw);
  return leads.sort((a, b) => b.score - a.score);
}

export function getTopDeals(n = 3): Lead[] {
  return getDeals().slice(0, n);
}
