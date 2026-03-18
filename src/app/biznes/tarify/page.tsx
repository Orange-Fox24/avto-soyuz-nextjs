import Image from "next/image";
import Link from "next/link";
import styles from "./Tarify.module.css";

export default function TarifyPage() {
  return (
    <div className={styles.page}>
      {/* Фоновая полупрозрачная иконка */}
      <div className={styles.backgroundIcon}>
        <Image
          src="/icons/tariffs.svg"
          alt=""
          width={800}
          height={800}
          className={styles.icon}
          aria-hidden="true"
        />
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>Тарифы и сроки</h1>

        <div className={styles.leftColumn}>
          {/* Цены на грузоперевозки */}
          <section className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Цены на грузоперевозки</h2>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>
                Факторы, влияющие на стоимость:
              </span>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>Расстояние и направление</li>
                <li className={styles.bulletItem}>Вес и объем груза</li>
                <li className={styles.bulletItem}>Тип упаковки</li>
                <li className={styles.bulletItem}>Срочность доставки</li>
                <li className={styles.bulletItem}>Дополнительные услуги</li>
              </ul>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>
                Примерные тарифы из Красноярска:
              </span>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Направление</th>
                    <th>Вес/объем</th>
                    <th>Стоимость</th>
                    <th>Примечания</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Красноярск → Красноярский край</td>
                    <td>до 100 кг/1м³</td>
                    <td>
                      <span className={styles.highlight}>от 2000 ₽</span>
                    </td>
                    <td>В пределах 100 км от города</td>
                  </tr>
                  <tr>
                    <td>Красноярск → Новосибирск</td>
                    <td>1 палет</td>
                    <td>
                      <span className={styles.highlight}>от 6000 ₽</span>
                    </td>
                    <td>680 км, регулярные рейсы</td>
                  </tr>
                  <tr>
                    <td>Красноярск → Иркутск</td>
                    <td>1 палет</td>
                    <td>
                      <span className={styles.highlight}>от 5500 ₽</span>
                    </td>
                    <td>1060 км, ежедневные отправки</td>
                  </tr>
                  <tr>
                    <td>Красноярск → Москва</td>
                    <td>1 палет</td>
                    <td>
                      <span className={styles.highlight}>от 15000 ₽</span>
                    </td>
                    <td>4150 км, консолидированный груз</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Дополнительные расходы:</span>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  Погрузка/разгрузка: от 400 ₽/час
                </li>
                <li className={styles.bulletItem}>
                  Забор груза по городу: от 1000 ₽
                </li>
                <li className={styles.bulletItem}>
                  Упаковка: от 200 ₽/единица
                </li>
                <li className={styles.bulletItem}>
                  Срочная доставка: +50-100%
                </li>
              </ul>
            </div>
          </section>

          <div className={styles.serviceDivider} />

          {/* Сроки доставки грузов */}
          <section className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Сроки доставки грузов</h2>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Направление</th>
                    <th>Стандартный срок</th>
                    <th>Экспресс-доставка</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Красноярский край</td>
                    <td>1-3 дня</td>
                    <td>
                      <span className={styles.highlight}>1 день</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Новосибирск</td>
                    <td>2-3 дня</td>
                    <td>
                      <span className={styles.highlight}>1-2 дня</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Иркутск</td>
                    <td>2-3 дня</td>
                    <td>
                      <span className={styles.highlight}>1-2 дня</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Урал (Екатеринбург)</td>
                    <td>4-6 дней</td>
                    <td>
                      <span className={styles.highlight}>3-4 дня</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Москва и ЦФО</td>
                    <td>6-9 дней</td>
                    <td>
                      <span className={styles.highlight}>4-6 дней</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Санкт-Петербург</td>
                    <td>8-12 дней</td>
                    <td>
                      <span className={styles.highlight}>6-8 дней</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Дальний Восток</td>
                    <td>5-8 дней</td>
                    <td>
                      <span className={styles.highlight}>3-5 дней</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>
                Международные направления из Красноярска:
              </span>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.highlight}>Казахстан:</span> 5-7 дней
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.highlight}>Монголия:</span> 6-8 дней
                  (с таможенным оформлением)
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.highlight}>Китай:</span> 10-15 дней
                  (транзит через Казахстан/Монголию)
                </li>
              </ul>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>
                Как рассчитать точную стоимость?
              </span>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <span className={styles.highlight}>Онлайн-калькулятор</span>{" "}
                  на сайте
                </li>
                <li className={styles.bulletItem}>
                  <span className={styles.highlight}>Заявка по телефону:</span>
                  <a href="tel:+79831638209" className={styles.phoneLink}>
                    {" "}
                    +7 983 163 82 09
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
