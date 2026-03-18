import Image from "next/image";
import styles from "./O-kompanii.module.css";

export default function OKompanii() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              О компании <span className={styles.companyName}>«АВТО-СОЮЗ»</span>
            </h1>
            <p className={styles.text}>
              <span className={styles.companyName}>«АВТО-СОЮЗ»</span> — надежный
              партнер в сфере грузоперевозок, работающий на российском рынке с
              2009 года. Мы специализируемся на предоставлении качественных
              транспортных услуг для малого и среднего бизнеса, сочетая
              индивидуальный подход с ответственностью за каждый груз.
            </p>
            <p className={styles.text}>
              Наша философия проста: честность, прозрачность и выполнение
              обязательств. Мы не обещаем невозможного, но гарантируем, что
              сделаем всё возможное для решения ваших логистических задач.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/truck-map.png"
              alt="Грузовик на фоне карты"
              fill
              className={styles.image}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
