// src/app/driver/DriverTabs.tsx
"use client";

import { useState } from "react";
import DriverOrdersClient from "./DriverOrdersClient";
import styles from "./Driver.module.css";

interface Order {
  id: string;
  fromCity: string;
  toCity: string;
  weight: number;
  cargoType: string;
  status: string;
  comment?: string;
  createdAt: string;
  price?: number;
}

const statusLabels: Record<string, string> = {
  NEW: "Новая",
  ASSIGNED: "Назначен",
  LOADING: "Погрузка",
  IN_TRANSIT: "В пути",
  DELIVERED: "Доставлен",
  CANCELLED: "Отменён",
};

export default function DriverTabs({
  activeOrders,
  completedOrders,
}: {
  activeOrders: Order[];
  completedOrders: Order[];
}) {
  const [tab, setTab] = useState<"active" | "history">("active");

  return (
    <div>
      {/* Вкладки */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <button
          onClick={() => setTab("active")}
          style={{
            padding: "0.6rem 1.5rem",
            borderRadius: "12px",
            border: tab === "active" ? "2px solid #ffa20c" : "2px solid #e5e7eb",
            backgroundColor: tab === "active" ? "rgba(255,162,12,0.1)" : "transparent",
            color: tab === "active" ? "#ffa20c" : "#6b7280",
            fontFamily: '"Wadik Bold", "Wadik", Arial, Helvetica, sans-serif',
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          Активные ({activeOrders.length})
        </button>
        <button
          onClick={() => setTab("history")}
          style={{
            padding: "0.6rem 1.5rem",
            borderRadius: "12px",
            border: tab === "history" ? "2px solid #ffa20c" : "2px solid #e5e7eb",
            backgroundColor: tab === "history" ? "rgba(255,162,12,0.1)" : "transparent",
            color: tab === "history" ? "#ffa20c" : "#6b7280",
            fontFamily: '"Wadik Bold", "Wadik", Arial, Helvetica, sans-serif',
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          История ({completedOrders.length})
        </button>
      </div>

      {/* Контент */}
      {tab === "active" ? (
        <DriverOrdersClient orders={activeOrders} />
      ) : (
        <div>
          {completedOrders.length > 0 ? (
            <div className={styles.ordersList}>
              {completedOrders.map((order) => (
                <div key={order.id} className={styles.orderCard} style={{ opacity: 0.8 }}>
                  <div className={styles.orderHeader}>
                    <span className={styles.orderRoute}>
                      {order.fromCity} → {order.toCity}
                    </span>
                    <span style={{
                      display: "inline-block",
                      fontFamily: '"Wadik Bold", "Wadik", Arial, Helvetica, sans-serif',
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "8px",
                      backgroundColor: "#d1fae5",
                      color: "#065f46",
                    }}>
                      Доставлен
                    </span>
                  </div>
                  <div className={styles.orderInfo}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Вес</span>
                      <span className={styles.infoValue}>{order.weight} т</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Тип</span>
                      <span className={styles.infoValue}>{order.cargoType}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Дата</span>
                      <span className={styles.infoValue}>
                        {new Date(order.createdAt).toLocaleDateString("ru-RU")}
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Цена</span>
                      <span className={styles.infoValue}>
                        {order.price ? `${order.price.toLocaleString()} ₽` : "—"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h2 className={styles.emptyTitle}>Нет завершённых рейсов</h2>
              <p className={styles.emptyText}>Выполненные заказы появятся здесь</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}