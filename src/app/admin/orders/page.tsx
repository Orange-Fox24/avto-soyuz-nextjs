// src/app/admin/orders/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./AdminOrders.module.css";

interface Order {
  id: string;
  fromCity: string;
  toCity: string;
  weight: number;
  cargoType: string;
  status: string;
  price?: number;
  isPaid?: boolean;
  createdAt: string;
  driverId?: string;
  client?: {
    name: string;
    email: string;
    phone: string;
  };
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
  const [modalMode, setModalMode] = useState<"assign" | "status" | "price" | "payment" | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [filterStatus, setFilterStatus] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(`.${styles.actionMenu}`)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.append("status", filterStatus);
      if (filterDateFrom) params.append("dateFrom", filterDateFrom);
      if (filterDateTo) params.append("dateTo", filterDateTo);
      const res = await fetch(`/api/admin/orders?${params.toString()}`);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Ошибка загрузки заказов:", err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterDateFrom, filterDateTo]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const fetchDrivers = async () => {
    try {
      const res = await fetch("/api/admin/drivers");
      const data = await res.json();
      setDrivers((data.drivers || []).filter((d: any) => !d.isOnLeave));
    } catch (err) {
      console.error("Ошибка загрузки водителей:", err);
    }
  };

  useEffect(() => { fetchDrivers(); }, []);

  const handleAssign = (order: Order) => { setSelectedOrder(order); setSelectedDriver(""); setModalMode("assign"); };
  const handleChangeStatus = (order: Order) => { setSelectedOrder(order); setSelectedStatus(""); setModalMode("status"); };
  const handleEditPrice = (order: Order) => { setSelectedOrder(order); setEditPrice(order.price?.toString() || ""); setModalMode("price"); };
  const handleTogglePayment = (order: Order) => { setSelectedOrder(order); setModalMode("payment"); };

  const submitAssign = async () => {
    if (!selectedOrder || !selectedDriver) return;
    if (!window.confirm("Назначить водителя на этот заказ?")) return;
    await fetch("/api/admin/orders/assign", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: selectedOrder.id, driverId: selectedDriver }) });
    setModalMode(null); fetchOrders();
  };

  const submitStatus = async () => {
    if (!selectedOrder || !selectedStatus) return;
    if (!window.confirm(`Изменить статус заказа на "${statusLabels[selectedStatus]}"?`)) return;
    await fetch("/api/admin/orders/status", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: selectedOrder.id, status: selectedStatus }) });
    setModalMode(null); fetchOrders();
  };

  const submitPrice = async () => {
    if (!selectedOrder || !editPrice) return;
    if (!window.confirm(`Установить точную цену ${parseFloat(editPrice).toLocaleString()} руб.?`)) return;
    await fetch("/api/admin/orders/price", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: selectedOrder.id, price: parseFloat(editPrice) }) });
    setModalMode(null); fetchOrders();
  };

  const submitPayment = async (paid: boolean) => {
    if (!selectedOrder) return;
    if (!window.confirm(paid ? "Отметить заказ как оплаченный?" : "Отметить заказ как неоплаченный?")) return;
    await fetch("/api/admin/orders/payment", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: selectedOrder.id, isPaid: paid }) });
    setModalMode(null); fetchOrders();
  };

  const canEditPrice = (order: Order) => { if (order.status === "CANCELLED") return false; return !order.price || order.price === 0; };
  const canTogglePayment = (order: Order) => { if (order.status === "CANCELLED") return false; return !order.isPaid; };

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

        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setLoading(true); }} style={{ padding: "0.6rem 1rem", borderRadius: "10px", border: "1px solid #e5e7eb", fontFamily: "Actay, Arial, sans-serif", fontSize: "0.9rem" }}>
            <option value="">Все статусы</option>
            {Object.entries(statusLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>
          <input type="date" value={filterDateFrom} onChange={(e) => { setFilterDateFrom(e.target.value); setLoading(true); }} style={{ padding: "0.6rem 1rem", borderRadius: "10px", border: "1px solid #e5e7eb", fontFamily: "Actay, Arial, sans-serif", fontSize: "0.9rem" }} />
          <input type="date" value={filterDateTo} onChange={(e) => { setFilterDateTo(e.target.value); setLoading(true); }} style={{ padding: "0.6rem 1rem", borderRadius: "10px", border: "1px solid #e5e7eb", fontFamily: "Actay, Arial, sans-serif", fontSize: "0.9rem" }} />
          {(filterStatus || filterDateFrom || filterDateTo) && (
            <button onClick={() => { setFilterStatus(""); setFilterDateFrom(""); setFilterDateTo(""); setLoading(true); }} style={{ padding: "0.6rem 1rem", borderRadius: "10px", border: "1px solid #ef4444", color: "#ef4444", background: "#fff", fontFamily: "Actay, Arial, sans-serif", fontSize: "0.9rem", cursor: "pointer" }}>Сбросить</button>
          )}
        </div>

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
                  <th>Цена</th>
                  <th>Оплата</th>
                  <th>Клиент</th>
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
                    <td><span className={`${styles.status} ${statusStyles[order.status] || ""}`}>{statusLabels[order.status] || order.status}</span></td>
                    <td style={{ fontFamily: "Actay, Arial, sans-serif", fontWeight: 600 }}>{order.price ? `${order.price.toLocaleString()} руб.` : "—"}</td>
                    <td><span className={`${styles.status} ${order.isPaid ? styles.statusDelivered : styles.statusNew}`}>{order.isPaid ? "Оплачен" : "Не оплачен"}</span></td>
                    <td style={{ fontFamily: "Actay, Arial, sans-serif", fontSize: "0.85rem" }}>
                      <div>{order.client?.name || order.client?.email || "—"}</div>
                      {order.client?.phone && <div style={{ color: "#6b7280", fontSize: "0.8rem" }}>{order.client.phone}</div>}
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString("ru-RU")}</td>
                    <td>
                      <div className={styles.actionMenu}>
                        <button className={styles.actionMenuButton} onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === order.id ? null : order.id); }}>Действия ▾</button>
                        <div className={`${styles.actionDropdown} ${openMenuId === order.id ? styles.open : ""}`}>
                          <button className={styles.actionDropdownItem} onClick={() => { window.location.href = `/admin/orders/${order.id}`; }}>Подробнее</button>
                          {order.status === "NEW" && <button className={styles.actionDropdownItem} onClick={() => { handleAssign(order); setOpenMenuId(null); }}>Назначить водителя</button>}
                          {canEditPrice(order) && <button className={styles.actionDropdownItem} onClick={() => { handleEditPrice(order); setOpenMenuId(null); }}>Установить цену</button>}
                          {canTogglePayment(order) && <button className={styles.actionDropdownItem} onClick={() => { handleTogglePayment(order); setOpenMenuId(null); }}>Подтвердить оплату</button>}
                          {nextStatuses[order.status] && nextStatuses[order.status].length > 0 && <button className={styles.actionDropdownItem} onClick={() => { handleChangeStatus(order); setOpenMenuId(null); }}>Сменить статус</button>}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}><h2 className={styles.emptyTitle}>Заказов пока нет</h2><p className={styles.emptyText}>Когда клиенты создадут заказы, они появятся здесь</p></div>
        )}

        {modalMode && (
          <div className={styles.modalOverlay} onClick={() => setModalMode(null)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              {modalMode === "assign" && (
                <>
                  <h2 className={styles.modalTitle}>Назначить водителя</h2>
                  <div className={styles.formGroup}><label className={styles.label}>Выберите водителя</label><select className={styles.select} value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)}><option value="">-- Выберите --</option>{drivers.map((d: any) => <option key={d.id} value={d.id}>{d.name || d.email}</option>)}</select></div>
                  <div className={styles.modalButtons}><button className={styles.saveButton} onClick={submitAssign}>Назначить</button><button className={styles.cancelButton} onClick={() => setModalMode(null)}>Отмена</button></div>
                </>
              )}
              {modalMode === "status" && selectedOrder && (
                <>
                  <h2 className={styles.modalTitle}>Изменить статус</h2>
                  <p style={{ marginBottom: "1rem", color: "#6b7280", fontFamily: "Actay, Arial, sans-serif" }}>Заказ: {selectedOrder.fromCity} → {selectedOrder.toCity}</p>
                  <div className={styles.formGroup}><label className={styles.label}>Новый статус</label><select className={styles.select} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}><option value="">-- Выберите --</option>{(nextStatuses[selectedOrder.status] || []).map((s) => <option key={s} value={s}>{statusLabels[s]}</option>)}</select></div>
                  <div className={styles.modalButtons}><button className={styles.saveButton} onClick={submitStatus}>Сохранить</button><button className={styles.cancelButton} onClick={() => setModalMode(null)}>Отмена</button></div>
                </>
              )}
              {modalMode === "price" && selectedOrder && (
                <>
                  <h2 className={styles.modalTitle}>Установить точную цену</h2>
                  <p style={{ marginBottom: "1rem", color: "#6b7280", fontFamily: "Actay, Arial, sans-serif" }}>Заказ: {selectedOrder.fromCity} → {selectedOrder.toCity} ({selectedOrder.weight} т)</p>
                  <p style={{ marginBottom: "1rem", color: "#dc2626", fontFamily: "Actay, Arial, sans-serif", fontSize: "0.85rem" }}>После установки точной цены изменить её будет нельзя.</p>
                  <div className={styles.formGroup}><label className={styles.label}>Сумма (руб.)</label><input type="number" className={styles.select} value={editPrice} onChange={(e) => setEditPrice(e.target.value)} placeholder="Введите точную цену" /></div>
                  <div className={styles.modalButtons}><button className={styles.saveButton} onClick={submitPrice}>Установить цену</button><button className={styles.cancelButton} onClick={() => setModalMode(null)}>Отмена</button></div>
                </>
              )}
              {modalMode === "payment" && selectedOrder && (
                <>
                  <h2 className={styles.modalTitle}>Подтверждение оплаты</h2>
                  <p style={{ marginBottom: "1rem", color: "#6b7280", fontFamily: "Actay, Arial, sans-serif" }}>Заказ: {selectedOrder.fromCity} → {selectedOrder.toCity}</p>
                  <p style={{ marginBottom: "1rem", fontFamily: "Actay, Arial, sans-serif" }}>Сумма: <strong>{selectedOrder.price?.toLocaleString()} руб.</strong></p>
                  <p style={{ marginBottom: "1rem", color: "#dc2626", fontFamily: "Actay, Arial, sans-serif", fontSize: "0.85rem" }}>После подтверждения оплаты изменить будет нельзя.</p>
                  <div className={styles.modalButtons}><button className={styles.saveButton} onClick={() => submitPayment(true)}>Подтвердить оплату</button><button className={styles.cancelButton} onClick={() => setModalMode(null)}>Отмена</button></div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}