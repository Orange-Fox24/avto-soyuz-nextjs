import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Контакт с руководством</h2>
          <p className={styles.text}>
            Мы всегда открыты для диалога. Генеральный директор{" "}
            <span className={styles.director}>Щенев Виталий Валерьевич</span>{" "}
            лично контролирует качество услуг и доступен для решения сложных
            вопросов.
          </p>
          <p className={styles.quote}>
            «АВТО-СОЮЗ» — это компания, где ценят клиентов и выполняют обещания.
            Мы не гигант логистики, но мы точно знаем, как сделать ваши
            перевозки безопасными, выгодными и предсказуемыми.
          </p>
        </div>
      </div>
    </section>
  );
}
