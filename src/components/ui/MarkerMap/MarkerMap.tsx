"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import styles from "./MarkerMap.module.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

interface MarkersMapProps {
  markerList: {
    id: string;
    latitude: number;
    longitude: number;
    popupText?: string;
  }[];
  style?: MapStyle;
  styleControl?: boolean;
  width?: number | string;
  height?: number | string;
  zoom?: number;
  zoomControl?: boolean;
  readonly?: boolean;
  handleSelect?: (marker: {
    id: string;
    latitude: number;
    longitude: number;
  }) => void;
}

export enum MapStyle {
  CLASSIC,
  LIGHT,
  DARK,
  SATELITE,
}

export default function MarkerMap({
  markerList,
  style,
  styleControl,
  zoom,
  zoomControl,
  readonly,
  handleSelect,
}: MarkersMapProps) {
  const [center] = useState<[number, number]>([0, 0]);
  const [mapStyle, setMapStyle] = useState<MapStyle>(style || MapStyle.CLASSIC);

  const createIconFromComponent = () => {
    return L.divIcon({
      className: styles.icon,
      iconSize: [26, 26],
    });
  };

  const onSelect = (
    _: any,
    marker: { id: string; latitude: number; longitude: number },
  ) => {
    if (readonly) return;
    handleSelect && handleSelect(marker);
  };

  const getTileUrl = () => {
    switch (mapStyle) {
      case MapStyle.CLASSIC:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      case MapStyle.DARK:
        return "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
      case MapStyle.LIGHT:
        return "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
      case MapStyle.SATELITE:
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }
  };

  return (
    <div className={styles.wrapper}>
      {styleControl && (
        <div className={styles.style_controls}>
          <button onClick={() => setMapStyle(MapStyle.CLASSIC)}>Classic</button>
          <button onClick={() => setMapStyle(MapStyle.LIGHT)}>Light</button>
          <button onClick={() => setMapStyle(MapStyle.DARK)}>Dark</button>
          <button onClick={() => setMapStyle(MapStyle.SATELITE)}>
            Satelite
          </button>
        </div>
      )}
      <MapContainer
        center={center}
        zoom={zoom || 13}
        scrollWheelZoom={!readonly}
        zoomControl={zoomControl}
        dragging={!readonly}
        style={{ height: "inherit", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={getTileUrl()}
        />

        <FitBoundsToMarkers markers={markerList} />
        <RemoveLeafletPrefix />
        {markerList.map((o) => (
          <Marker
            key={o.id}
            icon={createIconFromComponent()}
            position={[o.latitude, o.longitude]}
            eventHandlers={{ click: (e) => !readonly && onSelect(e, o) }}
          >
            {o.popupText && <Popup>{o.popupText}</Popup>}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

// Компонент для авто-центрирования по всем маркерам
function FitBoundsToMarkers({
  markers,
}: {
  markers: { latitude: number; longitude: number }[];
}) {
  const map = useMap();

  useEffect(() => {
    if (markers && markers.length > 0) {
      if (markers.length === 1) {
        // Если один маркер - центрируем на нем
        map.setView([markers[0].latitude, markers[0].longitude], 13);
      } else {
        // Если несколько маркеров - подгоняем границы
        const bounds = L.latLngBounds(
          markers.map((m) => [m.latitude, m.longitude]),
        );
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [markers, map]);

  return null;
}

function RemoveLeafletPrefix() {
  const map = useMap();

  useEffect(() => {
    if (map.attributionControl) {
      // Убирает префикс "Leaflet", оставляя остальной attribution
      map.attributionControl.setPrefix("");
    }
  }, [map]);

  return null;
}
