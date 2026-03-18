import PlekFormulier from "@/components/PlekFormulier";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function NieuwePage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <Link
          href="/admin/dashboard"
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white border border-transparent hover:border-gray-100 rounded-xl transition-all shrink-0"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            Nieuwe ontmoetingsplek
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Voeg een nieuwe plek toe aan de kaart van West
          </p>
        </div>
      </div>
      <PlekFormulier modus="nieuw" />
    </div>
  );
}
