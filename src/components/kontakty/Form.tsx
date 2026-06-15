"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import PhoneInput from "@/components/ui/PhoneInput";
import styles from "./Form.module.css";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    topic: "",
    message: "",
  });

  const { submitForm, isSubmitting, error, success } = useFormSubmit(
    "contact",
    {
      onSuccess: () => {
        setFormData({
          name: "",
          company: "",
          phone: "",
          email: "",
          topic: "",
          message: "",
        });
      },
    },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(formData);
  };

  return (
    <section className={styles.contactForm}>
      <div className={styles.container}>
        <div className={styles.formCard}>
          <h2 className={styles.title}>Форма обратной связи</h2>
          <p className={styles.subtitle}>
            Не нашли нужной информации? Отправьте ваш вопрос прямо с сайта, и наш
            менеджер свяжется с вами в течение 30 минут в рабочее время.
          </p>

          {success && (
            <div className={styles.successMessage}>
              Спасибо! Ваш вопрос отправлен. Мы свяжемся с вами в ближайшее время.
            </div>
          )}

          {error && <div className={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Ваше имя <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Укажите ваше имя"
                  required
                  className={styles.input}
                  disabled={isSubmitting}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Компания</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Укажите вашу компанию"
                  className={styles.input}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Телефон</label>
                <PhoneInput
                  value={formData.phone}
                  onChange={(val) => setFormData({ ...formData, phone: val })}
                  placeholder="+7 (___) ___-__-__"
                  disabled={isSubmitting}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.ru"
                  className={styles.input}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Тема обращения <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="Укажите тему обращения"
                required
                className={styles.input}
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Сообщение <span className={styles.required}>*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Ваше сообщение"
                required
                className={styles.textarea}
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formFooter}>
              <p className={styles.agreement}>
                Нажимая кнопку «Отправить» Вы даете согласие на обработку Ваших
                персональных данных в соответствии с{" "}
                <Link href="/privacy-policy" className={styles.privacyLink}>
                  политикой конфиденциальности
                </Link>
              </p>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : "Отправить"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}