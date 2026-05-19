// src/app/admin/applications/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Applications.module.css";

type TabType = "main" | "contact" | "partner";

const tabLabels: Record<TabType, string> = {
  main: "Заявки на перевозку",
  contact: "Обратная связь",
  partner: "Партнёрам",
};

export default function ApplicationsPage() {
  const [tab, setTab] = useState<TabType>("main");
  const [data, setData] = useState<any>({ main: [], contact: [], partner: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/applications")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className={styles.page}><div className={styles.container}>Загрузка...</div></div>;

  const currentData = data[tab] || [];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/admin" className={styles.backLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Назад в панель менеджера
        </Link>

        <h1 className={styles.title}>Заявки с сайта</h1>

        {/* Вкладки */}
        <div className={styles.tabs}>
          {(["main", "contact", "partner"] as TabType[]).map((t) => (
            <button
              key={t}
              className={`${styles.tab} ${tab === t ? styles.tabActive : ""}`}
              onClick={() => setTab(t)}
            >
              {tabLabels[t]} ({data[t]?.length || 0})
            </button>
          ))}
        </div>

        {/* Таблица */}
        {currentData.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Имя</th>
                  <th>Компания</th>
                  <th>Телефон</th>
                  <th>Email</th>
                  {tab === "main" && <><th>Откуда</th><th>Куда</th></>}
                  {tab === "contact" && <th>Тема</th>}
                  <th>Сообщение</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item: any, index: number) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.company || "—"}</td>
                    <td>{item.phone || "—"}</td>
                    <td>{item.email || "—"}</td>
                    {tab === "main" && (
                      <>
                        <td>{item.from_city || "—"}</td>
                        <td>{item.to_city || "—"}</td>
                      </>
                    )}
                    {tab === "contact" && <td>{item.topic || "—"}</td>}
                    <td style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.message}
                    </td>
                    <td>{item.created_at ? new Date(item.created_at).toLocaleDateString("ru-RU") : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>Нет заявок</div>
        )}
      </div>
    </div>
  );
}