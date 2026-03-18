"use client";

import { useEffect, useState } from "react";
import styles from "./admin.module.css";

interface Application {
  id: number;
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  message: string;
  from_city?: string;
  to_city?: string;
  topic?: string;
  experience?: string;
  status: string;
  created_at: string;
  source: string;
}

export default function AdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/get-applications");
      const data = await response.json();
      if (response.ok) {
        setApplications(data.applications);
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApps =
    filter === "all"
      ? applications
      : applications.filter((app) => app.source === filter);

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Админ-панель - Заявки</h1>

      <div className={styles.filters}>
        <button
          onClick={() => setFilter("all")}
          className={`${styles.filterBtn} ${filter === "all" ? styles.active : ""}`}
        >
          Все ({applications.length})
        </button>
        <button
          onClick={() => setFilter("main")}
          className={`${styles.filterBtn} ${filter === "main" ? styles.active : ""}`}
        >
          Главная ({applications.filter((a) => a.source === "main").length})
        </button>
        <button
          onClick={() => setFilter("contact")}
          className={`${styles.filterBtn} ${filter === "contact" ? styles.active : ""}`}
        >
          Контакты ({applications.filter((a) => a.source === "contact").length})
        </button>
        <button
          onClick={() => setFilter("partner")}
          className={`${styles.filterBtn} ${filter === "partner" ? styles.active : ""}`}
        >
          Партнеры ({applications.filter((a) => a.source === "partner").length})
        </button>
      </div>

      <div className={styles.applicationsGrid}>
        {filteredApps.map((app) => (
          <div key={`${app.source}-${app.id}`} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.source}>
                {app.source === "main"
                  ? "Главная"
                  : app.source === "contact"
                    ? "Контакты"
                    : "Партнеры"}
              </span>
              <span className={`${styles.status} ${styles[app.status]}`}>
                {app.status === "new"
                  ? "Новая"
                  : app.status === "in_progress"
                    ? "В работе"
                    : "Завершена"}
              </span>
            </div>

            <div className={styles.cardBody}>
              <p>
                <strong>Имя:</strong> {app.name}
              </p>
              {app.company && (
                <p>
                  <strong>Компания:</strong> {app.company}
                </p>
              )}
              {app.phone && (
                <p>
                  <strong>Телефон:</strong> {app.phone}
                </p>
              )}
              {app.email && (
                <p>
                  <strong>Email:</strong> {app.email}
                </p>
              )}

              {app.from_city && (
                <p>
                  <strong>Откуда:</strong> {app.from_city}
                </p>
              )}
              {app.to_city && (
                <p>
                  <strong>Куда:</strong> {app.to_city}
                </p>
              )}
              {app.topic && (
                <p>
                  <strong>Тема:</strong> {app.topic}
                </p>
              )}
              {app.experience && (
                <p>
                  <strong>Опыт:</strong> {app.experience}
                </p>
              )}

              <p>
                <strong>Сообщение:</strong> {app.message}
              </p>
              <p className={styles.date}>
                {new Date(app.created_at).toLocaleString("ru-RU")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
