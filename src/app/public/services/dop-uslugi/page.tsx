import Image from "next/image";
import styles from "./DopUslugi.module.css";

export default function DopUslugiPage() {
  return (
    <div className={styles.page}>
      {/* Фоновая полупрозрачная иконка */}
      <div className={styles.backgroundIcon}>
        <Image
          src="/icons/additional.svg"
          alt=""
          width={800}
          height={800}
          className={styles.icon}
          aria-hidden="true"
        />
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>Дополнительные услуги</h1>

        <div className={styles.leftColumn}>
          {/* Забор груза у отправителя */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Забор груза у отправителя</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Мы сами заберём ваш груз с любого адреса в Красноярске и крае.
              </span>{" "}
              Экономьте время — не тратьте его на доставку груза к нам.
            </p>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Тарифы:</span>
              <div className={styles.bulletList}>
                <div className={styles.bulletItem}>Красноярск: от 800 ₽</div>
                <div className={styles.bulletItem}>
                  Красноярский край: от 3500 ₽
                </div>
                <div className={styles.bulletItem}>
                  Другие города: индивидуально
                </div>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Время подачи:</span> 2-8 часов
            </div>
          </div>

          <div className={styles.serviceDivider} />

          {/* Погрузо-разгрузочные работы */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Погрузо-разгрузочные работы</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Профессиональные грузчики с оборудованием для бережной обработки
                любых грузов.
              </span>
            </p>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Услуги:</span>
              <div className={styles.bulletList}>
                <div className={styles.bulletItem}>
                  Ручная погрузка: от 300 ₽/час
                </div>
                <div className={styles.bulletItem}>Спецгруз: от 1000 ₽/час</div>
                <div className={styles.bulletItem}>
                  Упаковка/распаковка: от 400 ₽/час
                </div>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Оборудование:</span> тележки,
              штабелеры, защитные материалы
            </div>
          </div>

          <div className={styles.serviceDivider} />

          {/* Доставка по времени */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Доставка по времени</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Точная доставка к указанному часу — для бизнеса, где важны
                сроки.
              </span>
            </p>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Варианты:</span>
              <div className={styles.bulletList}>
                <div className={styles.bulletItem}>
                  Стандартная (±2 часа): базовая стоимость
                </div>
                <div className={styles.bulletItem}>
                  Точная (±30 минут): +40% к тарифу
                </div>
                <div className={styles.bulletItem}>
                  Экспресс ко времени (±15 минут): +80% к тарифу
                </div>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Применение:</span> магазины,
              производства, офисы, мероприятия
            </div>
          </div>

          <div className={styles.serviceDivider} />

          {/* Гарантии */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Гарантии</h2>

            <div className={styles.infoBlock}>
              <div className={styles.bulletList}>
                <div className={styles.bulletItem}>Все услуги страхуются</div>
                <div className={styles.bulletItem}>
                  При задержке более 1 часа — компенсация 20%
                </div>
                <div className={styles.bulletItem}>
                  Фотоотчёт и полный пакет документов
                </div>
              </div>
            </div>

            <div className={styles.priceBlock}>
              <div className={styles.priceBlockItem}>
                <span className={styles.priceBlockHighlight}>
                  Закажите несколько услуг вместе
                </span>
                и получите скидку до 15%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
