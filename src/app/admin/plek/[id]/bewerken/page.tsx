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
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <Link
          href="/admin/dashboard"
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white border border-transparent hover:border-gray-100 rounded-xl transition-all shrink-0"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Link>
        <div className="min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight truncate">
            {plek.naam}
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
