"use client";

import dynamic from "next/dynamic";
import Form from "./Form";
import Info from "./Info";

const MapContainer = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4f4f4" }}>
      <p style={{ fontFamily: "Actay, Arial, sans-serif", color: "#6b7280" }}>Загрузка карты...</p>
    </div>
  ),
});

export default function ContactsPage() {
  return (
    <>
      <Info />
      <MapContainer />
      <Form />
    </>
  );
}