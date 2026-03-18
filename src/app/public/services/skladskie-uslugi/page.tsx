import Image from "next/image";
import styles from "./SkladskieUslugi.module.css";

export default function SkladskieUslugiPage() {
  return (
    <div className={styles.page}>
      {/* Фоновая полупрозрачная иконка */}
      <div className={styles.backgroundIcon}>
        <Image
          src="/icons/warehouse.svg"
          alt=""
          width={800}
          height={800}
          className={styles.icon}
          aria-hidden="true"
        />
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>Складные услуги</h1>

        <div className={styles.leftColumn}>
          {/* Ответственное хранение */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Ответственное хранение</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Безопасное хранение ваших товаров на современных складах с
                полной материальной ответственностью.
              </span>
            </p>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Условия:</span>
              <div className={styles.bulletList}>
                <div className={styles.bulletItem}>
                  Охраняемые складские комплексы
                </div>
                <div className={styles.bulletItem}>
                  Контроль температуры и влажности
                </div>
                <div className={styles.bulletItem}>
                  Страхование груза на полную стоимость
                </div>
                <div className={styles.bulletItem}>
                  Отчётность и инвентаризация по запросу
                </div>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Стоимость:</span> от 150 ₽/м³ в
              сутки
            </div>
          </div>

          <div className={styles.serviceDivider} />

          {/* Упаковка груза */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Упаковка груза</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Профессиональная подготовка товаров к транспортировке для
                максимальной сохранности.
              </span>
            </p>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Виды упаковки:</span>
              <div className={styles.bulletList}>
                <div className={styles.bulletItem}>
                  Картонная коробка с наполнением
                </div>
                <div className={styles.bulletItem}>
                  Стретч-плёнка (палетная обтяжка)
                </div>
                <div className={styles.bulletItem}>
                  Пузырчатая плёнка для хрупких грузов
                </div>
                <div className={styles.bulletItem}>
                  Деревянная обрешётка для тяжелых грузов
                </div>
                <div className={styles.bulletItem}>
                  Термоупаковка для температурных грузов
                </div>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Стоимость:</span> от 200
              ₽/единица
            </div>
          </div>

          <div className={styles.serviceDivider} />

          {/* Бесплатное хранение грузов */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Бесплатное хранение грузов</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Временное складирование грузов при комплексном заказе перевозки
                и других услуг.
              </span>
            </p>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Условия:</span>
              <div className={styles.bulletList}>
                <div className={styles.bulletItem}>До 3 суток — бесплатно</div>
                <div className={styles.bulletItem}>
                  От 3 до 7 суток — 50 ₽/м³ в сутки
                </div>
                <div className={styles.bulletItem}>
                  Свыше 7 суток — по тарифам ответственного хранения
                </div>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Что входит:</span> приёмка,
              размещение, выдача по первому требованию
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
