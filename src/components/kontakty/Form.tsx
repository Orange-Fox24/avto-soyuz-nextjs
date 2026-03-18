"use client";

import { useState } from "react";
import Link from "next/link";
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Форма отправлена!");
  };

  return (
    <section className={styles.contactForm}>
      <div className={styles.container}>
        <div className={styles.formCard}>
          <h2 className={styles.title}>Форма обратной связи</h2>
          <p className={styles.subtitle}>
            Не нашли нужной информации? Отправьте ваш вопрос прямо с сайта, и
            наш менеджер свяжется с вами в течение 30 минут в рабочее время.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Первая строка - Имя и Компания */}
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
                />
              </div>
            </div>

            {/* Вторая строка - Телефон и Email */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Телефон <span className={styles.required}>*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (___) ___-__-__"
                  required
                  className={styles.input}
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
                />
              </div>
            </div>

            {/* Третья строка - Тема обращения */}
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
              />
            </div>

            {/* Большое поле для сообщения */}
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
              />
            </div>

            {/* Нижняя часть с соглашением и кнопкой */}
            <div className={styles.formFooter}>
              <p className={styles.agreement}>
                Нажимая кнопку «Отправить» Вы даете согласие на обработку Ваших
                персональных данных в соответствии с{" "}
                <Link href="/privacy-policy" className={styles.privacyLink}>
                  политикой конфиденциальности
                </Link>
              </p>
              <button type="submit" className={styles.submitButton}>
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
