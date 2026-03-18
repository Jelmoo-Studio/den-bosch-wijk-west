"use client";

import { Ontmoetingsplek, BUURT_COLORS } from "@/lib/types";
import {
  XMarkIcon,
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

interface PlekDetailProps {
  plek: Ontmoetingsplek | null;
  onClose: () => void;
}

export default function PlekDetail({ plek, onClose }: PlekDetailProps) {
  if (!plek) return null;

  const color = BUURT_COLORS[plek.buurt];

  const content = (
    <>
      {/* Header */}
      <div className="p-5 md:p-6 pb-4 md:pb-5 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <span
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
            style={{ backgroundColor: color }}
          >
            {plek.buurt}
          </span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1 rounded-lg hover:bg-gray-100"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <h2 className="text-xl font-bold text-gray-900 leading-tight mb-2">
          {plek.naam}
        </h2>
        <div className="flex items-start gap-2 text-gray-500 text-sm">
          <MapPinIcon className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{plek.adres}</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
        {/* Beschrijving */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Over deze plek
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {plek.beschrijving}
          </p>
        </div>

        {/* Doelgroepen */}
        {plek.doelgroepen.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Doelgroepen
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {plek.doelgroepen.map((dg) => (
                <span
                  key={dg}
                  className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 capitalize"
                >
                  {dg}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact */}
        {(plek.openingstijden ||
          plek.contact_telefoon ||
          plek.contact_email ||
          plek.contact_website) && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Contact & info
            </h3>
            <div className="space-y-2.5">
              {plek.openingstijden && (
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <ClockIcon className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
                  <span>{plek.openingstijden}</span>
                </div>
              )}
              {plek.contact_telefoon && (
                <a
                  href={`tel:${plek.contact_telefoon}`}
                  className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-brand-600 transition-colors"
                >
                  <PhoneIcon className="w-4 h-4 shrink-0 text-gray-400" />
                  <span>{plek.contact_telefoon}</span>
                </a>
              )}
              {plek.contact_email && (
                <a
                  href={`mailto:${plek.contact_email}`}
                  className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-brand-600 transition-colors"
                >
                  <EnvelopeIcon className="w-4 h-4 shrink-0 text-gray-400" />
                  <span>{plek.contact_email}</span>
                </a>
              )}
              {plek.contact_website && (
                <a
                  href={plek.contact_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-brand-600 transition-colors"
                >
                  <GlobeAltIcon className="w-4 h-4 shrink-0 text-gray-400" />
                  <span className="truncate">{plek.contact_website}</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(
            plek.adres + ", 's-Hertogenbosch"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
        >
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          Bekijk op Google Maps
        </a>
      </div>
    </>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/25 backdrop-blur-[2px] z-[1000]"
        onClick={onClose}
      />

      {/* Desktop: slide-over panel */}
      <div className="hidden md:flex fixed right-4 top-4 bottom-4 w-[400px] bg-white rounded-2xl shadow-2xl z-[1001] flex-col overflow-hidden">
        {content}
      </div>

      {/* Mobile: bottom sheet */}
      <div className="md:hidden fixed inset-x-0 bottom-0 top-[15%] bg-white rounded-t-3xl shadow-2xl z-[1001] flex flex-col overflow-hidden">
        {/* Mobile drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>
        {content}
      </div>
    </>
  );
}
