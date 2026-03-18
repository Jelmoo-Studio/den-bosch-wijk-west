"use client";

import Link from "next/link";
import { Ontmoetingsplek, BUURT_COLORS } from "@/lib/types";
import { MapPinIcon, ClockIcon, PhoneIcon } from "@heroicons/react/24/outline";

interface PlekKaartProps {
  plek: Ontmoetingsplek;
  isSelected?: boolean;
  onClick?: () => void;
  compact?: boolean;
}

export default function PlekKaart({
  plek,
  isSelected,
  onClick,
  compact,
}: PlekKaartProps) {
  const color = BUURT_COLORS[plek.buurt];

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${
        isSelected
          ? "border-brand-500 shadow-md"
          : "border-transparent hover:border-gray-200"
      } ${compact ? "p-3" : "p-4"}`}
    >
      {/* Buurt badge */}
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: color }}
        >
          {plek.buurt}
        </span>
        <span className="text-xs text-gray-400 capitalize">{plek.type}</span>
      </div>

      {/* Naam */}
      <h3 className={`font-bold text-gray-900 ${compact ? "text-sm" : "text-base"} leading-tight mb-1`}>
        {plek.naam}
      </h3>

      {/* Adres */}
      <div className="flex items-start gap-1 text-gray-500 text-xs mb-2">
        <MapPinIcon className="w-3 h-3 mt-0.5 shrink-0" />
        <span>{plek.adres}</span>
      </div>

      {!compact && (
        <>
          {/* Beschrijving */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {plek.beschrijving}
          </p>

          {/* Openingstijden */}
          {plek.openingstijden && (
            <div className="flex items-start gap-1 text-gray-500 text-xs mb-1">
              <ClockIcon className="w-3 h-3 mt-0.5 shrink-0" />
              <span>{plek.openingstijden}</span>
            </div>
          )}

          {/* Telefoon */}
          {plek.contact_telefoon && (
            <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
              <PhoneIcon className="w-3 h-3 shrink-0" />
              <span>{plek.contact_telefoon}</span>
            </div>
          )}

          {/* Doelgroepen */}
          <div className="flex flex-wrap gap-1 mb-3">
            {plek.doelgroepen.map((dg) => (
              <span
                key={dg}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize"
              >
                {dg}
              </span>
            ))}
          </div>

          {/* Link */}
          <Link
            href={`/plek/${plek.id}`}
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700"
          >
            Meer informatie →
          </Link>
        </>
      )}
    </div>
  );
}
