import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  MapPinIcon,
  PlusIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function AdminPage() {
  return (
    <div>
      {/* Page header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          Overzicht
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Beheer de ontmoetingsplekken in wijk West
        </p>
      </div>

      {/* Supabase warning */}
      {!isSupabaseConfigured && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 flex items-start gap-3">
          <ExclamationTriangleIcon className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-amber-800 mb-0.5">
              Database nog niet gekoppeld
            </p>
            <p className="text-amber-600 text-xs leading-relaxed">
              De site toont nu demo-data. Koppel Supabase via{" "}
              <code className="font-mono bg-amber-100 px-1 py-0.5 rounded text-xs">
                .env.local
              </code>{" "}
              om wijzigingen op te slaan.
            </p>
          </div>
        </div>
      )}

      {/* Action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/dashboard"
          className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 hover:border-gray-200 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-50 group-hover:border-brand-100 transition-colors">
            <MapPinIcon className="w-5 h-5 text-gray-500 group-hover:text-brand-600 transition-colors" />
          </div>
          <div className="font-semibold text-gray-900 mb-1">Alle plekken</div>
          <div className="text-sm text-gray-500 mb-4 leading-relaxed">
            Bekijk en beheer alle ontmoetingsplekken op de kaart
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-brand-600">
            Ga naar dashboard
            <ArrowRightIcon className="w-3 h-3" />
          </div>
        </Link>

        <Link
          href="/admin/nieuw"
          className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 hover:border-gray-200 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-50 group-hover:border-brand-100 transition-colors">
            <PlusIcon className="w-5 h-5 text-gray-500 group-hover:text-brand-600 transition-colors" />
          </div>
          <div className="font-semibold text-gray-900 mb-1">Nieuwe plek</div>
          <div className="text-sm text-gray-500 mb-4 leading-relaxed">
            Voeg een nieuwe ontmoetingsplek toe aan de kaart
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-brand-600">
            Plek toevoegen
            <ArrowRightIcon className="w-3 h-3" />
          </div>
        </Link>
      </div>
    </div>
  );
}
