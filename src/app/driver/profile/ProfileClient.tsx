// src/app/driver/profile/ProfileClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./Profile.module.css";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  isOnLeave: boolean;
}

export default function ProfileClient({ user }: { user: UserData }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(user.phone || "");
  const [displayPhone, setDisplayPhone] = useState(user.phone || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: user.name, phone }),
      });

      const data = await res.json();

      if (res.ok) {
        setDisplayPhone(phone);
        setMessage({ type: "success", text: "Номер телефона обновлён!" });
        setIsEditing(false);
        router.refresh();
      } else {
        setMessage({ type: "error", text: data.error || "Ошибка обновления" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Ошибка" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/driver" className={styles.backLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Назад к рейсам
        </Link>

        <div className={styles.card}>
          <h1 className={styles.title}>Профиль водителя</h1>
          <p className={styles.subtitle}>Личные данные и контактная информация</p>

          {message && (
            <div className={message.type === "success" ? styles.success : styles.success} style={message.type === "error" ? { backgroundColor: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb" } : {}}>
              {message.text}
            </div>
          )}

          {/* Имя — нельзя менять */}
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>Имя</p>
            <p className={styles.infoValue}>{user.name || "Не указано"}</p>
            <p className={styles.infoHint}>Имя может изменить только менеджер</p>
          </div>

          {/* Email — нельзя менять */}
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>Email</p>
            <p className={styles.infoValue}>{user.email}</p>
            <p className={styles.infoHint}>Email изменить нельзя</p>
          </div>

          {/* Телефон — можно менять */}
          {!isEditing ? (
            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Телефон для связи</p>
              <p className={styles.infoValue}>{displayPhone || "Не указан"}</p>
              <button className={styles.saveButton} onClick={() => setIsEditing(true)}>
                {displayPhone ? "Изменить номер" : "Добавить номер"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="phone">Телефон для связи</label>
                <input
                  id="phone"
                  type="tel"
                  className={styles.input}
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className={styles.buttons}>
                <button type="submit" className={styles.saveButton} disabled={loading}>
                  {loading ? "Сохранение..." : "Сохранить"}
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => { setIsEditing(false); setPhone(displayPhone); setMessage(null); }}
                  disabled={loading}
                >
                  Отмена
                </button>
              </div>
            </form>
          )}

          <hr className={styles.divider} />

          {/* Роль */}
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>Роль</p>
            <span className={styles.roleBadge}>Водитель</span>
          </div>

          {/* Статус */}
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>Статус</p>
            <span className={styles.roleBadge} style={user.isOnLeave ? { backgroundColor: "#fef3c7", color: "#92400e" } : { backgroundColor: "#d1fae5", color: "#065f46" }}>
              {user.isOnLeave ? "В отпуске" : "Доступен"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}