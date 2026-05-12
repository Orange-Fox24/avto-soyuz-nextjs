// src/app/login/page.tsx
'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./Login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const registered = searchParams.get("registered");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        const role = sessionData?.user?.role;

        if (role === "MANAGER") {
          router.push("/admin");
        } else if (role === "DRIVER") {
          router.push("/driver");
        } else {
          router.push("/dashboard");
        }
        router.refresh();
      }
    } catch (err) {
      setError("Произошла непредвиденная ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Вход в личный кабинет</h1>
        <p className={styles.subtitle}>
          Войдите для доступа к заказам и отслеживанию
        </p>

        {registered && (
          <div className={styles.error} style={{ backgroundColor: "#d4edda", color: "#155724", border: "1px solid #c3e6cb" }}>
            Регистрация успешна! Теперь вы можете войти.
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
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

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div style={{ textAlign: "right", marginTop: "-0.5rem" }}>
            <Link href="/forgot-password" className={styles.link}>
              Забыли пароль?
            </Link>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        <p className={styles.bottomText}>
          Нет аккаунта?{" "}
          <Link href="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}