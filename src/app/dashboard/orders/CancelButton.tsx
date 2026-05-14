// src/app/dashboard/orders/CancelButton.tsx
"use client";

import { useState } from "react";

interface CancelButtonProps {
  orderId: string;
  status: string;
}

export default function CancelButton({ orderId, status }: CancelButtonProps) {
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(status === "CANCELLED");

  if (cancelled || status !== "NEW") return null;

  const handleCancel = async () => {
    if (!window.confirm("Вы уверены, что хотите отменить заказ?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/orders/cancel", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      if (res.ok) {
        setCancelled(true);
        window.location.reload();
      }
    } catch (err) {
      console.error("Ошибка:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      style={{
        backgroundColor: "#ef4444",
        color: "#fff",
        fontFamily: '"Wadik Bold", "Wadik", Arial, Helvetica, sans-serif',
        fontWeight: 700,
        fontSize: "0.8rem",
        padding: "0.35rem 0.75rem",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      {loading ? "..." : "Отменить"}
    </button>
  );
}