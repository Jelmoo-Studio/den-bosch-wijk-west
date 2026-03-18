"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ontmoetingsplek, BUURTEN, DOELGROEPEN, Buurt, PlekType, Doelgroep } from "@/lib/types";
import { createPlek, updatePlek } from "@/lib/plekken";
import { isSupabaseConfigured } from "@/lib/supabase";

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
    <form onSubmit={handleSubmit} className="space-y-6">
      {fout && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {fout}
        </div>
      )}

      {!isSupabaseConfigured && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-xl px-4 py-3 text-sm">
          <strong>Let op:</strong> Supabase is nog niet gekoppeld. Het formulier
          is zichtbaar maar opslaan werkt pas na koppeling.
        </div>
      )}

      {/* Basisinfo */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-gray-700">Basisinformatie</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Naam <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.naam}
            onChange={(e) => setForm((f) => ({ ...f, naam: e.target.value }))}
            placeholder="bijv. Wijkcentrum Helftheuvel"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Beschrijving <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.beschrijving}
            onChange={(e) =>
              setForm((f) => ({ ...f, beschrijving: e.target.value }))
            }
            placeholder="Korte beschrijving van de ontmoetingsplek..."
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buurt <span className="text-red-500">*</span>
            </label>
            <select
              value={form.buurt}
              onChange={(e) =>
                setForm((f) => ({ ...f, buurt: e.target.value as Buurt }))
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 bg-white"
            >
              {BUURTEN.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              value={form.type}
              onChange={(e) =>
                setForm((f) => ({ ...f, type: e.target.value as PlekType }))
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 bg-white"
            >
              <option value="buurtgericht">Buurtgericht</option>
              <option value="complexgericht">Complexgericht</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Doelgroepen <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {DOELGROEPEN.map((dg) => (
              <button
                key={dg.value}
                type="button"
                onClick={() => toggleDoelgroep(dg.value)}
                className={`text-sm px-3 py-1.5 rounded-full border transition-all ${
                  form.doelgroepen.includes(dg.value)
                    ? "bg-brand-500 border-brand-500 text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {dg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actief toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, actief: !f.actief }))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              form.actief ? "bg-brand-500" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                form.actief ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-sm text-gray-700">
            {form.actief ? "Zichtbaar op de kaart" : "Verborgen van de kaart"}
          </span>
        </div>
      </div>

      {/* Locatie */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-gray-700">Locatie</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adres <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={form.adres}
              onChange={(e) =>
                setForm((f) => ({ ...f, adres: e.target.value }))
              }
              placeholder="bijv. Kraaivenstraat 2, 's-Hertogenbosch"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
            <button
              type="button"
              onClick={zoekCoordinaten}
              disabled={geocodingBezig || !form.adres}
              className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {geocodingBezig ? "Zoeken..." : "📍 Zoek coördinaten"}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Klik op &apos;Zoek coördinaten&apos; om automatisch de kaartpositie in te
            stellen.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Breedtegraad (lat)
            </label>
            <input
              type="number"
              step="0.0001"
              value={form.lat}
              onChange={(e) =>
                setForm((f) => ({ ...f, lat: parseFloat(e.target.value) }))
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lengtegraad (lng)
            </label>
            <input
              type="number"
              step="0.0001"
              value={form.lng}
              onChange={(e) =>
                setForm((f) => ({ ...f, lng: parseFloat(e.target.value) }))
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
        </div>
      </div>

      {/* Contactinfo */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-gray-700">Contact & openingstijden</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Openingstijden
          </label>
          <input
            type="text"
            value={form.openingstijden}
            onChange={(e) =>
              setForm((f) => ({ ...f, openingstijden: e.target.value }))
            }
            placeholder="bijv. Ma–vr: 9:00–17:00"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefoon
            </label>
            <input
              type="tel"
              value={form.contact_telefoon}
              onChange={(e) =>
                setForm((f) => ({ ...f, contact_telefoon: e.target.value }))
              }
              placeholder="073-000 00 00"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={form.contact_email}
              onChange={(e) =>
                setForm((f) => ({ ...f, contact_email: e.target.value }))
              }
              placeholder="info@voorbeeld.nl"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              value={form.contact_website}
              onChange={(e) =>
                setForm((f) => ({ ...f, contact_website: e.target.value }))
              }
              placeholder="https://voorbeeld.nl"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
        </div>
      </div>

      {/* Knoppen */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Annuleren
        </button>
        <button
          type="submit"
          disabled={bezig}
          className="bg-brand-500 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 text-sm"
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
