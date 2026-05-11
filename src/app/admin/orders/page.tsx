// src/app/admin/orders/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./AdminOrders.module.css";

interface Order {
  id: string;
  fromCity: string;
  toCity: string;
  weight: number;
  cargoType: string;
  status: string;
  createdAt: string;
  driverId?: string;
}

const statusLabels: Record<string, string> = {
  NEW: "Новая",
  ASSIGNED: "Назначен",
  LOADING: "Погрузка",
  IN_TRANSIT: "В пути",
  DELIVERED: "Доставлен",
  CANCELLED: "Отменён",
};

const statusStyles: Record<string, string> = {
  NEW: styles.statusNew,
  ASSIGNED: styles.statusAssigned,
  LOADING: styles.statusLoading,
  IN_TRANSIT: styles.statusInTransit,
  DELIVERED: styles.statusDelivered,
  CANCELLED: styles.statusCancelled,
};

const nextStatuses: Record<string, string[]> = {
  NEW: ["ASSIGNED", "CANCELLED"],
  ASSIGNED: ["LOADING", "CANCELLED"],
  LOADING: ["IN_TRANSIT"],
  IN_TRANSIT: ["DELIVERED"],
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState<"assign" | "status" | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    fetchOrders();
    fetchDrivers();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Ошибка загрузки заказов:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDrivers = async () => {
    try {
      const res = await fetch("/api/admin/drivers");
      const data = await res.json();
      setDrivers(data.drivers || []);
    } catch (err) {
      console.error("Ошибка загрузки водителей:", err);
    }
  };

  const handleAssign = (order: Order) => {
    setSelectedOrder(order);
    setSelectedDriver("");
    setModalType("assign");
  };

  const handleChangeStatus = (order: Order) => {
    setSelectedOrder(order);
    setSelectedStatus("");
    setModalType("status");
  };

  const submitAssign = async () => {
    if (!selectedOrder || !selectedDriver) return;
    try {
      await fetch("/api/admin/orders/assign", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: selectedOrder.id, driverId: selectedDriver }),
      });
      setModalType(null);
      fetchOrders();
    } catch (err) {
      console.error("Ошибка:", err);
    }
  };

  const submitStatus = async () => {
    if (!selectedOrder || !selectedStatus) return;
    try {
      await fetch("/api/admin/orders/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: selectedOrder.id, status: selectedStatus }),
      });
      setModalType(null);
      fetchOrders();
    } catch (err) {
      console.error("Ошибка:", err);
    }
  };

  if (loading) return <div className={styles.page}><div className={styles.container}>Загрузка...</div></div>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/admin" className={styles.backLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Назад в панель менеджера
        </Link>

        <h1 className={styles.title}>Все заказы</h1>

        {orders.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Откуда</th>
                  <th>Куда</th>
                  <th>Вес (т)</th>
                  <th>Тип</th>
                  <th>Статус</th>
                  <th>Дата</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.fromCity}</td>
                    <td>{order.toCity}</td>
                    <td>{order.weight}</td>
                    <td>{order.cargoType}</td>
                    <td>
                      <span className={`${styles.status} ${statusStyles[order.status] || ""}`}>
                        {statusLabels[order.status] || order.status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString("ru-RU")}</td>
                    <td>
                      <div className={styles.actions}>
                        {order.status === "NEW" && (
                          <button className={`${styles.actionButton} ${styles.assignButton}`} onClick={() => handleAssign(order)}>
                            Назначить
                          </button>
                        )}
                        {nextStatuses[order.status] && nextStatuses[order.status].length > 0 && (
                          <button className={`${styles.actionButton} ${styles.statusButton}`} onClick={() => handleChangeStatus(order)}>
                            Сменить статус
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>Заказов пока нет</h2>
            <p className={styles.emptyText}>Когда клиенты создадут заказы, они появятся здесь</p>
          </div>
        )}

        {/* Модальное окно */}
        {modalType && (
          <div className={styles.modalOverlay} onClick={() => setModalType(null)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              {modalType === "assign" && (
                <>
                  <h2 className={styles.modalTitle}>Назначить водителя</h2>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Выберите водителя</label>
                    <select className={styles.select} value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)}>
                      <option value="">-- Выберите --</option>
                      {drivers.map((d: any) => (
                        <option key={d.id} value={d.id}>{d.name || d.email}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.modalButtons}>
                    <button className={styles.saveButton} onClick={submitAssign}>Назначить</button>
                    <button className={styles.cancelButton} onClick={() => setModalType(null)}>Отмена</button>
                  </div>
                </>
              )}

              {modalType === "status" && selectedOrder && (
                <>
                  <h2 className={styles.modalTitle}>Изменить статус</h2>
                  <p style={{ marginBottom: "1rem", color: "#6b7280" }}>
                    Заказ: {selectedOrder.fromCity} → {selectedOrder.toCity}
                  </p>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Новый статус</label>
                    <select className={styles.select} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                      <option value="">-- Выберите --</option>
                      {(nextStatuses[selectedOrder.status] || []).map((s) => (
                        <option key={s} value={s}>{statusLabels[s]}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.modalButtons}>
                    <button className={styles.saveButton} onClick={submitStatus}>Сохранить</button>
                    <button className={styles.cancelButton} onClick={() => setModalType(null)}>Отмена</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}