import { mockPlekken } from "@/lib/mockData";
import { BUURT_COLORS } from "@/lib/types";
import Link from "next/link";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const plekken = mockPlekken;
  const actief = plekken.filter((p) => p.actief).length;
  const inactief = plekken.filter((p) => !p.actief).length;

  return (
    <div>
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {plekken.length} ontmoetingsplekken in wijk West
          </p>
        </div>
        <Link
          href="/admin/nieuw"
          className="flex items-center gap-2 bg-gray-900 text-white font-medium px-3 py-2 md:px-4 rounded-xl hover:bg-gray-800 transition-colors text-sm shrink-0"
        >
          <PlusIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Nieuwe plek</span>
          <span className="sm:hidden">Nieuw</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5">
          <div className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            {plekken.length}
          </div>
          <div className="text-xs md:text-sm text-gray-500 mt-1">Totaal</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5">
          <div className="text-2xl md:text-3xl font-bold text-emerald-600 tracking-tight">
            {actief}
          </div>
          <div className="text-xs md:text-sm text-gray-500 mt-1">
            <span className="hidden sm:inline">Zichtbaar op kaart</span>
            <span className="sm:hidden">Actief</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5">
          <div className="text-2xl md:text-3xl font-bold text-gray-300 tracking-tight">
            {inactief}
          </div>
          <div className="text-xs md:text-sm text-gray-500 mt-1">Verborgen</div>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 text-sm">Alle plekken</h2>
          <span className="text-xs text-gray-400">{plekken.length} resultaten</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-2.5 border-b border-gray-50 bg-gray-50/50">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Naam</div>
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Buurt</div>
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Status</div>
          <div />
        </div>
        <div className="divide-y divide-gray-50">
          {plekken.map((plek) => {
            const color = BUURT_COLORS[plek.buurt];
            return (
              <div
                key={plek.id}
                className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-3.5 items-center hover:bg-gray-50/50 transition-colors"
              >
                <div className="min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">
                    {plek.naam}
                  </div>
                  <div className="text-xs text-gray-400 truncate mt-0.5">
                    {plek.adres}
                  </div>
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
                  style={{ backgroundColor: `${color}15`, color }}
                >
                  {plek.buurt}
                </span>
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      plek.actief ? "bg-emerald-400" : "bg-gray-300"
                    }`}
                  />
                  <span className="text-xs text-gray-400">
                    {plek.actief ? "Actief" : "Verborgen"}
                  </span>
                </div>
                <Link
                  href={`/admin/plek/${plek.id}/bewerken`}
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Bewerken"
                >
                  <PencilSquareIcon className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 text-sm">Alle plekken</h2>
          <span className="text-xs text-gray-400">{plekken.length} resultaten</span>
        </div>
        {plekken.map((plek) => {
          const color = BUURT_COLORS[plek.buurt];
          return (
            <div
              key={plek.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3"
            >
              {/* Status dot */}
              <div
                className={`w-2 h-2 rounded-full shrink-0 ${
                  plek.actief ? "bg-emerald-400" : "bg-gray-300"
                }`}
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-sm truncate">
                  {plek.naam}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    {plek.buurt}
                  </span>
                  <span className="text-xs text-gray-400">{plek.adres}</span>
                </div>
              </div>

              {/* Edit button */}
              <Link
                href={`/admin/plek/${plek.id}/bewerken`}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors shrink-0"
              >
                <PencilSquareIcon className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
