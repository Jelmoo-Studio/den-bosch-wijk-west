"use client";

import dynamic from "next/dynamic";
import { Ontmoetingsplek } from "@/lib/types";

const KaartInner = dynamic(() => import("./KaartInner"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-xl bg-gray-100 flex items-center justify-center">
      <div className="text-gray-400 text-sm">Kaart laden...</div>
    </div>
  ),
});

interface KaartProps {
  plekken: Ontmoetingsplek[];
  selectedId: string | null;
  onSelectPlek: (id: string) => void;
}

export default function Kaart(props: KaartProps) {
  return <KaartInner {...props} />;
}
