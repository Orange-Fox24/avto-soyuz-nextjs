import Image from "next/image";
import styles from "./Gruzoperevozki.module.css";

export default function GruzoperevozkiPage() {
  return (
    <div className={styles.page}>
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
        <h1 className={styles.title}>Грузоперевозки</h1>

        <div className={styles.leftColumn}>
          {/* Перевозка сборных грузов */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Перевозка сборных грузов</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Оптимальное решение для малого и среднего объема товаров.
              </span>{" "}
              Мы объединяем грузы нескольких клиентов в одном транспорте, что
              позволяет снизить стоимость перевозки до 40% по сравнению с
              отдельным транспортом.
            </p>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Критерий</th>
                    <th>Сборный груз</th>
                    <th>Отдельный транспорт</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Стоимость</td>
                    <td>
                      <span className={styles.highlight}>Экономия 30-50%</span>
                    </td>
                    <td>Полная стоимость</td>
                  </tr>
                  <tr>
                    <td>Гибкость</td>
                    <td>
                      <span className={styles.highlight}>От 1 коробки</span>
                    </td>
                    <td>Минимум 1 палета</td>
                  </tr>
                  <tr>
                    <td>Частота отправок</td>
                    <td>
                      <span className={styles.highlight}>
                        2-3 раза в неделю
                      </span>
                    </td>
                    <td>По запросу</td>
                  </tr>
                  <tr>
                    <td>Срок доставки</td>
                    <td>
                      <span className={styles.highlight}>3-7 дней</span>
                    </td>
                    <td>2-5 дней</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Минимальная партия:</span>
                <span>от 0.5 м³ или 50 кг</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Сроки доставки:</span>
                <span>3-7 дней по России</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Документы:</span>
                <span>ТТН, накладная, опись груза</span>
              </div>
            </div>
          </div>

          <div className={styles.serviceDivider} />

          {/* Доставка в торговые сети */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Доставка в торговые сети</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Специализированная логистика с соблюдением строгих стандартов
                ритейла.
              </span>{" "}
              Мы знаем специфику работы с крупными сетевыми магазинами.
            </p>
            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Наши услуги:</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Соблюдение временных окон</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Подготовка товара к приемке</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Работа с возвратами и браком</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Ночные завозы (по запросу)</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Кросс-докинг на нашем складе</span>
              </div>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Оплата:</span>
                <span>По факту приемки товара сетью</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Страхование:</span>
                <span>100% стоимости груза</span>
              </div>
            </div>
          </div>

          <div className={styles.serviceDivider} />

          {/* Доставка в маркетплейсы */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Доставка в маркетплейсы</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Полный цикл доставки товаров на склады маркетплейсов
              </span>{" "}
              с учетом постоянно меняющихся требований.
            </p>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Параметр</th>
                    <th>Wildberries</th>
                    <th>OZON</th>
                    <th>Яндекс.Маркет</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Упаковка</td>
                    <td>Фирменная коробка</td>
                    <td>Нейтральная</td>
                    <td>Любая прочная</td>
                  </tr>
                  <tr>
                    <td>Маркировка</td>
                    <td>Штрих-код WB</td>
                    <td>Ценник OZON</td>
                    <td>Честный знак</td>
                  </tr>
                  <tr>
                    <td>Документы</td>
                    <td>УПД, ТН</td>
                    <td>Счет-фактура</td>
                    <td>ТТН, сертификаты</td>
                  </tr>
                  <tr>
                    <td>Срок поставки</td>
                    <td>24-48 часов</td>
                    <td>48-72 часа</td>
                    <td>72 часа</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Минимальная партия:</span>
                <span>от 10 коробок</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Стоимость:</span>
                <span>от 350 ₽/коробка (включая упаковку)</span>
              </div>
            </div>
          </div>

          <div className={styles.serviceDivider} />

          {/* Доставка в строймаркеты */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Доставка в строймаркеты</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Перевозка строительных материалов
              </span>{" "}
              с учетом их специфики и требований к транспортировке.
            </p>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Тип материала</th>
                    <th>Транспорт</th>
                    <th>Упаковка</th>
                    <th>Особенности</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Сухие смеси</td>
                    <td>Тент, рефрижератор</td>
                    <td>Мешки на палетах</td>
                    <td>Влажность &lt; 50%</td>
                  </tr>
                  <tr>
                    <td>Керамическая плитка</td>
                    <td>Тент с амортизацией</td>
                    <td>Картон, уголки</td>
                    <td>Вертикальное положение</td>
                  </tr>
                  <tr>
                    <td>Металлопрокат</td>
                    <td>Открытая платформа</td>
                    <td>Стрейч-пленка</td>
                    <td>Защита от коррозии</td>
                  </tr>
                  <tr>
                    <td>ЛКМ</td>
                    <td>Рефрижератор</td>
                    <td>Заводская упаковка</td>
                    <td>Температура 5-25°C</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>
                  Наш специализированный транспорт:
                </span>
              </div>
              <div className={styles.infoItem}>
                <span>• Манипуляторы для тяжелых грузов</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Тенты с усиленным полом</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Автомобили с аппарелями</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Гидроборты для бескрановой погрузки</span>
              </div>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Гарантия сохранности:</span>
                <span>
                  100% страхование + фотофиксация при погрузке/разгрузке
                </span>
              </div>
            </div>
          </div>

          <div className={styles.serviceDivider} />

          {/* Посылка из рук в руки */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Посылка из рук в руки</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Экспресс-доставка с персональной ответственностью курьера
              </span>{" "}
              для ценных и срочных отправлений.
            </p>
            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Что перевозим:</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Документы и договоры</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Ювелирные изделия</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Электроника и гаджеты</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Ключи и пропуска</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Образцы продукции</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Медицинские препараты</span>
              </div>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Запрещено к перевозке:</span>
                <span>
                  Деньги, оружие, наркотики, скоропортящиеся продукты без
                  термосумки.
                </span>
              </div>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Стоимость:</span>
              </div>
              <div className={styles.infoItem}>
                <span>
                  • По Красноярску: 500-1500 ₽ (в зависимости от срочности)
                </span>
              </div>
              <div className={styles.infoItem}>
                <span>• Красноярский край: 1000-3500 ₽</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Другие города: индивидуальный расчет</span>
              </div>
            </div>
          </div>

          <div className={styles.serviceDivider} />

          {/* Палетная перевозка */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Палетная перевозка</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Профессиональная транспортировка грузов на палетах
              </span>{" "}
              — самый безопасный и эффективный способ перевозки упакованного
              товара.
            </p>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Тип палеты</th>
                    <th>Размеры</th>
                    <th>Грузоподъемность</th>
                    <th>Применение</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Финская (FIN)</td>
                    <td>1000×1200×144 мм</td>
                    <td>2000 кг</td>
                    <td>Европейские поставки</td>
                  </tr>
                  <tr>
                    <td>Евро (EUR)</td>
                    <td>800×1200×144 мм</td>
                    <td>1500 кг</td>
                    <td>Стройматериалы, техника</td>
                  </tr>
                  <tr>
                    <td>Стандартная</td>
                    <td>1200×1200×144 мм</td>
                    <td>2500 кг</td>
                    <td>Промышленные грузы</td>
                  </tr>
                  <tr>
                    <td>Одноразовая</td>
                    <td>800×600×144 мм</td>
                    <td>500 кг</td>
                    <td>Легкие товары</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Наши услуги:</span>
              </div>
              <div className={styles.infoItem}>
                <span>
                  1. Паллетирование (если товар не упакован) — 150 ₽/палета
                </span>
              </div>
              <div className={styles.infoItem}>
                <span>2. Обтяжка стретч-пленкой — 80 ₽/палета</span>
              </div>
              <div className={styles.infoItem}>
                <span>3. Уголки и защита углов — 50 ₽/уголок</span>
              </div>
              <div className={styles.infoItem}>
                <span>4. Маркировка — бесплатно</span>
              </div>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Стоимость перевозки:</span>
                <span>от 200 ₽/км (с учетом обратного рейса)</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Сроки:</span>
                <span>2-5 дней по ЦФО</span>
              </div>
            </div>
          </div>

          <div className={styles.serviceDivider} />

          {/* Контейнерные перевозки */}
          <div className={styles.serviceSection}>
            <h2 className={styles.serviceTitle}>Контейнерные перевозки</h2>
            <p className={styles.serviceDescription}>
              <span className={styles.highlight}>
                Международные и межрегиональные перевозки в контейнерах
              </span>{" "}
              — решение для крупных партий товаров.
            </p>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Тип</th>
                    <th>Размеры</th>
                    <th>Объем</th>
                    <th>Грузоподъемность</th>
                    <th>Что перевозят</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>20' сухогруз</td>
                    <td>6.00×2.44×2.59 м</td>
                    <td>33 м³</td>
                    <td>28.000 кг</td>
                    <td>Штучные грузы, коробки</td>
                  </tr>
                  <tr>
                    <td>40' сухогруз</td>
                    <td>12.19×2.44×2.59 м</td>
                    <td>67 м³</td>
                    <td>26.500 кг</td>
                    <td>Большие партии товаров</td>
                  </tr>
                  <tr>
                    <td>40' High Cube</td>
                    <td>12.19×2.44×2.89 м</td>
                    <td>76 м³</td>
                    <td>26.500 кг</td>
                    <td>Легкие объемные грузы</td>
                  </tr>
                  <tr>
                    <td>Рефрижератор</td>
                    <td>12.19×2.44×2.59 м</td>
                    <td>67 м³</td>
                    <td>26.000 кг</td>
                    <td>Температурные грузы</td>
                  </tr>
                  <tr>
                    <td>Open Top</td>
                    <td>12.19×2.44×2.59 м</td>
                    <td>67 м³</td>
                    <td>27.000 кг</td>
                    <td>Негабарит сверху</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Дополнительные услуги:</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Таможенное оформление — от 20.000 ₽</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Складская обработка — 800 ₽/м²</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Страхование — 0.3% от стоимости груза</span>
              </div>
              <div className={styles.infoItem}>
                <span>• Досмотр контейнера — 5000 ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
