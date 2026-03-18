import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  MapPinIcon,
  PlusCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function AdminPage() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl font-bold">W</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Beheeromgeving</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Ontmoetingsplekken West — 's-Hertogenbosch
        </p>
      </div>

      {!isSupabaseConfigured && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm">
          <div className="flex items-start gap-3">
            <Cog6ToothIcon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 mb-1">
                Supabase nog niet gekoppeld
              </p>
              <p className="text-amber-700">
                De website werkt nu met demo-data. Koppel Supabase om plekken
                op te slaan. Volg de instructies in{" "}
                <code className="bg-amber-100 px-1 rounded">.env.local.example</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        <Link
          href="/admin/dashboard"
          className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:border-brand-300 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center group-hover:bg-brand-200 transition-colors">
            <MapPinIcon className="w-5 h-5 text-brand-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">
              Alle plekken beheren
            </div>
            <div className="text-sm text-gray-500">
              Bekijk, bewerk of verwijder bestaande ontmoetingsplekken
            </div>
          </div>
        </Link>

        <Link
          href="/admin/nieuw"
          className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:border-brand-300 hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
            <PlusCircleIcon className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">
              Nieuwe plek toevoegen
            </div>
            <div className="text-sm text-gray-500">
              Voeg een nieuwe ontmoetingsplek toe aan de kaart
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
