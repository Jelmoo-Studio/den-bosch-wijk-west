"use client";

import { useState, useEffect } from "react";
import { Ontmoetingsplek, Buurt, Doelgroep, BUURTEN, DOELGROEPEN, BUURT_COLORS } from "@/lib/types";
import { mockPlekken } from "@/lib/mockData";
import Kaart from "@/components/Kaart";
import PlekKaart from "@/components/PlekKaart";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [plekken] = useState<Ontmoetingsplek[]>(mockPlekken.filter((p) => p.actief));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoekterm, setZoekterm] = useState("");
  const [filterBuurt, setFilterBuurt] = useState<Buurt | "">("");
  const [filterDoelgroep, setFilterDoelgroep] = useState<Doelgroep | "">("");

  const gefilterd = plekken.filter((p) => {
    const matchZoek =
      !zoekterm ||
      p.naam.toLowerCase().includes(zoekterm.toLowerCase()) ||
      p.beschrijving.toLowerCase().includes(zoekterm.toLowerCase());
    const matchBuurt = !filterBuurt || p.buurt === filterBuurt;
    const matchDoelgroep =
      !filterDoelgroep || p.doelgroepen.includes(filterDoelgroep);
    return matchZoek && matchBuurt && matchDoelgroep;
  });

  const activeFilters = [filterBuurt, filterDoelgroep].filter(Boolean).length;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">W</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-sm leading-tight">
              Ontmoetingsplekken West
            </h1>
            <p className="text-xs text-gray-500">'s-Hertogenbosch</p>
          </div>
        </div>
        <a
          href="/admin"
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Beheer
        </a>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 flex flex-col shrink-0">
          {/* Zoeken & Filteren */}
          <div className="p-4 border-b border-gray-100 space-y-3">
            {/* Zoekbalk */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Zoek een ontmoetingsplek..."
                value={zoekterm}
                onChange={(e) => setZoekterm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent"
              />
              {zoekterm && (
                <button
                  onClick={() => setZoekterm("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={filterBuurt}
                onChange={(e) => setFilterBuurt(e.target.value as Buurt | "")}
                className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-300 bg-white"
              >
                <option value="">Alle buurten</option>
                {BUURTEN.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <select
                value={filterDoelgroep}
                onChange={(e) =>
                  setFilterDoelgroep(e.target.value as Doelgroep | "")
                }
                className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-300 bg-white"
              >
                <option value="">Alle doelgroepen</option>
                {DOELGROEPEN.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Buurt legenda */}
            <div className="flex flex-wrap gap-2">
              {BUURTEN.map((b) => (
                <button
                  key={b}
                  onClick={() =>
                    setFilterBuurt(filterBuurt === b ? "" : b)
                  }
                  className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border transition-all ${
                    filterBuurt === b
                      ? "border-transparent text-white"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                  style={
                    filterBuurt === b
                      ? { backgroundColor: BUURT_COLORS[b] }
                      : {}
                  }
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: BUURT_COLORS[b] }}
                  />
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Resultaten teller */}
          <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-100">
            {gefilterd.length} plek{gefilterd.length !== 1 ? "ken" : ""}
            {activeFilters > 0 && " gevonden"}
            {activeFilters > 0 && (
              <button
                onClick={() => {
                  setFilterBuurt("");
                  setFilterDoelgroep("");
                  setZoekterm("");
                }}
                className="ml-2 text-brand-500 hover:text-brand-600 font-medium"
              >
                Wis filters
              </button>
            )}
          </div>

          {/* Lijst van plekken */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {gefilterd.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <div className="text-3xl mb-2">🗺️</div>
                <div className="text-sm">Geen plekken gevonden</div>
                <div className="text-xs mt-1">Probeer andere filters</div>
              </div>
            ) : (
              gefilterd.map((plek) => (
                <PlekKaart
                  key={plek.id}
                  plek={plek}
                  isSelected={selectedId === plek.id}
                  onClick={() =>
                    setSelectedId(selectedId === plek.id ? null : plek.id)
                  }
                  compact
                />
              ))
            )}
          </div>
        </aside>

        {/* Kaart */}
        <main className="flex-1 p-4">
          <Kaart
            plekken={gefilterd}
            selectedId={selectedId}
            onSelectPlek={setSelectedId}
          />
        </main>
      </div>
    </div>
  );
}
