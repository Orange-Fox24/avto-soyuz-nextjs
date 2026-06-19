// src/app/driver/DriverOrdersClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import styles from "./Driver.module.css";

const MapComponent = dynamic(() => import("./RouteMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "350px",
        background: "#f9fafb",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Actay, Arial, sans-serif",
        color: "#6b7280",
      }}
    >
      Загрузка карты...
    </div>
  ),
});

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

const nextStatus: Record<
  string,
  { label: string; value: string; style: string }
> = {
  ASSIGNED: {
    label: "Начать погрузку",
    value: "LOADING",
    style: styles.startButton,
  },
  LOADING: {
    label: "Выехал",
    value: "IN_TRANSIT",
    style: styles.progressButton,
  },
  IN_TRANSIT: {
    label: "Доставлен",
    value: "DELIVERED",
    style: styles.completeButton,
  },
};

export default function DriverOrdersClient({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showProblem, setShowProblem] = useState(false);

  const handleChangeStatus = async (orderId: string, newStatus: string) => {
    const label = statusLabels[newStatus] || newStatus;
    if (!window.confirm(`Вы уверены? Новый статус: "${label}"`)) return;
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
    <>
      <div className={styles.ordersList}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <span className={styles.orderRoute}>
                {order.fromCity} → {order.toCity}
              </span>
              <span
                className={`${styles.status} ${statusStyles[order.status] || ""}`}
              >
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
            <div className={styles.actions}>
              {nextStatus[order.status] && (
                <button
                  className={`${styles.actionButton} ${nextStatus[order.status].style}`}
                  onClick={() =>
                    handleChangeStatus(order.id, nextStatus[order.status].value)
                  }
                  disabled={loading === order.id}
                >
                  {loading === order.id
                    ? "..."
                    : nextStatus[order.status].label}
                </button>
              )}
              <button
                className={`${styles.actionButton}`}
                style={{ backgroundColor: "#6b7280" }}
                onClick={() => {
                  setSelectedOrder(order);
                  setShowProblem(false);
                }}
              >
                Маршрут
              </button>
              <button
                className={`${styles.actionButton}`}
                style={{ backgroundColor: "#ef4444" }}
                onClick={() => {
                  setSelectedOrder(order);
                  setShowProblem(true);
                }}
              >
                Проблема
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && !showProblem && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "1rem",
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "24px",
              padding: "1.5rem",
              width: "100%",
              maxWidth: "700px",
              maxHeight: "80vh",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontFamily:
                  '"Actay Wide Bold", "Actay Wide", "Actay", Arial, Helvetica, sans-serif',
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              Маршрут: {selectedOrder.fromCity} → {selectedOrder.toCity}
            </h3>
            <MapComponent
              key={selectedOrder.id}
              fromCity={selectedOrder.fromCity}
              toCity={selectedOrder.toCity}
            />
            <button
              onClick={() => setSelectedOrder(null)}
              style={{
                marginTop: "1rem",
                backgroundColor: "#ffa20c",
                color: "#fff",
                fontFamily:
                  '"Wadik Bold", "Wadik", Arial, Helvetica, sans-serif',
                fontWeight: 700,
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {selectedOrder && showProblem && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "1rem",
          }}
          onClick={() => {
            setShowProblem(false);
            setSelectedOrder(null);
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "24px",
              padding: "2rem",
              width: "100%",
              maxWidth: "450px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontFamily:
                  '"Actay Wide Bold", "Actay Wide", "Actay", Arial, Helvetica, sans-serif',
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              Сообщить о проблеме
            </h3>
            <p
              style={{
                fontFamily: "Actay, Arial, sans-serif",
                fontSize: "0.9rem",
                color: "#6b7280",
                marginBottom: "1rem",
              }}
            >
              Заказ: {selectedOrder.fromCity} → {selectedOrder.toCity}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {[
                "Поломка транспорта",
                "ДТП",
                "Опоздание на погрузку",
                "Проблемы с грузом",
                "Другое",
              ].map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    if (window.confirm(`Подтвердить: "${p}"?`)) {
                      fetch("/api/driver/problem", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          orderId: selectedOrder.id,
                          problem: p,
                        }),
                      }).then(() => {
                        alert("Проблема зафиксирована. Менеджер уведомлён.");
                        setShowProblem(false);
                        setSelectedOrder(null);
                      });
                    }
                  }}
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "#fef2f2",
                    color: "#991b1b",
                    border: "1px solid #fecaca",
                    borderRadius: "12px",
                    fontFamily: "Actay, Arial, sans-serif",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setShowProblem(false);
                setSelectedOrder(null);
              }}
              style={{
                marginTop: "1rem",
                backgroundColor: "#6b7280",
                color: "#fff",
                fontFamily:
                  '"Wadik Bold", "Wadik", Arial, Helvetica, sans-serif',
                fontWeight: 700,
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </>
  );
}
