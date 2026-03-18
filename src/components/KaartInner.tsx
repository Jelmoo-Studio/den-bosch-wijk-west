"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Ontmoetingsplek, BUURT_COLORS } from "@/lib/types";
import Link from "next/link";

// Fix Leaflet default icon path in Next.js
function fixLeafletIcons() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
}

function createColoredIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width: 28px; height: 28px;
      background-color: ${color};
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
  });
}

function FlyToMarker({
  selected,
  plekken,
}: {
  selected: string | null;
  plekken: Ontmoetingsplek[];
}) {
  const map = useMap();
  useEffect(() => {
    if (!selected) return;
    const plek = plekken.find((p) => p.id === selected);
    if (plek) {
      map.flyTo([plek.lat, plek.lng], 16, { duration: 0.8 });
    }
  }, [selected, plekken, map]);
  return null;
}

interface KaartInnerProps {
  plekken: Ontmoetingsplek[];
  selectedId: string | null;
  onSelectPlek: (id: string) => void;
}

export default function KaartInner({
  plekken,
  selectedId,
  onSelectPlek,
}: KaartInnerProps) {
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  return (
    <MapContainer
      center={[51.7, 5.29]}
      zoom={13}
      className="h-full w-full rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToMarker selected={selectedId} plekken={plekken} />
      {plekken.map((plek) => (
        <Marker
          key={plek.id}
          position={[plek.lat, plek.lng]}
          icon={createColoredIcon(BUURT_COLORS[plek.buurt])}
          eventHandlers={{ click: () => onSelectPlek(plek.id) }}
        >
          <Popup>
            <div className="min-w-[180px]">
              <div
                className="text-xs font-semibold uppercase tracking-wide mb-1"
                style={{ color: BUURT_COLORS[plek.buurt] }}
              >
                {plek.buurt}
              </div>
              <div className="font-bold text-gray-900 text-sm mb-1">
                {plek.naam}
              </div>
              <div className="text-xs text-gray-500 mb-3">{plek.adres}</div>
              <Link
                href={`/plek/${plek.id}`}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                Meer informatie →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
