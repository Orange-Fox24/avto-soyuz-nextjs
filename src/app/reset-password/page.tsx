// src/app/reset-password/page.tsx
"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import PasswordInput from "@/components/ui/PasswordInput";
import styles from "../forgot-password/ForgotPassword.module.css";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Пароль успешно изменён! Сейчас вы будете перенаправлены на вход." });
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMessage({ type: "error", text: data.error || "Ошибка" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Произошла ошибка" });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>Ошибка</h1>
          <p className={styles.subtitle}>Недействительная ссылка для восстановления пароля.</p>
          <p className={styles.bottomText}>
            <Link href="/forgot-password" className={styles.link}>← Запросить новую ссылку</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Новый пароль</h1>
        <p className={styles.subtitle}>
          Придумайте новый пароль для {email}
        </p>

        {message && (
          <div className={message.type === "success" ? styles.success : styles.error}>
            {message.text}
          </div>
        )}

        {!message || message.type === "error" ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <PasswordInput
              value={password}
              onChange={setPassword}
              placeholder="Минимум 8 символов"
              required
              disabled={loading}
              showValidation={true}
            />

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? "Сохранение..." : "Сохранить пароль"}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}