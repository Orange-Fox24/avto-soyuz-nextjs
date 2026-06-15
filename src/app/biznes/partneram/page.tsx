"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import PhoneInput from "@/components/ui/PhoneInput";
import styles from "./Partneram.module.css";

export default function PartneramPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    experience: "",
    message: "",
  });

  const { submitForm, isSubmitting, error, success } = useFormSubmit(
    "partner",
    {
      onSuccess: () => {
        setFormData({
          name: "",
          company: "",
          phone: "",
          email: "",
          experience: "",
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
    <div className={styles.page}>
      {/* Фоновая полупрозрачная иконка */}
      <div className={styles.backgroundIcon}>
        <Image
          src="/icons/partners.svg"
          alt=""
          width={800}
          height={800}
          className={styles.icon}
          aria-hidden="true"
        />
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>Станьте партнером «АВТО-СОЮЗ»</h1>

        <div className={styles.leftColumn}>
          {/* Формы сотрудничества */}
          <section className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Формы сотрудничества</h2>

            <div className={styles.infoBlock}>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.highlight}>Агентская программа</span>{" "}
                  — получайте комиссию 7-15% за привлеченных клиентов
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.highlight}>Франшиза</span> — работайте
                  под нашим брендом с полной поддержкой
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.highlight}>White Label</span> — наши
                  услуги под вашим брендом
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.highlight}>
                    Стратегическое партнерство
                  </span>{" "}
                  — совместные проекты и интеграции
                </li>
              </ul>
            </div>
          </section>

          <div className={styles.serviceDivider} />

          {/* Преимущества партнерства */}
          <section className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Преимущества партнерства</h2>

            <div className={styles.infoBlock}>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  Стабильные выплаты и бонусы
                </li>
                <li className={styles.bulletItem}>
                  Готовые рекламные материалы
                </li>
                <li className={styles.bulletItem}>Обучение и поддержка 24/7</li>
                <li className={styles.bulletItem}>
                  Доступ к CRM и IT-системам
                </li>
                <li className={styles.bulletItem}>Юридическое сопровождение</li>
              </ul>
            </div>
          </section>

          <div className={styles.serviceDivider} />

          {/* Что мы ищем */}
          <section className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Что мы ищем</h2>

            <div className={styles.infoBlock}>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>Транспортные компании</li>
                <li className={styles.bulletItem}>Экспедиторские фирмы</li>
                <li className={styles.bulletItem}>
                  Производственные предприятия
                </li>
                <li className={styles.bulletItem}>Логистические операторы</li>
                <li className={styles.bulletItem}>
                  Индивидуальных предпринимателей
                </li>
              </ul>
            </div>
          </section>

          <div className={styles.serviceDivider} />

          {/* Форма "Стать партнером" */}
          <section className={styles.formSection}>
            <h2 className={styles.formTitle}>Стать партнером</h2>
            <p className={styles.formSubtitle}>
              Краткая форма для начала сотрудничества. Рассмотрение заявки — 1-2
              рабочих дня.
            </p>

            {/* Сообщения об успехе/ошибке */}
            {success && (
              <div className={styles.successMessage}>
                Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее
                время.
              </div>
            )}

            {error && <div className={styles.errorMessage}>{error}</div>}

            <div className={styles.formCard}>
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

                {/* Вторая строка - Телефон и Email */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Телефон <span className={styles.required}>*</span>
                    </label>
                    <PhoneInput
                      value={formData.phone}
                      onChange={(val) => setFormData({ ...formData, phone: val })}
                      placeholder="+7 (___) ___-__-__"
                      required
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

                {/* Третья строка - Опыт в логистике */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Опыт в логистике <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Укажите ваш опыт работы в логистике"
                    required
                    className={styles.input}
                    disabled={isSubmitting}
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
                    placeholder="Кратко расскажите о вашей компании и предложении"
                    required
                    className={styles.textarea}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Нижняя часть с соглашением и кнопкой */}
                <div className={styles.formFooter}>
                  <p className={styles.agreement}>
                    Нажимая кнопку «Отправить» Вы даете согласие на обработку
                    Ваших персональных данных в соответствии с{" "}
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
          </section>
        </div>
      </div>
    </div>
  );
}