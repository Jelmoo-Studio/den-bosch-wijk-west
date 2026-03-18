import PlekFormulier from "@/components/PlekFormulier";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function NieuwePage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/dashboard"
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
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
