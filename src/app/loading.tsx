"use client";

// src/app/loading.tsx
export default function Loading() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f4f4f4",
      gap: "2rem",
    }}>
      {/* Анимированный грузовик */}
      <div style={{
        width: "80px",
        height: "80px",
        position: "relative",
        animation: "truck-bounce 1.2s ease-in-out infinite",
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#ffa20c" width="80" height="80">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      </div>

      {/* Полоска загрузки */}
      <div style={{
        width: "200px",
        height: "4px",
        backgroundColor: "#e5e7eb",
        borderRadius: "2px",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: "30%",
          backgroundColor: "#ffa20c",
          borderRadius: "2px",
          animation: "loading-bar 1.5s ease-in-out infinite",
        }} />
      </div>

      {/* Текст */}
      <p style={{
        fontFamily: '"Actay", Arial, Helvetica, sans-serif',
        fontSize: "1rem",
        color: "#6b7280",
      }}>
        Загрузка...
      </p>

      <style jsx>{`
        @keyframes truck-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
}