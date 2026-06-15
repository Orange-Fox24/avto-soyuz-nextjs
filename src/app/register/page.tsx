// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PhoneInput from "@/components/ui/PhoneInput";
import styles from "../login/Login.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("CLIENT");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ошибка регистрации");
      } else {
        router.push("/login?registered=true");
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
        <h1 className={styles.title}>Регистрация</h1>
        <p className={styles.subtitle}>
          Создайте аккаунт для доступа к личному кабинету
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Имя</label>
            <input
              id="name"
              type="text"
              className={styles.input}
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

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

          <div className={styles.formGroup}>
            <PhoneInput
              value={phone}
              onChange={setPhone}
              placeholder="+7 (___) ___-__-__"
              label="Телефон"
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="Минимум 6 символов"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="role">Роль</label>
            <select
              id="role"
              className={styles.input}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            >
              <option value="CLIENT">Клиент</option>
              <option value="DRIVER">Водитель</option>
            </select>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        <p className={styles.bottomText}>
          Уже есть аккаунт?{" "}
          <Link href="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}