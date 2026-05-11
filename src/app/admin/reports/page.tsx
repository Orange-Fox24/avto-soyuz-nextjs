// src/app/admin/reports/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Reports.module.css";

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

export default function ReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/reports");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Ошибка загрузки отчётов:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.loading}>Загрузка отчётов...</p>
        </div>
      </div>
    );
  }

  if (!data || data.error) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.loading}>Ошибка загрузки данных</p>
        </div>
      </div>
    );
  }

  const { stats, topDrivers, recentOrders } = data;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/admin" className={styles.backLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Назад в панель менеджера
        </Link>

        <h1 className={styles.title}>Отчёты</h1>

        {/* Статистика */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </div>
            <p className={styles.statValue}>{stats.totalOrders}</p>
            <p className={styles.statLabel}>Всего заказов</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className={styles.statValue}>{stats.newOrders}</p>
            <p className={styles.statLabel}>Новых</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <p className={styles.statValue}>{stats.inProgress}</p>
            <p className={styles.statLabel}>В работе</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className={styles.statValue}>{stats.delivered}</p>
            <p className={styles.statLabel}>Доставлено</p>
          </div>
        </div>

        {/* Последние заказы */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Последние заказы</h2>
          {recentOrders.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Откуда</th>
                    <th>Куда</th>
                    <th>Вес (т)</th>
                    <th>Статус</th>
                    <th>Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order: any, index: number) => (
                    <tr key={order.id}>
                      <td>{index + 1}</td>
                      <td>{order.fromCity}</td>
                      <td>{order.toCity}</td>
                      <td>{order.weight}</td>
                      <td>
                        <span className={`${styles.status} ${statusStyles[order.status] || ""}`}>
                          {statusLabels[order.status] || order.status}
                        </span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString("ru-RU")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className={styles.loading}>Заказов пока нет</p>
          )}
        </div>

        {/* Топ водителей */}
        {topDrivers.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Топ водителей</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Водитель</th>
                    <th>Выполнено заказов</th>
                  </tr>
                </thead>
                <tbody>
                  {topDrivers.map((d: any, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{d.name}</td>
                      <td>{d.completed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}