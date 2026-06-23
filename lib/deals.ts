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

interface RawLead extends Lead {
  raw?: {
    adType?: string;
    address?: {
      city?: { text?: string };
    };
  };
}

/** Derive sellerType from raw.adType when the field is absent */
function normalise(lead: RawLead): Lead {
  const { raw: rawData, ...rest } = lead;
  const sellerType =
    rest.sellerType ??
    (rawData?.adType === "yad1" ? "private" : "agency");
  return { ...rest, sellerType };
}

/** Only return Jerusalem listings */
function isJerusalem(lead: RawLead): boolean {
  const city = lead.raw?.address?.city?.text ?? "";
  if (city && !city.includes("ירושלים")) return false;
  // Fall back to location string when raw city is absent
  if (!city) {
    return lead.location?.includes("ירושלים") ?? false;
  }
  return true;
}

export function getDeals(): Lead[] {
  const filePath = path.join(process.cwd(), "data", "leads.json");
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  const leads: RawLead[] = JSON.parse(raw);
  return leads
    .filter(isJerusalem)
    .map(normalise)
    .sort((a, b) => b.score - a.score);
}

export function getTopDeals(n = 3): Lead[] {
  return getDeals().slice(0, n);
}
