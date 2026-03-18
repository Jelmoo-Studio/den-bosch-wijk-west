"use client";

import { useState } from "react";
import {
  Ontmoetingsplek,
  Buurt,
  Doelgroep,
  BUURTEN,
  DOELGROEPEN,
  BUURT_COLORS,
} from "@/lib/types";
import { mockPlekken } from "@/lib/mockData";
import Kaart from "@/components/Kaart";
import PlekKaart from "@/components/PlekKaart";
import PlekDetail from "@/components/PlekDetail";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  MapPinIcon,
  AdjustmentsHorizontalIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const [plekken] = useState<Ontmoetingsplek[]>(
    mockPlekken.filter((p) => p.actief)
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailPlek, setDetailPlek] = useState<Ontmoetingsplek | null>(null);
  const [zoekterm, setZoekterm] = useState("");
  const [filterBuurt, setFilterBuurt] = useState<Buurt | "">("");
  const [filterDoelgroep, setFilterDoelgroep] = useState<Doelgroep | "">("");
  const [sheetOpen, setSheetOpen] = useState(false);

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

  const activeFilters = [filterBuurt, filterDoelgroep, zoekterm].filter(
    Boolean
  ).length;

  function handleSelectPlek(id: string) {
    setSelectedId(selectedId === id ? null : id);
  }

  function handleOpenDetail(plek: Ontmoetingsplek) {
    setDetailPlek(plek);
    setSelectedId(plek.id);
    setSheetOpen(false);
  }

  function clearFilters() {
    setFilterBuurt("");
    setFilterDoelgroep("");
    setZoekterm("");
  }

  const filterSection = (mobile?: boolean) => (
    <>
      {/* Zoekbalk */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Zoek een plek..."
          value={zoekterm}
          onChange={(e) => setZoekterm(e.target.value)}
          className={`w-full pl-9 pr-4 text-sm bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent focus:bg-white transition-colors ${
            mobile ? "py-3" : "py-2"
          }`}
        />
        {zoekterm && (
          <button
            onClick={() => setZoekterm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Doelgroep */}
      <select
        value={filterDoelgroep}
        onChange={(e) => setFilterDoelgroep(e.target.value as Doelgroep | "")}
        className={`w-full bg-gray-50 border border-gray-100 rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-brand-300 text-gray-600 ${
          mobile ? "py-3 text-sm" : "py-2 text-xs"
        }`}
      >
        <option value="">Alle doelgroepen</option>
        {DOELGROEPEN.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label}
          </option>
        ))}
      </select>

      {/* Buurt pills */}
      <div className="flex flex-wrap gap-2">
        {BUURTEN.map((b) => {
          const isActive = filterBuurt === b;
          const color = BUURT_COLORS[b];
          return (
            <button
              key={b}
              onClick={() => setFilterBuurt(isActive ? "" : b)}
              className={`flex items-center gap-1.5 rounded-full border transition-all ${
                mobile ? "text-sm px-3 py-1.5" : "text-xs px-2.5 py-1"
              }`}
              style={
                isActive
                  ? { backgroundColor: color, borderColor: color, color: "white" }
                  : { backgroundColor: `${color}12`, borderColor: `${color}30`, color }
              }
            >
              <span
                className={`rounded-full ${mobile ? "w-2 h-2" : "w-1.5 h-1.5"}`}
                style={{
                  backgroundColor: isActive ? "rgba(255,255,255,0.7)" : color,
                }}
              />
              {b}
            </button>
          );
        })}
      </div>

      {/* Teller + wis filters */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          <span className="font-medium text-gray-600">{gefilterd.length}</span>{" "}
          plek{gefilterd.length !== 1 ? "ken" : ""}
          {activeFilters > 0 && " gevonden"}
        </span>
        {activeFilters > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-brand-500 hover:text-brand-600 font-medium"
          >
            Wis filters
          </button>
        )}
      </div>
    </>
  );

  const plekkenList = (
    <div className="flex-1 overflow-y-auto p-3 space-y-2">
      {gefilterd.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-sm font-medium text-gray-500">
            Geen plekken gevonden
          </div>
          <div className="text-xs mt-1">Probeer andere filters</div>
        </div>
      ) : (
        gefilterd.map((plek) => (
          <PlekKaart
            key={plek.id}
            plek={plek}
            isSelected={selectedId === plek.id}
            onClick={() => handleSelectPlek(plek.id)}
            onOpenDetail={handleOpenDetail}
          />
        ))
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-5 py-3.5 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center shadow-sm shadow-brand-200">
            <MapPinIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900 text-sm leading-tight">
              Ontmoetingsplekken West
            </h1>
            <p className="text-xs text-gray-400">&apos;s-Hertogenbosch</p>
          </div>
        </div>
        <a
          href="/admin"
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
        >
          Beheer
        </a>
      </header>

      {/* Content area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex absolute left-0 top-0 bottom-0 w-80 bg-white border-r border-gray-100 flex-col z-10">
          <div className="p-4 space-y-3 border-b border-gray-100">
            {filterSection()}
          </div>
          {plekkenList}
        </aside>

        {/* Map — inset accounts for sidebar on desktop, bottom sheet on mobile */}
        <div className="absolute inset-0 md:left-80 p-3 pb-[76px] md:pb-3 md:p-4">
          <Kaart
            plekken={gefilterd}
            selectedId={selectedId}
            onSelectPlek={handleSelectPlek}
            onOpenDetail={handleOpenDetail}
          />
        </div>

        {/* Mobile bottom sheet */}
        <div
          className={`md:hidden absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden transition-[height] duration-300 ease-out`}
          style={{
            height: sheetOpen ? "78vh" : "72px",
            zIndex: 400,
          }}
        >
          {/* Drag handle + trigger */}
          <button
            onClick={() => setSheetOpen(!sheetOpen)}
            className="flex items-center justify-between px-5 shrink-0 w-full text-left"
            style={{ height: "72px" }}
          >
            {/* Left: icon + label + badge */}
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                  sheetOpen || activeFilters > 0
                    ? "bg-brand-500"
                    : "bg-gray-100"
                }`}
              >
                <AdjustmentsHorizontalIcon
                  className={`w-4 h-4 transition-colors ${
                    sheetOpen || activeFilters > 0
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                />
              </div>
              <span className="font-semibold text-gray-900 text-sm">
                {sheetOpen ? "Filters" : "Zoek & filter"}
              </span>
              {activeFilters > 0 && (
                <span className="bg-brand-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilters}
                </span>
              )}
            </div>

            {/* Right: count + chevron */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">
                {gefilterd.length} plekken
              </span>
              <div
                className={`w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center transition-transform duration-300 ${
                  sheetOpen ? "rotate-180" : ""
                }`}
              >
                <ChevronUpIcon className="w-3.5 h-3.5 text-gray-500" />
              </div>
            </div>
          </button>

          {/* Sheet content */}
          <div
            className={`flex flex-col flex-1 overflow-hidden border-t border-gray-100 transition-opacity duration-200 ${
              sheetOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="p-4 space-y-3 border-b border-gray-100 shrink-0">
              {filterSection(true)}
            </div>
            {plekkenList}
          </div>
        </div>
      </div>

      {/* Detail popup */}
      <PlekDetail plek={detailPlek} onClose={() => setDetailPlek(null)} />
    </div>
  );
}
