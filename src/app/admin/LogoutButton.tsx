// src/app/admin/LogoutButton.tsx
"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = () => {
    if (window.confirm("Вы уверены, что хотите выйти?")) {
      signOut({ callbackUrl: "/" });
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: "#ef4444",
        color: "#ffffff",
        fontFamily: '"Wadik Bold", "Wadik", Arial, Helvetica, sans-serif',
        fontWeight: 700,
        fontSize: "0.9rem",
        padding: "0.75rem 1.5rem",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
      }}
    >
      Выйти
    </button>
  );
}