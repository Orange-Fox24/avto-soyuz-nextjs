// src/app/driver/DriverOrdersClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
}

const statusLabels: Record<string, string> = {
  ASSIGNED: "Назначен",
  LOADING: "Погрузка",
  IN_TRANSIT: "В пути",
  DELIVERED: "Доставлен",
};

const statusStyles: Record<string, string> = {
  ASSIGNED: styles.statusAssigned,
  LOADING: styles.statusLoading,
  IN_TRANSIT: styles.statusInTransit,
  DELIVERED: styles.statusDelivered,
};

const nextStatus: Record<string, { label: string; value: string; style: string }> = {
  ASSIGNED: { label: "Начать погрузку", value: "LOADING", style: styles.startButton },
  LOADING: { label: "Выехал", value: "IN_TRANSIT", style: styles.progressButton },
  IN_TRANSIT: { label: "Доставлен", value: "DELIVERED", style: styles.completeButton },
};

export default function DriverOrdersClient({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleChangeStatus = async (orderId: string, newStatus: string) => {
    setLoading(orderId);
    try {
      await fetch("/api/driver/orders/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      router.refresh();
    } catch (err) {
      console.error("Ошибка:", err);
    } finally {
      setLoading(null);
    }
  };

  if (orders.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2 className={styles.emptyTitle}>Нет активных рейсов</h2>
        <p className={styles.emptyText}>У вас пока нет назначенных заказов</p>
      </div>
    );
  }

  return (
    <div className={styles.ordersList}>
      {orders.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          <div className={styles.orderHeader}>
            <span className={styles.orderRoute}>
              {order.fromCity} → {order.toCity}
            </span>
            <span className={`${styles.status} ${statusStyles[order.status] || ""}`}>
              {statusLabels[order.status] || order.status}
            </span>
          </div>

          <div className={styles.orderInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Вес</span>
              <span className={styles.infoValue}>{order.weight} т</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Тип груза</span>
              <span className={styles.infoValue}>{order.cargoType}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Дата</span>
              <span className={styles.infoValue}>
                {new Date(order.createdAt).toLocaleDateString("ru-RU")}
              </span>
            </div>
            {order.comment && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Комментарий</span>
                <span className={styles.infoValue}>{order.comment}</span>
              </div>
            )}
          </div>

          {nextStatus[order.status] && (
            <div className={styles.actions}>
              <button
                className={`${styles.actionButton} ${nextStatus[order.status].style}`}
                onClick={() => handleChangeStatus(order.id, nextStatus[order.status].value)}
                disabled={loading === order.id}
              >
                {loading === order.id ? "..." : nextStatus[order.status].label}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}