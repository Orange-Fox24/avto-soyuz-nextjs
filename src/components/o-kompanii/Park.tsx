import Image from "next/image";
import styles from "./Park.module.css";

export default function Park() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h2 className={styles.title}>Наш автопарк</h2>
            <p className={styles.text}>
              Собственный и партнерский транспортный парк, подобранный под
              разные задачи
            </p>
            <ul className={styles.bulletList}>
              <li className={styles.bulletItem}>
                <span className={styles.highlight}>Тентованные фуры</span> 20-40
                тонн для перевозок по России
              </li>
              <li className={styles.bulletItem}>
                <span className={styles.highlight}>
                  Газели и среднетоннажные
                </span>{" "}
                автомобили для доставки по городам и областям
              </li>
              <li className={styles.bulletItem}>
                <span className={styles.highlight}>Манипуляторы</span> для
                грузов, требующих особых условий погрузки
              </li>
              <li className={styles.bulletItem}>
                <span className={styles.highlight}>Рефрижераторы</span> для
                температурно-чувствительных товаров
              </li>
            </ul>
            <p className={styles.text}>
              Все транспортные средства регулярно проходят техническое
              обслуживание и оснащены системами GPS-мониторинга.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/fleet.png"
              alt="Автопарк АВТО-СОЮЗ"
              fill
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
