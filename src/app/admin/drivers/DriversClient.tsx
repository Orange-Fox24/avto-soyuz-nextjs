// src/app/admin/drivers/DriversClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Drivers.module.css";

interface Driver {
  id: string;
  name: string;
  email: string;
  isOnLeave: boolean;
  activeOrders: number;
}

export default function DriversClient({ drivers }: { drivers: Driver[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const toggleLeave = async (driver: Driver) => {
    const action = driver.isOnLeave ? "вернуть с отпуска" : "отправить в отпуск";
    if (!window.confirm(`${action} водителя "${driver.name}"?`)) return;

    setLoading(driver.id);
    try {
      await fetch("/api/admin/drivers/toggle-leave", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driverId: driver.id }),
      });
      router.refresh();
    } catch (err) {
      console.error("Ошибка:", err);
    } finally {
      setLoading(null);
    }
  };

  if (drivers.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2 className={styles.emptyTitle}>Нет водителей</h2>
        <p className={styles.emptyText}>Зарегистрированные водители появятся здесь</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>№</th>
            <th>Имя</th>
            <th>Email</th>
            <th>Активных заказов</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => (
            <tr key={driver.id} style={{ opacity: driver.isOnLeave ? 0.6 : 1 }}>
              <td>{index + 1}</td>
              <td>{driver.name || "Без имени"}</td>
              <td>{driver.email}</td>
              <td>{driver.activeOrders}</td>
              <td>
                {driver.isOnLeave ? (
                  <span className={`${styles.status}`} style={{ backgroundColor: "#fef3c7", color: "#92400e" }}>
                    В отпуске
                  </span>
                ) : (
                  <span className={`${styles.status} ${driver.activeOrders === 0 ? styles.free : styles.busy}`}>
                    {driver.activeOrders === 0 ? "Свободен" : "Занят"}
                  </span>
                )}
              </td>
              <td>
                <button
                  onClick={() => toggleLeave(driver)}
                  disabled={loading === driver.id}
                  style={{
                    fontFamily: '"Wadik Bold", "Wadik", Arial, Helvetica, sans-serif',
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    padding: "0.35rem 0.75rem",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    backgroundColor: driver.isOnLeave ? "#22c55e" : "#f59e0b",
                    color: "#fff",
                  }}
                >
                  {loading === driver.id ? "..." : driver.isOnLeave ? "Вернуть" : "В отпуск"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}