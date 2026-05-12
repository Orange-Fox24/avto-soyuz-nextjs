// src/app/dashboard/profile/ProfileClient.tsx
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
}

export default function ProfileClient({ user }: { user: UserData }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || "");
  const [displayName, setDisplayName] = useState(user.name);
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
        body: JSON.stringify({ name, phone }),
      });

      const data = await res.json();

      if (res.ok) {
        setDisplayName(name);
        setDisplayPhone(phone);
        setMessage({ type: "success", text: "Профиль успешно обновлён!" });
        setIsEditing(false);
        router.refresh();
      } else {
        setMessage({ type: "error", text: data.error || "Ошибка обновления" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Произошла непредвиденная ошибка" });
    } finally {
      setLoading(false);
    }
  };

  const roleLabels: Record<string, string> = {
    CLIENT: "Клиент",
    MANAGER: "Менеджер",
    DRIVER: "Водитель",
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/dashboard" className={styles.backLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Назад в личный кабинет
        </Link>

        <div className={styles.card}>
          <h1 className={styles.title}>Профиль</h1>
          <p className={styles.subtitle}>Ваши личные данные и роль в системе</p>

          {message && (
            <div className={message.type === "success" ? styles.success : styles.error}>
              {message.text}
            </div>
          )}

          {!isEditing ? (
            <>
              <div className={styles.infoBlock}>
                <p className={styles.infoLabel}>Имя</p>
                <p className={styles.infoValue}>{displayName || "Не указано"}</p>
              </div>

              <div className={styles.infoBlock}>
                <p className={styles.infoLabel}>Email</p>
                <p className={styles.infoValue}>{user.email}</p>
                <p className={styles.infoHint}>Email изменить нельзя</p>
              </div>

              <div className={styles.infoBlock}>
                <p className={styles.infoLabel}>Телефон для связи</p>
                <p className={styles.infoValue}>{displayPhone || "Не указан"}</p>
              </div>

              <div className={styles.infoBlock}>
                <p className={styles.infoLabel}>Роль</p>
                <span className={styles.roleBadge}>{roleLabels[user.role] || user.role}</span>
              </div>

              <hr className={styles.divider} />

              <div className={styles.infoBlock}>
                <p className={styles.infoLabel}>Мои реквизиты</p>
                <p className={styles.infoValue} style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                  Для выставления счетов и закрывающих документов
                </p>
              </div>

              <button className={styles.saveButton} onClick={() => setIsEditing(true)}>
                Редактировать
              </button>
            </>
          ) : (
            <>
              <form onSubmit={handleSave} className={styles.form}>
                <h2 className={styles.formTitle}>Редактирование профиля</h2>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="name">Имя</label>
                  <input
                    id="name"
                    type="text"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    className={styles.input}
                    value={user.email}
                    disabled
                    style={{ opacity: 0.6, cursor: "not-allowed", backgroundColor: "#f9fafb" }}
                  />
                  <p className={styles.infoHint}>Email изменить нельзя</p>
                </div>

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
                    onClick={() => {
                      setIsEditing(false);
                      setName(displayName);
                      setPhone(displayPhone);
                      setMessage(null);
                    }}
                    disabled={loading}
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}