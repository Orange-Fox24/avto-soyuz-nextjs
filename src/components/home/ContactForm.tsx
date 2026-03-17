"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    fromCity: "",
    toCity: "",
    phone: "",
    email: "",
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
          <h2 className={styles.title}>Вопрос по услугам</h2>
          <p className={styles.subtitle}>
            Если у вас остались вопросы - заполните заявку.
            <br />
            Мы свяжемся с вами и расскажем подробные условия.
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

            {/* Вторая строка - Город отправки и Город доставки */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Город отправки <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <div className={styles.iconInput}>
                    <Image
                      src="/icons/location-marker.svg"
                      alt="location"
                      width={20}
                      height={20}
                    />
                  </div>
                  <input
                    type="text"
                    name="fromCity"
                    value={formData.fromCity}
                    onChange={handleChange}
                    placeholder="Укажите город отправки"
                    required
                    className={`${styles.input} ${styles.inputWithIcon}`}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Город доставки</label>
                <div className={styles.inputWrapper}>
                  <div className={styles.iconInput}>
                    <Image
                      src="/icons/location-marker.svg"
                      alt="location"
                      width={20}
                      height={20}
                    />
                  </div>
                  <input
                    type="text"
                    name="toCity"
                    value={formData.toCity}
                    onChange={handleChange}
                    placeholder="Укажите город доставки"
                    className={`${styles.input} ${styles.inputWithIcon}`}
                  />
                </div>
              </div>
            </div>

            {/* Третья строка - Телефон и Email */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (___) ___-__-__"
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
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
                <Link
                  href="/public/privacy-policy"
                  className={styles.privacyLink}
                >
                  политикой конфиденциальности
                </Link>
              </p>
              <button type="submit" className={styles.submitButton}>
                Отправить
              </button>
            </div>
          </form>
        </div>

        {/* Текст снизу */}
        <div className={styles.bottomText}>
          <p>
            Организация автомобильных грузоперевозок — ресурсоемкий вид
            деятельности. Однако мало какой вид бизнеса может обойтись без
            транспортных перевозок. Юридические лица, предприниматели
            предпочитают заказывать логистические услуги в компании,
            специализирующейся в данной сфере. Это более выгодно, нежели
            содержать штатный отдел логистики.
          </p>
        </div>
      </div>
    </section>
  );
}
