import styles from "./Info.module.css";

export default function Info() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Контакты «АВТО-СОЮЗ»</h1>
        <p className={styles.subtitle}>
          Свяжитесь с нами удобным для вас способом. Мы всегда готовы обсудить
          ваши задачи по перевозкам и предложить оптимальное решение.
        </p>

        <div className={styles.infoGrid}>
          {/* Основные контакты */}
          <div className={styles.infoCard}>
            <h2 className={styles.cardTitle}>Основные контакты «АВТО-СОЮЗ»</h2>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Красноярск:</span>
              <a href="tel:+79831638209" className={styles.contactValue}>
                +7 983 163 82 09
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Режим работы:</span>
              <span className={styles.contactValue}>
                с 10:00 до 18:00 (понедельник-пятница)
              </span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Общий email:</span>
              <a
                href="mailto:info@avto-soyuz.ru"
                className={styles.contactValue}
              >
                info@avto-soyuz.ru
              </a>
            </div>
          </div>

          {/* Специалисты поддержки */}
          <div className={styles.infoCard}>
            <h2 className={styles.cardTitle}>Специалисты поддержки</h2>

            <div className={styles.specialistItem}>
              <div className={styles.specialistName}>Алена Ревяшкина</div>
              <div className={styles.specialistRole}>
                (техническая поддержка)
              </div>
              <div className={styles.specialistContacts}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Телефон:</span>
                  <a href="tel:+79994441452" className={styles.contactValue}>
                    +7 (999) 444-14-52
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Email:</span>
                  <a
                    href="mailto:rev@avto-soyuz.ru"
                    className={styles.contactValue}
                  >
                    rev@avto-soyuz.ru
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.specialistItem}>
              <div className={styles.specialistName}>Ольга Буйдакова</div>
              <div className={styles.specialistRole}>(клиентский сервис)</div>
              <div className={styles.specialistContacts}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Телефон:</span>
                  <a href="tel:+79994441422" className={styles.contactValue}>
                    +7 (999) 444-14-22
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Email:</span>
                  <a
                    href="mailto:by@avto-soyuz.ru"
                    className={styles.contactValue}
                  >
                    by@avto-soyuz.ru
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.specialistItem}>
              <div className={styles.specialistName}>Алексей Антипов</div>
              <div className={styles.specialistRole}>(логистика)</div>
              <div className={styles.specialistContacts}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Телефон:</span>
                  <a href="tel:+79994443142" className={styles.contactValue}>
                    +7 (999) 444-31-42
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Email:</span>
                  <a
                    href="mailto:an@avto-soyuz.ru"
                    className={styles.contactValue}
                  >
                    an@avto-soyuz.ru
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Коммерческий отдел и адреса */}
          <div className={styles.infoCard}>
            <h2 className={styles.cardTitle}>Коммерческий отдел</h2>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Email:</span>
              <a
                href="mailto:sales@avto-soyuz.ru"
                className={styles.contactValue}
              >
                sales@avto-soyuz.ru
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Контактное лицо:</span>
              <span className={styles.contactValue}>Кирилл Макаров</span>
            </div>

            <h2 className={`${styles.cardTitle} ${styles.marginTop}`}>
              Отдел логистики
            </h2>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Email:</span>
              <a
                href="mailto:logistics@avto-soyuz.ru"
                className={styles.contactValue}
              >
                logistics@avto-soyuz.ru
              </a>
            </div>

            <h2 className={`${styles.cardTitle} ${styles.marginTop}`}>
              Адреса
            </h2>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>
                Юридический и почтовый адрес:
              </span>
              <span className={styles.contactValue}>
                660125, Красноярский Край, г. Красноярск, пер. Светлогорский, д.
                4
              </span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Адрес офиса:</span>
              <span className={styles.contactValue}>
                г. Красноярск, пер. Светлогорский, д. 4
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
