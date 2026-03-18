import Image from "next/image";
import styles from "./Team.module.css";

export default function Team() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/team.png"
              alt="Команда АВТО-СОЮЗ"
              fill
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>Наша команда</h2>
            <p className={styles.text}>
              <span className={styles.highlight}>85 профессионалов</span>,
              которые знают свое дело. Наши водители — с опытом от 5 лет,
              менеджеры — с глубоким пониманием логистики, диспетчеры — с
              вниманием к деталям.
            </p>
            <p className={styles.text}>
              Мы гордимся тем, что многие сотрудники работают с нами с первых
              лет существования компании, что гарантирует стабильность и
              преемственность качества.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
