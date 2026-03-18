import { mockPlekken } from "@/lib/mockData";
import PlekFormulier from "@/components/PlekFormulier";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Props {
  params: { id: string };
}

export default function BewerkPage({ params }: Props) {
  const plek = mockPlekken.find((p) => p.id === params.id);
  if (!plek) notFound();

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
            {plek.naam} bewerken
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Pas de informatie van deze ontmoetingsplek aan
          </p>
        </div>
      </div>
      <PlekFormulier plek={plek} modus="bewerken" />
    </div>
  );
}
