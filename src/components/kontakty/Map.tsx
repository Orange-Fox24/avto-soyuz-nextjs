"use client";

import MarkerMap, { MapStyle } from "../ui/MarkerMap/MarkerMap";
import styles from "./Map.module.css";

export default function MapContainer() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Мы на карте</h2>
        <div
          style={{
            height: 500,
            width: "100%",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <MarkerMap
            markerList={[
              {
                id: "13",
                latitude: 56.061961,
                longitude: 92.905626,
                popupText: "Светлогорский переулок, 4",
              },
            ]}
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
