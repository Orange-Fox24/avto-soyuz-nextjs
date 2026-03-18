import Image from "next/image";
import Link from "next/link";
import styles from "./Special.module.css";

export default function SpecialPage() {
  return (
    <div className={styles.page}>
      {/* Фоновая полупрозрачная иконка */}
      <div className={styles.backgroundIcon}>
        <Image
          src="/icons/special.svg"
          alt=""
          width={800}
          height={800}
          className={styles.icon}
          aria-hidden="true"
        />
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>Специальные предложения и акции</h1>

        <div className={styles.leftColumn}>
          {/* Акция «Первая перевозка» */}
          <section className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Акция «Первая перевозка»</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Скидка 15% на первый заказ
              </span>
            </p>

            <div className={styles.infoBlock}>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  Для новых клиентов компании
                </li>
                <li className={styles.bulletItem}>
                  Действует на все виды грузоперевозок
                </li>
                <li className={styles.bulletItem}>
                  Минимальная сумма заказа: 3000 ₽
                </li>
                <li className={styles.bulletItem}>Срок действия: бессрочно</li>
              </ul>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Как получить:</span>
              <p className={styles.text}>
                При оформлении заказа сообщите менеджеру кодовое слово{" "}
                <span className={styles.codeWord}>«ПЕРВЫЙ15»</span>
              </p>
            </div>
          </section>

          <div className={styles.serviceDivider} />

          {/* Сезонная акция «Сибирский экспресс» */}
          <section className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>
              Сезонная акция «Сибирский экспресс»
            </h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Ускоренная доставка по Сибири по цене обычной
              </span>
            </p>

            <div className={styles.infoBlock}>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.highlight}>
                    Действует на направления:
                  </span>{" "}
                  Красноярск → Новосибирск, Иркутск, Томск
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.highlight}>
                    Срок доставки сокращен на 30%
                  </span>
                </li>
                <li className={styles.bulletItem}>Цена остается стандартной</li>
                <li className={styles.bulletItem}>
                  <span className={styles.highlight}>Период действия:</span> с 1
                  октября 2025 по 31 марта 2026
                </li>
              </ul>
            </div>
          </section>

          <div className={styles.serviceDivider} />

          {/* Важная информация */}
          <section className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Важная информация</h2>

            <div className={styles.infoBlock}>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.highlight}>Акции не суммируются</span>{" "}
                  (действует одна наибольшая скидка)
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.highlight}>
                    Действуют при полной оплате
                  </span>{" "}
                  согласно условиям акции
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.highlight}>
                    Требуют предварительного согласования
                  </span>{" "}
                  с менеджером
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.highlight}>
                    Компания оставляет за собой право
                  </span>{" "}
                  изменить условия акций
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.highlight}>
                    Текущие акции всегда отображены
                  </span>{" "}
                  в личном кабинете на сайте
                </li>
              </ul>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.text}>
                Следите за новыми акциями в наших соцсетях и на сайте!
              </p>
              <p className={styles.text}>
                <span className={styles.highlight}>
                  Все предложения актуальны на 2026 год
                </span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
