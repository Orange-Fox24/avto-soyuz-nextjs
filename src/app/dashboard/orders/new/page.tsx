// src/app/dashboard/orders/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AddressInput from "@/components/ui/AddressInput";
import styles from "./NewOrder.module.css";

export default function NewOrderPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fromCity: "",
    toCity: "",
    weight: "",
    cargoType: "Прочее",
    desiredDate: "",
    comment: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Заказ успешно создан!" });
        setFormData({ fromCity: "", toCity: "", weight: "", cargoType: "Прочее", desiredDate: "", comment: "" });
        setTimeout(() => router.push("/dashboard/orders"), 1500);
      } else {
        setMessage({ type: "error", text: data.error || "Ошибка создания заказа" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Произошла непредвиденная ошибка" });
    } finally {
      setLoading(false);
    }
  };

  const cargoTypes = ["Прочее", "Стройматериалы", "Оборудование", "Продукты", "Мебель", "Одежда", "Автозапчасти"];

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
          <h1 className={styles.title}>Новый заказ</h1>
          <p className={styles.subtitle}>Заполните данные для оформления заявки на перевозку</p>

          {message && (
            <div className={message.type === "success" ? styles.success : styles.error}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <AddressInput
                value={formData.fromCity}
                onChange={(val) => setFormData({ ...formData, fromCity: val })}
                placeholder="Начните вводить город отправки"
                required
                disabled={loading}
                label="Город отправки"
              />
              <AddressInput
                value={formData.toCity}
                onChange={(val) => setFormData({ ...formData, toCity: val })}
                placeholder="Начните вводить город назначения"
                required
                disabled={loading}
                label="Город назначения"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="weight">
                  Вес груза (тонн) <span className={styles.required}>*</span>
                </label>
                <input id="weight" name="weight" type="number" step="0.1" min="0.1" className={styles.input} placeholder="1.5" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} required disabled={loading} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="cargoType">Тип груза</label>
                <select id="cargoType" name="cargoType" className={styles.input} value={formData.cargoType} onChange={(e) => setFormData({ ...formData, cargoType: e.target.value })} disabled={loading}>
                  {cargoTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="desiredDate">Желаемая дата доставки</label>
              <input id="desiredDate" name="desiredDate" type="date" className={styles.input} value={formData.desiredDate} onChange={(e) => setFormData({ ...formData, desiredDate: e.target.value })} disabled={loading} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="comment">Комментарий</label>
              <textarea id="comment" name="comment" className={styles.textarea} placeholder="Дополнительная информация" value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })} disabled={loading} />
            </div>

            <div style={{
              background: "#f9fafb",
              borderRadius: "12px",
              padding: "1rem",
              fontFamily: "Actay, Arial, sans-serif",
            }}>
              <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "0.25rem" }}>
                Примерная стоимость (точную цену установит менеджер):
              </p>
              <p style={{ fontFamily: '"Wadik Bold", "Wadik", Arial, sans-serif', fontWeight: 700, fontSize: "1.5rem", color: "#ffa20c" }}>
                Рассчитывается при создании...
              </p>
              <p style={{ fontSize: "0.8rem", color: "#9ca3af", marginTop: "0.5rem" }}>
                Оплата производится по квитанции в офисе компании или по безналичному расчёту
              </p>
            </div>

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? "Создание заказа..." : "Создать заказ"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}