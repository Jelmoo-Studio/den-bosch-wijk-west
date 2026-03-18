"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Ontmoetingsplek, BUURT_COLORS } from "@/lib/types";

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

function createColoredIcon(color: string, isSelected: boolean) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width: ${isSelected ? "34px" : "28px"};
      height: ${isSelected ? "34px" : "28px"};
      background-color: ${color};
      border: ${isSelected ? "3px" : "2.5px"} solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px ${isSelected ? "10px" : "6px"} rgba(0,0,0,${isSelected ? "0.4" : "0.2"});
      transition: all 0.2s;
    "></div>`,
    iconSize: [isSelected ? 34 : 28, isSelected ? 34 : 28],
    iconAnchor: [isSelected ? 17 : 14, isSelected ? 34 : 28],
    popupAnchor: [0, -32],
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
  onOpenDetail: (plek: Ontmoetingsplek) => void;
}

export default function KaartInner({
  plekken,
  selectedId,
  onSelectPlek,
  onOpenDetail,
}: KaartInnerProps) {
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  return (
    <MapContainer
      center={[51.698, 5.285]}
      zoom={15}
      className="h-full w-full rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <FlyToMarker selected={selectedId} plekken={plekken} />
      {plekken.map((plek) => (
        <Marker
          key={plek.id}
          position={[plek.lat, plek.lng]}
          icon={createColoredIcon(BUURT_COLORS[plek.buurt], selectedId === plek.id)}
          eventHandlers={{ click: () => onSelectPlek(plek.id) }}
        >
          <Popup>
            <div className="min-w-[180px]">
              <div
                className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: BUURT_COLORS[plek.buurt] }}
              >
                {plek.buurt}
              </div>
              <div className="font-bold text-gray-900 text-sm mb-0.5">
                {plek.naam}
              </div>
              <div className="text-xs text-gray-500 mb-3">{plek.adres}</div>
              <button
                onClick={() => onOpenDetail(plek)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-colors w-full text-center"
                style={{ backgroundColor: BUURT_COLORS[plek.buurt] }}
              >
                Meer informatie
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
