import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Основной подвал (темно-серый) */}
      <div className={styles.mainFooter}>
        <div className={styles.container}>
          {/* Первая ячейка - номер и почта */}
          <div className={styles.contactsCell}>
            <a href="tel:+79831638209" className={styles.phoneLink}>
              +7 983 163 82 09
            </a>
            <p className={styles.emailText}>
              Общий email:{" "}
              <a href="mailto:info@avto-soyuz.ru" className={styles.emailLink}>
                info@avto-soyuz.ru
              </a>
            </p>
          </div>

          {/* Вторая ячейка - основные колонки (5 шт) */}
          <div className={styles.mainColumnsCell}>
            <div className={styles.mainColumnsGrid}>
              {/* Колонка 1: Грузоперевозки */}
              <div className={styles.column}>
                <Link
                  href="/public/services/gruzoperevozki"
                  className={styles.columnTitle}
                >
                  Грузоперевозки
                </Link>
                <ul className={styles.columnList}>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/services/gruzoperevozki#sbornye"
                      className={styles.columnLink}
                    >
                      Перевозка сборных грузов
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/services/gruzoperevozki#torgovye-seti"
                      className={styles.columnLink}
                    >
                      Доставка в торговые сети
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/services/gruzoperevozki#marketplace"
                      className={styles.columnLink}
                    >
                      Доставка в маркетплейсы
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/services/gruzoperevozki#stroymarkety"
                      className={styles.columnLink}
                    >
                      Доставка в строймаркеты
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/services/gruzoperevozki#posylka"
                      className={styles.columnLink}
                    >
                      Посылка из рук в руки
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/services/gruzoperevozki#paletnaya"
                      className={styles.columnLink}
                    >
                      Палетная перевозка
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/services/gruzoperevozki#konteynernye"
                      className={styles.columnLink}
                    >
                      Контейнерные перевозки
                    </a>
                  </li>
                </ul>
              </div>

              {/* Колонка 2: Дополнительные услуги */}
              <div className={styles.column}>
                <Link
                  href="/public/services/dop-uslugi"
                  className={styles.columnTitle}
                >
                  Дополнительные услуги
                </Link>
                <ul className={styles.columnList}>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/services/dop-uslugi#zabor-gruza"
                      className={styles.columnLink}
                    >
                      Забор груза у отправителя
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/services/dop-uslugi#pogruzka"
                      className={styles.columnLink}
                    >
                      Погрузо-разгрузочные работы
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/services/dop-uslugi#dostavka-po-vremeni"
                      className={styles.columnLink}
                    >
                      Доставка по времени
                    </a>
                  </li>
                </ul>

                {/* Складные услуги под дополнительными */}
                <div className={styles.subColumn}>
                  <Link
                    href="/public/services/skladskie-uslugi"
                    className={styles.columnTitle}
                  >
                    Складные услуги
                  </Link>
                  <ul className={styles.columnList}>
                    <li className={styles.columnListItem}>
                      <a
                        href="/public/services/skladskie-uslugi#otvetstvennoe-hranenie"
                        className={styles.columnLink}
                      >
                        Ответственное хранение
                      </a>
                    </li>
                    <li className={styles.columnListItem}>
                      <a
                        href="/public/services/skladskie-uslugi#upakovka"
                        className={styles.columnLink}
                      >
                        Упаковка груза
                      </a>
                    </li>
                    <li className={styles.columnListItem}>
                      <a
                        href="/public/services/skladskie-uslugi#besplatnoe-hranenie"
                        className={styles.columnLink}
                      >
                        Бесплатное хранение грузов
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Колонка 3: Направления */}
              <div className={styles.column}>
                <Link
                  href="/public/services/napravleniya"
                  className={styles.columnTitle}
                >
                  Направления
                </Link>
                <ul className={styles.columnList}>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/services/napravleniya#rossiya"
                      className={styles.columnLink}
                    >
                      Грузоперевозки по России
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/services/napravleniya#kaliningrad"
                      className={styles.columnLink}
                    >
                      Перевозки в Калининград
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/services/napravleniya#kazahstan"
                      className={styles.columnLink}
                    >
                      Перевозки в Казахстан
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/services/napravleniya#belarus"
                      className={styles.columnLink}
                    >
                      Перевозки в Беларусь
                    </a>
                  </li>
                </ul>
              </div>

              {/* Колонка 4: О компании */}
              <div className={styles.column}>
                <Link href="/public/o-kompanii" className={styles.columnTitle}>
                  О компании
                </Link>
              </div>

              {/* Колонка 5: Контакты */}
              <div className={styles.column}>
                <Link href="/public/kontakty" className={styles.columnTitle}>
                  Контакты
                </Link>
              </div>
            </div>
          </div>

          {/* Третья ячейка - 5 колонок с документацией */}
          <div className={styles.secondaryColumnsCell}>
            <div className={styles.secondaryColumnsGrid}>
              {/* Ячейка 1: Тарифы и сроки */}
              <div className={styles.column}>
                <Link
                  href="/public/biznes/tarify"
                  className={styles.columnTitle}
                >
                  Тарифы и сроки
                </Link>
                <ul className={styles.columnList}>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/biznes/tarify#ceny"
                      className={styles.columnLink}
                    >
                      Цены на грузоперевозки
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/biznes/tarify#sroki"
                      className={styles.columnLink}
                    >
                      Сроки доставки грузов
                    </a>
                  </li>
                </ul>

                {/* Специальные предложения */}
                <Link
                  href="/public/biznes/special"
                  className={`${styles.columnTitle} ${styles.subTitle}`}
                >
                  Специальные предложения
                </Link>
                <ul className={styles.columnList}>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/biznes/special#akcii"
                      className={styles.columnLink}
                    >
                      Акции
                    </a>
                  </li>
                </ul>

                {/* Партнерам */}
                <Link
                  href="/public/biznes/partneram"
                  className={`${styles.columnTitle} ${styles.subTitle}`}
                >
                  Партнерам
                </Link>
                <ul className={styles.columnList}>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/biznes/partneram#stat-partnerom"
                      className={styles.columnLink}
                    >
                      Станьте партнером
                    </a>
                  </li>
                </ul>

                {/* Сервисы */}
                <Link
                  href="/public/calc"
                  className={`${styles.columnTitle} ${styles.subTitle}`}
                >
                  Сервисы
                </Link>
              </div>

              {/* Ячейка 2: Документы */}
              <div className={styles.column}>
                <Link
                  href="/public/biznes/dokumenty"
                  className={styles.columnTitle}
                >
                  Документы
                </Link>
                <ul className={styles.columnList}>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/biznes/dokumenty#dogovory"
                      className={styles.columnLink}
                    >
                      Договоры
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/biznes/dokumenty#sdacha-gruza"
                      className={styles.columnLink}
                    >
                      Документы для сдачи груза
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/biznes/dokumenty#poluchenie-gruza"
                      className={styles.columnLink}
                    >
                      Документы для получения груза
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/biznes/dokumenty#doverennosti"
                      className={styles.columnLink}
                    >
                      Доверенности
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/biznes/dokumenty#ustavnye"
                      className={styles.columnLink}
                    >
                      Уставные документы
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/biznes/dokumenty#pretenzii"
                      className={styles.columnLink}
                    >
                      Оформление претензии
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/biznes/dokumenty#vozvrat"
                      className={styles.columnLink}
                    >
                      Возврат денежных средств
                    </a>
                  </li>
                </ul>
              </div>

              {/* Ячейка 3: Информация */}
              <div className={styles.column}>
                <Link href="/public/informaciya" className={styles.columnTitle}>
                  Информация
                </Link>
                <ul className={styles.columnList}>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/informaciya#kak-otpravit"
                      className={styles.columnLink}
                    >
                      Как отправить груз
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/informaciya#trebovaniya-k-gruzu"
                      className={styles.columnLink}
                    >
                      Требования к грузу
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/informaciya#zapret-gruzy"
                      className={styles.columnLink}
                    >
                      Грузы не принимаемые к перевозке
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/informaciya#obyazatelnaya-upakovka"
                      className={styles.columnLink}
                    >
                      Грузы, подлежащие обязательной жесткой упаковке
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/informaciya#kak-poluchit"
                      className={styles.columnLink}
                    >
                      Как получить груз
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/informaciya#kak-zaklyuchit-dogovor"
                      className={styles.columnLink}
                    >
                      Как заключить договор
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/informaciya#kak-otsledit"
                      className={styles.columnLink}
                    >
                      Как отследить груз
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/informaciya#sposoby-oplaty"
                      className={styles.columnLink}
                    >
                      Способы оплаты услуг
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/informaciya#kak-vnesti-izmeneniya"
                      className={styles.columnLink}
                    >
                      Как внести изменения
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/informaciya#kak-izmerit-obem"
                      className={styles.columnLink}
                    >
                      Как измерить объем груза
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a
                      href="/public/informaciya#chastnye-voprosy"
                      className={styles.columnLink}
                    >
                      Частные вопросы
                    </a>
                  </li>
                </ul>
              </div>

              {/* Ячейка 4: Пустая */}
              <div className={styles.column}></div>

              {/* Ячейка 5: Пустая */}
              <div className={styles.column}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижний подвал (черный) */}
      <div className={styles.bottomFooter}>
        <div className={styles.bottomContainer}>
          <div className={styles.bottomContent}>
            <div className={styles.topRow}>
              <div className={styles.copyrightLeft}>
                <div className={styles.copyright}>
                  © {currentYear} Транспортная компания «АВТО-СОЮЗ»
                </div>
                <div className={styles.city}>г. Красноярск</div>
              </div>
              <div className={styles.linksRight}>
                <Link
                  href="/public/privacy-policy"
                  className={styles.bottomLink}
                >
                  Политика конфиденциальности
                </Link>
                <Link
                  href="/public/legal-documents"
                  className={styles.bottomLink}
                >
                  Правовые документы
                </Link>
              </div>
            </div>
            <div className={styles.disclaimer}>
              Размещенные на сайте данные носят информационный характер и не
              являются публичной офертой
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
