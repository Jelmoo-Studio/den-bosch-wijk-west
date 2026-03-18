"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ontmoetingsplek, BUURTEN, DOELGROEPEN, Buurt, PlekType, Doelgroep } from "@/lib/types";
import { createPlek, updatePlek } from "@/lib/plekken";
import { isSupabaseConfigured } from "@/lib/supabase";
import { MapPinIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

const leegForm = {
  naam: "",
  beschrijving: "",
  adres: "",
  lat: 51.7,
  lng: 5.29,
  buurt: "Kruiskamp" as Buurt,
  type: "buurtgericht" as PlekType,
  doelgroepen: [] as Doelgroep[],
  contact_telefoon: "",
  contact_email: "",
  contact_website: "",
  openingstijden: "",
  actief: true,
};

interface Props {
  plek?: Ontmoetingsplek;
  modus: "nieuw" | "bewerken";
}

const inputClass =
  "w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent transition-colors";

const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

export default function PlekFormulier({ plek, modus }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(
    plek
      ? {
          naam: plek.naam,
          beschrijving: plek.beschrijving,
          adres: plek.adres,
          lat: plek.lat,
          lng: plek.lng,
          buurt: plek.buurt,
          type: plek.type,
          doelgroepen: plek.doelgroepen,
          contact_telefoon: plek.contact_telefoon ?? "",
          contact_email: plek.contact_email ?? "",
          contact_website: plek.contact_website ?? "",
          openingstijden: plek.openingstijden ?? "",
          actief: plek.actief,
        }
      : leegForm
  );
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState<string | null>(null);
  const [geocodingBezig, setGeocodingBezig] = useState(false);

  async function zoekCoordinaten() {
    if (!form.adres) return;
    setGeocodingBezig(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(form.adres)}&countrycodes=nl&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        setForm((f) => ({
          ...f,
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        }));
      } else {
        setFout("Adres niet gevonden. Vul handmatig coördinaten in.");
      }
    } catch {
      setFout("Adres opzoeken mislukt. Vul handmatig coördinaten in.");
    } finally {
      setGeocodingBezig(false);
    }
  }

  function toggleDoelgroep(dg: Doelgroep) {
    setForm((f) => ({
      ...f,
      doelgroepen: f.doelgroepen.includes(dg)
        ? f.doelgroepen.filter((d) => d !== dg)
        : [...f.doelgroepen, dg],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.naam || !form.beschrijving || !form.adres) {
      setFout("Vul naam, beschrijving en adres in.");
      return;
    }
    if (form.doelgroepen.length === 0) {
      setFout("Selecteer minimaal één doelgroep.");
      return;
    }
    if (!isSupabaseConfigured) {
      setFout(
        "Supabase is nog niet gekoppeld. Verbind eerst Supabase om plekken op te slaan."
      );
      return;
    }

    setBezig(true);
    setFout(null);
    try {
      if (modus === "nieuw") {
        await createPlek(form);
      } else if (plek) {
        await updatePlek(plek.id, form);
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setFout(
        err instanceof Error ? err.message : "Er ging iets mis. Probeer opnieuw."
      );
    } finally {
      setBezig(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Error */}
      {fout && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-start gap-2.5">
          <ExclamationCircleIcon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <span className="text-sm text-red-700">{fout}</span>
        </div>
      )}

      {/* Supabase warning */}
      {!isSupabaseConfigured && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-sm text-amber-700">
          <strong className="font-medium">Let op:</strong> Supabase is nog niet gekoppeld — opslaan werkt pas na koppeling.
        </div>
      )}

      {/* Section: Basisinformatie */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-gray-50">
          <h2 className="font-semibold text-gray-900 text-sm">Basisinformatie</h2>
        </div>
        <div className="px-4 md:px-6 py-4 md:py-5 space-y-4">
          <div>
            <label className={labelClass}>
              Naam <span className="text-red-400 font-normal">*</span>
            </label>
            <input
              type="text"
              value={form.naam}
              onChange={(e) => setForm((f) => ({ ...f, naam: e.target.value }))}
              placeholder="bijv. Wijkcentrum Helftheuvel"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Beschrijving <span className="text-red-400 font-normal">*</span>
            </label>
            <textarea
              value={form.beschrijving}
              onChange={(e) =>
                setForm((f) => ({ ...f, beschrijving: e.target.value }))
              }
              placeholder="Korte beschrijving van de ontmoetingsplek..."
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Buurt <span className="text-red-400 font-normal">*</span>
              </label>
              <select
                value={form.buurt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, buurt: e.target.value as Buurt }))
                }
                className={inputClass}
              >
                {BUURTEN.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Type <span className="text-red-400 font-normal">*</span>
              </label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm((f) => ({ ...f, type: e.target.value as PlekType }))
                }
                className={inputClass}
              >
                <option value="buurtgericht">Buurtgericht</option>
                <option value="complexgericht">Complexgericht</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Doelgroepen <span className="text-red-400 font-normal">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {DOELGROEPEN.map((dg) => {
                const active = form.doelgroepen.includes(dg.value);
                return (
                  <button
                    key={dg.value}
                    type="button"
                    onClick={() => toggleDoelgroep(dg.value)}
                    className={`text-sm px-3.5 py-1.5 rounded-full border transition-all ${
                      active
                        ? "bg-gray-900 border-gray-900 text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {dg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Zichtbaarheid toggle */}
          <div className="flex items-center justify-between py-1">
            <div>
              <div className="text-sm font-medium text-gray-700">Zichtbaar op kaart</div>
              <div className="text-xs text-gray-400 mt-0.5">
                {form.actief ? "Wordt getoond op de publieke kaart" : "Verborgen voor bezoekers"}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, actief: !f.actief }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                form.actief ? "bg-brand-500" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                  form.actief ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Section: Locatie */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-gray-50">
          <h2 className="font-semibold text-gray-900 text-sm">Locatie</h2>
        </div>
        <div className="px-4 md:px-6 py-4 md:py-5 space-y-4">
          <div>
            <label className={labelClass}>
              Adres <span className="text-red-400 font-normal">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={form.adres}
                onChange={(e) =>
                  setForm((f) => ({ ...f, adres: e.target.value }))
                }
                placeholder="bijv. Kraaivenstraat 2, 's-Hertogenbosch"
                className={`${inputClass} flex-1`}
              />
              <button
                type="button"
                onClick={zoekCoordinaten}
                disabled={geocodingBezig || !form.adres}
                className="flex items-center gap-1.5 px-3 md:px-3.5 py-2.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-100 transition-colors disabled:opacity-40 whitespace-nowrap shrink-0"
              >
                <MapPinIcon className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {geocodingBezig ? "Zoeken..." : "Zoek locatie"}
                </span>
                <span className="sm:hidden">
                  {geocodingBezig ? "..." : "Zoek"}
                </span>
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Gebruik &apos;Zoek locatie&apos; om automatisch de kaartpositie in te stellen.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Breedtegraad (lat)</label>
              <input
                type="number"
                step="0.0001"
                value={form.lat}
                onChange={(e) =>
                  setForm((f) => ({ ...f, lat: parseFloat(e.target.value) }))
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Lengtegraad (lng)</label>
              <input
                type="number"
                step="0.0001"
                value={form.lng}
                onChange={(e) =>
                  setForm((f) => ({ ...f, lng: parseFloat(e.target.value) }))
                }
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section: Contact */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-gray-50">
          <h2 className="font-semibold text-gray-900 text-sm">Contact & openingstijden</h2>
        </div>
        <div className="px-4 md:px-6 py-4 md:py-5 space-y-4">
          <div>
            <label className={labelClass}>Openingstijden</label>
            <input
              type="text"
              value={form.openingstijden}
              onChange={(e) =>
                setForm((f) => ({ ...f, openingstijden: e.target.value }))
              }
              placeholder="bijv. Ma–vr: 9:00–17:00"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Telefoon</label>
              <input
                type="tel"
                value={form.contact_telefoon}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contact_telefoon: e.target.value }))
                }
                placeholder="073-000 00 00"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>E-mail</label>
              <input
                type="email"
                value={form.contact_email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contact_email: e.target.value }))
                }
                placeholder="info@voorbeeld.nl"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Website</label>
              <input
                type="url"
                value={form.contact_website}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contact_website: e.target.value }))
                }
                placeholder="https://voorbeeld.nl"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Annuleren
        </button>
        <button
          type="submit"
          disabled={bezig}
          className="bg-gray-900 text-white font-medium px-6 py-2.5 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-40 text-sm"
        >
          {bezig
            ? "Opslaan..."
            : modus === "nieuw"
            ? "Plek toevoegen"
            : "Wijzigingen opslaan"}
        </button>
      </div>
    </form>
  );
}
