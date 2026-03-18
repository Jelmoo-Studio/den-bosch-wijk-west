export type Buurt = "Kruiskamp" | "Schutskamp" | "Deuteren" | "Engelen";
export type PlekType = "complexgericht" | "buurtgericht";
export type Doelgroep =
  | "inwoners"
  | "professionals"
  | "jongeren"
  | "ouderen"
  | "gezinnen"
  | "kinderen";

export interface Ontmoetingsplek {
  id: string;
  naam: string;
  beschrijving: string;
  adres: string;
  lat: number;
  lng: number;
  buurt: Buurt;
  type: PlekType;
  doelgroepen: Doelgroep[];
  contact_telefoon?: string;
  contact_email?: string;
  contact_website?: string;
  openingstijden?: string;
  foto_url?: string;
  actief: boolean;
  created_at?: string;
}

export const BUURTEN: Buurt[] = [
  "Kruiskamp",
  "Schutskamp",
  "Deuteren",
  "Engelen",
];

export const DOELGROEPEN: { value: Doelgroep; label: string }[] = [
  { value: "inwoners", label: "Inwoners" },
  { value: "professionals", label: "Professionals" },
  { value: "jongeren", label: "Jongeren" },
  { value: "ouderen", label: "Ouderen" },
  { value: "gezinnen", label: "Gezinnen" },
  { value: "kinderen", label: "Kinderen" },
];

export const BUURT_COLORS: Record<Buurt, string> = {
  Kruiskamp: "#f97316",
  Schutskamp: "#3b82f6",
  Deuteren: "#22c55e",
  Engelen: "#a855f7",
};
