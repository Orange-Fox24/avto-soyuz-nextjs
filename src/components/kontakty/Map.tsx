"use client";

import dynamic from "next/dynamic";
import { MapStyle } from "../ui/MarkerMap/MarkerMap";
import styles from "./Map.module.css";
const MarkerMap = dynamic(() => import("../ui/MarkerMap/MarkerMap"), {
  ssr: false, // Отключаем SSR для карты
  loading: () => <div>Загрузка карты...</div>, // Опционально
});

export default function MapContainer() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div style={{ height: 500 }}>
          <MarkerMap
            markerList={[
              {
                id: "13",
                latitude: 56.061961,
                longitude: 92.905626,
                popupText: "Светлогорский переулок, 4",
              },
            ]}
            // height={500}
            readonly
            styleControl
            zoomControl
            zoom={15}
            style={MapStyle.LIGHT}
          />
        </div>
      </div>
    </section>
  );
}
