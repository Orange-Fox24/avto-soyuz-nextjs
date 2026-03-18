import Image from "next/image";
import styles from "./Napravleniya.module.css";

export default function NapravleniyaPage() {
  return (
    <div className={styles.page}>
      {/* Фоновая полупрозрачная иконка */}
      <div className={styles.backgroundIcon}>
        <Image
          src="/icons/directions.svg"
          alt=""
          width={800}
          height={800}
          className={styles.icon}
          aria-hidden="true"
        />
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>Направления</h1>

        <div className={styles.leftColumn}>
          {/* Грузоперевозки по России */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Грузоперевозки по России</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Полное покрытие территории РФ от Калининграда до Владивостока.
              </span>
            </p>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Основные направления:</span>
              <div className={styles.bulletList}>
                <div className={styles.bulletItem}>
                  Центральный федеральный округ (Москва, область, ЦФО)
                </div>
                <div className={styles.bulletItem}>
                  Северо-Западный округ (Санкт-Петербург, Ленобласть)
                </div>
                <div className={styles.bulletItem}>
                  Юг России (Ростов, Краснодар, Сочи)
                </div>
                <div className={styles.bulletItem}>
                  Урал и Сибирь (Екатеринбург, Красноярск)
                </div>
                <div className={styles.bulletItem}>
                  Дальний Восток (Хабаровск, Владивосток)
                </div>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Сроки:</span> от 1 дня по
              Красноярску до 14 дней на Дальний Восток
            </div>
          </div>

          <div className={styles.serviceDivider} />

          {/* Перевозки в Калининград */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Перевозки в Калининград</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Специализированные маршруты в Калининградскую область с учётом
                транзита.
              </span>
            </p>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Особенности:</span>
              <div className={styles.bulletList}>
                <div className={styles.bulletItem}>
                  Транзит через территорию других стран
                </div>
                <div className={styles.bulletItem}>
                  Таможенное оформление при необходимости
                </div>
                <div className={styles.bulletItem}>
                  Регулярные рейсы 2 раза в неделю
                </div>
                <div className={styles.bulletItem}>
                  Доставка "от двери до двери"
                </div>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Срок:</span> 8-14 дней
            </div>
          </div>

          <div className={styles.serviceDivider} />

          {/* Перевозки в Казахстан */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Перевозки в Казахстан</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Международные перевозки в Республику Казахстан с полным
                сопровождением.
              </span>
            </p>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Города доставки:</span>
              <div className={styles.cityGrid}>
                <div className={styles.cityItem}>Нур-Султан (Астана)</div>
                <div className={styles.cityItem}>Алматы</div>
                <div className={styles.cityItem}>Шымкент</div>
                <div className={styles.cityItem}>Караганда</div>
                <div className={styles.cityItem}>Актобе</div>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Услуги:</span> таможенное
              оформление, документальное сопровождение
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Срок:</span> 6-12 дней
            </div>
          </div>

          <div className={styles.serviceDivider} />

          {/* Перевозки в Беларусь */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Перевозки в Беларусь</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Доставка грузов в Республику Беларусь в рамках ЕАЭС.
              </span>
            </p>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Направления:</span>
              <div className={styles.cityGrid}>
                <div className={styles.cityItem}>Минск</div>
                <div className={styles.cityItem}>Гомель</div>
                <div className={styles.cityItem}>Брест</div>
                <div className={styles.cityItem}>Витебск</div>
                <div className={styles.cityItem}>Гродно</div>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Особенности:</span> упрощённое
              таможенное оформление, знание местной логистики
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Срок:</span> 4-7 дней
            </div>
          </div>

          <div className={styles.serviceDivider} />

          {/* Преимущества наших направлений */}
          <div className={styles.advantagesList}>
            <h2 className={styles.advantagesTitle}>
              Преимущества наших направлений:
            </h2>
            <div className={styles.advantagesGrid}>
              <div className={styles.advantageItem}>
                Собственные и партнёрские терминалы в ключевых городах
              </div>
              <div className={styles.advantageItem}>
                GPS-отслеживание на всём маршруте
              </div>
              <div className={styles.advantageItem}>
                Страхование международных перевозок
              </div>
              <div className={styles.advantageItem}>
                Помощь в подготовке документов
              </div>
              <div className={styles.advantageItem}>
                Круглосуточная поддержка
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
