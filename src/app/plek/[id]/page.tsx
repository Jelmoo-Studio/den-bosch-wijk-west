import { mockPlekken } from "@/lib/mockData";
import { BUURT_COLORS } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ArrowLeftIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

interface Props {
  params: { id: string };
}

export default function PlekDetailPage({ params }: Props) {
  const plek = mockPlekken.find((p) => p.id === params.id);
  if (!plek) notFound();

  const color = BUURT_COLORS[plek.buurt];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Terug naar kaart
        </Link>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Buurt badge */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-sm font-semibold uppercase tracking-wide px-3 py-1 rounded-full text-white"
            style={{ backgroundColor: color }}
          >
            {plek.buurt}
          </span>
          <span className="text-sm text-gray-400 capitalize flex items-center gap-1">
            <BuildingOffice2Icon className="w-4 h-4" />
            {plek.type}
          </span>
        </div>

        {/* Naam */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{plek.naam}</h1>

        {/* Adres */}
        <div className="flex items-start gap-2 text-gray-500 mb-6">
          <MapPinIcon className="w-5 h-5 mt-0.5 shrink-0" />
          <span>{plek.adres}</span>
        </div>

        {/* Beschrijving */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 mb-4">
          <h2 className="font-semibold text-gray-700 mb-3">Over deze plek</h2>
          <p className="text-gray-600 leading-relaxed">{plek.beschrijving}</p>
        </div>

        {/* Doelgroepen */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 mb-4">
          <h2 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <UserGroupIcon className="w-5 h-5" />
            Voor wie
          </h2>
          <div className="flex flex-wrap gap-2">
            {plek.doelgroepen.map((dg) => (
              <span
                key={dg}
                className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full capitalize"
              >
                {dg}
              </span>
            ))}
          </div>
        </div>

        {/* Contactinfo en openingstijden */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h2 className="font-semibold text-gray-700 mb-4">
            Praktische informatie
          </h2>
          <div className="space-y-3">
            {plek.openingstijden && (
              <div className="flex items-start gap-3 text-sm">
                <ClockIcon className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-gray-500 text-xs mb-0.5">
                    Openingstijden
                  </div>
                  <div className="text-gray-700">{plek.openingstijden}</div>
                </div>
              </div>
            )}
            {plek.contact_telefoon && (
              <div className="flex items-center gap-3 text-sm">
                <PhoneIcon className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <div className="text-gray-500 text-xs mb-0.5">Telefoon</div>
                  <a
                    href={`tel:${plek.contact_telefoon}`}
                    className="text-brand-600 hover:text-brand-700"
                  >
                    {plek.contact_telefoon}
                  </a>
                </div>
              </div>
            )}
            {plek.contact_email && (
              <div className="flex items-center gap-3 text-sm">
                <EnvelopeIcon className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <div className="text-gray-500 text-xs mb-0.5">E-mail</div>
                  <a
                    href={`mailto:${plek.contact_email}`}
                    className="text-brand-600 hover:text-brand-700"
                  >
                    {plek.contact_email}
                  </a>
                </div>
              </div>
            )}
            {plek.contact_website && (
              <div className="flex items-center gap-3 text-sm">
                <GlobeAltIcon className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <div className="text-gray-500 text-xs mb-0.5">Website</div>
                  <a
                    href={plek.contact_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 hover:text-brand-700"
                  >
                    {plek.contact_website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Kaart link */}
        <div className="mt-4 text-center">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(plek.adres)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
          >
            <MapPinIcon className="w-4 h-4" />
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
