// src/app/driver/RouteMap.tsx
"use client";

import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const startIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const endIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface Props {
  fromCity: string;
  toCity: string;
}

export default function RouteMap({ fromCity, toCity }: Props) {
  const [route, setRoute] = useState<[number, number][]>([]);
  const [fromCoord, setFromCoord] = useState<[number, number] | null>(null);
  const [toCoord, setToCoord] = useState<[number, number] | null>(null);
  const [distance, setDistance] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRoute() {
      setLoading(true);
      try {
        const [fromRes, toRes] = await Promise.all([
          fetch(`/api/geocode?city=${encodeURIComponent(fromCity)}`).then((r) => r.json()),
          fetch(`/api/geocode?city=${encodeURIComponent(toCity)}`).then((r) => r.json()),
        ]);

        const from: [number, number] = [fromRes.lat, fromRes.lon];
        const to: [number, number] = [toRes.lat, toRes.lon];
        setFromCoord(from);
        setToCoord(to);

        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;
        const osrmRes = await fetch(osrmUrl);
        const osrmData = await osrmRes.json();

        if (osrmData.routes?.length > 0) {
          const coordinates = osrmData.routes[0].geometry.coordinates.map(
            (c: [number, number]) => [c[1], c[0]] as [number, number]
          );
          setRoute(coordinates);

          const km = (osrmData.routes[0].distance / 1000).toFixed(0);
          const hours = (osrmData.routes[0].duration / 3600).toFixed(1);
          setDistance(`${km} км, ~${hours} ч`);
        } else {
          setRoute([from, to]);
          setDistance("~");
        }
      } catch (err) {
        console.error("Ошибка загрузки маршрута:", err);
        if (fromCoord && toCoord) {
          setRoute([fromCoord, toCoord]);
        }
      } finally {
        setLoading(false);
      }
    }

    loadRoute();
  }, [fromCity, toCity]);

  if (!fromCoord || !toCoord) {
    return (
      <div style={{
        height: "350px",
        background: "#f9fafb",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Actay, Arial, sans-serif",
        color: "#6b7280",
      }}>
        Загрузка карты...
      </div>
    );
  }

  const center: [number, number] = [
    (fromCoord[0] + toCoord[0]) / 2,
    (fromCoord[1] + toCoord[1]) / 2,
  ];

  return (
    <div>
      {distance && (
        <div style={{
          textAlign: "center",
          marginBottom: "0.75rem",
          fontFamily: '"Wadik Bold", "Wadik", Arial, Helvetica, sans-serif',
          fontWeight: 700,
          fontSize: "1.1rem",
          color: "#ffa20c",
        }}>
          {distance}
        </div>
      )}
      <div style={{ height: "350px", borderRadius: "12px", overflow: "hidden" }}>
        <MapContainer
          center={center}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://leafletjs.com">Leaflet</a>'
          />
          <Marker position={fromCoord} icon={startIcon}>
            <Popup>{fromCity} — отправка</Popup>
          </Marker>
          <Marker position={toCoord} icon={endIcon}>
            <Popup>{toCity} — доставка</Popup>
          </Marker>
          <Polyline
            positions={route}
            color="#ffa20c"
            weight={4}
            opacity={0.8}
          />
        </MapContainer>
      </div>
    </div>
  );
}