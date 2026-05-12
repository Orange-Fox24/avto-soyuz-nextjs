// src/app/forgot-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ForgotPassword.module.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: "Ссылка для восстановления пароля отправлена на ваш email. Проверьте почту.",
        });
        setEmail("");
      } else {
        setMessage({ type: "error", text: data.error || "Ошибка отправки" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Произошла ошибка. Попробуйте позже." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Забыли пароль?</h1>
        <p className={styles.subtitle}>
          Введите email, указанный при регистрации, и мы отправим вам ссылку для восстановления пароля.
        </p>

        {message && (
          <div className={message.type === "success" ? styles.success : styles.error}>
            {message.text}
          </div>
        )}

        {!message || message.type === "error" ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Отправка..." : "Отправить ссылку"}
            </button>
          </form>
        ) : null}

        <p className={styles.bottomText}>
          <Link href="/login" className={styles.link}>
            ← Вернуться ко входу
          </Link>
        </p>
      </div>
    </div>
  );
}