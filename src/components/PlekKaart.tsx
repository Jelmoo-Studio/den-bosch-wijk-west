"use client";

import { Ontmoetingsplek, BUURT_COLORS } from "@/lib/types";
import { MapPinIcon } from "@heroicons/react/24/outline";

interface PlekKaartProps {
  plek: Ontmoetingsplek;
  isSelected?: boolean;
  onClick?: () => void;
  onOpenDetail?: (plek: Ontmoetingsplek) => void;
}

export default function PlekKaart({
  plek,
  isSelected,
  onClick,
  onOpenDetail,
}: PlekKaartProps) {
  const color = BUURT_COLORS[plek.buurt];

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border transition-all cursor-pointer group ${
        isSelected
          ? "border-brand-200 shadow-md shadow-brand-100/50"
          : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
      }`}
    >
      {/* Colored top accent */}
      <div
        className="h-0.5 rounded-t-xl"
        style={{ backgroundColor: isSelected ? color : "transparent" }}
      />

      <div className="p-3">
        {/* Buurt badge + type */}
        <div className="flex items-center justify-between mb-2">
          <span
            className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${color}18`, color }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            {plek.buurt}
          </span>
          <span className="text-xs text-gray-400 capitalize">{plek.type}</span>
        </div>

        {/* Naam */}
        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1.5">
          {plek.naam}
        </h3>

        {/* Adres */}
        <div className="flex items-start gap-1.5 text-gray-400 text-xs mb-3">
          <MapPinIcon className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>{plek.adres}</span>
        </div>

        {/* Beschrijving snippet */}
        <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
          {plek.beschrijving}
        </p>

        {/* Bekijk details button */}
        {onOpenDetail && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(plek);
            }}
            className="w-full text-xs font-semibold py-1.5 px-3 rounded-lg border transition-colors"
            style={{
              borderColor: `${color}40`,
              color,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${color}12`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Bekijk details
          </button>
        )}
      </div>
    </div>
  );
}
