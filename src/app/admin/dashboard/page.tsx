import { mockPlekken } from "@/lib/mockData";
import { BUURT_COLORS } from "@/lib/types";
import Link from "next/link";
import {
  PencilSquareIcon,
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const plekken = mockPlekken;

  const actief = plekken.filter((p) => p.actief).length;
  const inactief = plekken.filter((p) => !p.actief).length;

  return (
    <div>
      {/* Paginatitel */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Overzicht van alle ontmoetingsplekken in West
          </p>
        </div>
        <Link
          href="/admin/nieuw"
          className="flex items-center gap-2 bg-brand-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors text-sm"
        >
          <PlusIcon className="w-4 h-4" />
          Nieuwe plek
        </Link>
      </div>

      {/* Statistieken */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="text-3xl font-bold text-gray-900">{plekken.length}</div>
          <div className="text-sm text-gray-500 mt-1">Totaal plekken</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="text-3xl font-bold text-green-600">{actief}</div>
          <div className="text-sm text-gray-500 mt-1">Actief zichtbaar</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="text-3xl font-bold text-gray-400">{inactief}</div>
          <div className="text-sm text-gray-500 mt-1">Verborgen</div>
        </div>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700">Alle plekken</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {plekken.map((plek) => (
            <div
              key={plek.id}
              className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
            >
              {/* Status indicator */}
              <div
                className={`w-2 h-2 rounded-full shrink-0 ${
                  plek.actief ? "bg-green-400" : "bg-gray-300"
                }`}
              />

              {/* Naam en adres */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {plek.naam}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {plek.adres}
                </div>
              </div>

              {/* Buurt badge */}
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full text-white shrink-0"
                style={{ backgroundColor: BUURT_COLORS[plek.buurt] }}
              >
                {plek.buurt}
              </span>

              {/* Type */}
              <span className="text-xs text-gray-400 capitalize hidden md:block shrink-0 w-28">
                {plek.type}
              </span>

              {/* Acties */}
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/plek/${plek.id}`}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Bekijken"
                >
                  <EyeIcon className="w-4 h-4" />
                </Link>
                <Link
                  href={`/admin/plek/${plek.id}/bewerken`}
                  className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                  title="Bewerken"
                >
                  <PencilSquareIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
