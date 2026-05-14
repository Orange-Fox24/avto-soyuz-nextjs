// src/app/admin/vehicles/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Vehicles.module.css";

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  plateNumber: string;
  type: string;
  capacity: number;
  isAvailable: boolean;
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ brand: "", model: "", plateNumber: "", type: "Тент", capacity: "5" });

  const fetchVehicles = async () => {
    const res = await fetch("/api/admin/vehicles");
    const data = await res.json();
    setVehicles(data.vehicles || []);
    setLoading(false);
  };

  useEffect(() => { fetchVehicles(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowAdd(false);
    setForm({ brand: "", model: "", plateNumber: "", type: "Тент", capacity: "5" });
    fetchVehicles();
  };

  const toggleAvailability = async (id: string, current: boolean) => {
    await fetch("/api/admin/vehicles/toggle", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vehicleId: id, isAvailable: !current }),
    });
    fetchVehicles();
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

        <div className={styles.header}>
          <h1 className={styles.title}>Транспорт</h1>
          <button className={styles.addButton} onClick={() => setShowAdd(true)}>+ Добавить</button>
        </div>

        {vehicles.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Марка</th>
                  <th>Модель</th>
                  <th>Госномер</th>
                  <th>Тип</th>
                  <th>Грузоподъёмность (т)</th>
                  <th>Статус</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v, i) => (
                  <tr key={v.id}>
                    <td>{i + 1}</td>
                    <td>{v.brand}</td>
                    <td>{v.model}</td>
                    <td>{v.plateNumber}</td>
                    <td>{v.type}</td>
                    <td>{v.capacity}</td>
                    <td>
                      <span className={`${styles.status} ${v.isAvailable ? styles.available : styles.unavailable}`}>
                        {v.isAvailable ? "Доступен" : "Недоступен"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleAvailability(v.id, v.isAvailable)}
                        style={{
                          fontFamily: '"Wadik Bold", "Wadik", Arial, Helvetica, sans-serif',
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          padding: "0.35rem 0.75rem",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          background: v.isAvailable ? "#ef4444" : "#22c55e",
                          color: "#fff",
                        }}
                      >
                        {v.isAvailable ? "Отключить" : "Включить"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ fontFamily: "Actay, Arial, sans-serif", color: "#6b7280" }}>Нет добавленного транспорта</p>
        )}

        {showAdd && (
          <div className={styles.modalOverlay} onClick={() => setShowAdd(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h2 className={styles.modalTitle}>Добавить транспорт</h2>
              <form onSubmit={handleAdd}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Марка</label>
                  <input className={styles.input} value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Модель</label>
                  <input className={styles.input} value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Госномер</label>
                  <input className={styles.input} value={form.plateNumber} onChange={(e) => setForm({ ...form, plateNumber: e.target.value })} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Тип кузова</label>
                  <select className={styles.input} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    <option>Тент</option>
                    <option>Рефрижератор</option>
                    <option>Открытая платформа</option>
                    <option>Манипулятор</option>
                    <option>Гидроборт</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Грузоподъёмность (т)</label>
                  <input className={styles.input} type="number" step="0.1" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
                </div>
                <div className={styles.modalButtons}>
                  <button type="submit" className={styles.saveButton}>Добавить</button>
                  <button type="button" className={styles.cancelButton} onClick={() => setShowAdd(false)}>Отмена</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}