import Link from "next/link";
import Image from "next/image";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      {/* Фоновая полупрозрачная иконка */}
      <div className={styles.backgroundIcon}>
        <Image
          src="/icons/truck.svg"
          alt=""
          width={800}
          height={800}
          className={styles.icon}
          aria-hidden="true"
        />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Страница не найдена</h2>

          <div className={styles.divider} />

          <p className={styles.text}>
            Возможно, страница была удалена или вы перешли по неверной ссылке.
          </p>

          <p className={styles.text}>
            Но не волнуйтесь, наши грузовики всегда найдут дорогу!
          </p>

          <div className={styles.buttons}>
            <Link href="/" className={styles.primaryButton}>
              Вернуться на главную
            </Link>
            <Link href="/services" className={styles.secondaryButton}>
              Наши услуги
            </Link>
          </div>

          <div className={styles.contacts}>
            <p className={styles.contactsText}>Или свяжитесь с нами:</p>
            <a href="tel:+79831638209" className={styles.phone}>
              +7 983 163 82 09
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
