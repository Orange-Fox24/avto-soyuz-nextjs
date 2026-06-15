import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.mainFooter}>
        <div className={styles.container}>
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

          <div className={styles.mainColumnsCell}>
            <div className={styles.mainColumnsGrid}>
              <div className={styles.column}>
                <Link href="/services/gruzoperevozki" className={styles.columnTitle}>
                  Грузоперевозки
                </Link>
                <ul className={styles.columnList}>
                  <li className={styles.columnListItem}>
                    <a href="/services/gruzoperevozki#sbornye" className={styles.columnLink}>
                      Перевозка сборных грузов
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/services/gruzoperevozki#torgovye-seti" className={styles.columnLink}>
                      Доставка в торговые сети
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/services/gruzoperevozki#marketplace" className={styles.columnLink}>
                      Доставка в маркетплейсы
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/services/gruzoperevozki#stroymarkety" className={styles.columnLink}>
                      Доставка в строймаркеты
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/services/gruzoperevozki#posylka" className={styles.columnLink}>
                      Посылка из рук в руки
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/services/gruzoperevozki#paletnaya" className={styles.columnLink}>
                      Палетная перевозка
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/services/gruzoperevozki#konteynernye" className={styles.columnLink}>
                      Контейнерные перевозки
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.column}>
                <Link href="/services/dop-uslugi" className={styles.columnTitle}>
                  Дополнительные услуги
                </Link>
                <ul className={styles.columnList}>
                  <li className={styles.columnListItem}>
                    <a href="/services/dop-uslugi#zabor-gruza" className={styles.columnLink}>
                      Забор груза у отправителя
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/services/dop-uslugi#pogruzka" className={styles.columnLink}>
                      Погрузо-разгрузочные работы
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/services/dop-uslugi#dostavka-po-vremeni" className={styles.columnLink}>
                      Доставка по времени
                    </a>
                  </li>
                </ul>
                <div className={styles.subColumn}>
                  <Link href="/services/skladskie-uslugi" className={styles.columnTitle}>
                    Складные услуги
                  </Link>
                  <ul className={styles.columnList}>
                    <li className={styles.columnListItem}>
                      <a href="/services/skladskie-uslugi#otvetstvennoe-hranenie" className={styles.columnLink}>
                        Ответственное хранение
                      </a>
                    </li>
                    <li className={styles.columnListItem}>
                      <a href="/services/skladskie-uslugi#upakovka" className={styles.columnLink}>
                        Упаковка груза
                      </a>
                    </li>
                    <li className={styles.columnListItem}>
                      <a href="/services/skladskie-uslugi#besplatnoe-hranenie" className={styles.columnLink}>
                        Бесплатное хранение грузов
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={styles.column}>
                <Link href="/services/napravleniya" className={styles.columnTitle}>
                  Направления
                </Link>
                <ul className={styles.columnList}>
                  <li className={styles.columnListItem}>
                    <a href="/services/napravleniya#rossiya" className={styles.columnLink}>
                      Грузоперевозки по России
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/services/napravleniya#kaliningrad" className={styles.columnLink}>
                      Перевозки в Калининград
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/services/napravleniya#kazahstan" className={styles.columnLink}>
                      Перевозки в Казахстан
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/services/napravleniya#belarus" className={styles.columnLink}>
                      Перевозки в Беларусь
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.column}>
                <Link href="/o-kompanii" className={styles.columnTitle}>
                  О компании
                </Link>
              </div>

              <div className={styles.column}>
                <Link href="/kontakty" className={styles.columnTitle}>
                  Контакты
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.secondaryColumnsCell}>
            <div className={styles.secondaryColumnsGrid}>
              <div className={styles.column}>
                <Link href="/biznes/tarify" className={styles.columnTitle}>
                  Тарифы и сроки
                </Link>
                <ul className={styles.columnList}>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/tarify#ceny" className={styles.columnLink}>
                      Цены на грузоперевозки
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/tarify#sroki" className={styles.columnLink}>
                      Сроки доставки грузов
                    </a>
                  </li>
                </ul>
                <Link href="/biznes/special" className={`${styles.columnTitle} ${styles.subTitle}`}>
                  Специальные предложения
                </Link>
                <ul className={styles.columnList}>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/special#akcii" className={styles.columnLink}>
                      Акции
                    </a>
                  </li>
                </ul>
                <Link href="/biznes/partneram" className={`${styles.columnTitle} ${styles.subTitle}`}>
                  Партнерам
                </Link>
                <ul className={styles.columnList}>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/partneram#stat-partnerom" className={styles.columnLink}>
                      Станьте партнером
                    </a>
                  </li>
                </ul>
                <Link href="/calc" className={`${styles.columnTitle} ${styles.subTitle}`}>
                  Калькулятор
                </Link>
              </div>

              <div className={styles.column}>
                <Link href="/biznes/dokumenty" className={styles.columnTitle}>
                  Документы
                </Link>
                <ul className={styles.columnList}>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/dokumenty#dogovory" className={styles.columnLink}>
                      Договоры
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/dokumenty#sdacha-gruza" className={styles.columnLink}>
                      Документы для сдачи груза
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/dokumenty#poluchenie-gruza" className={styles.columnLink}>
                      Документы для получения груза
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/dokumenty#doverennosti" className={styles.columnLink}>
                      Доверенности
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/dokumenty#ustavnye" className={styles.columnLink}>
                      Уставные документы
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/dokumenty#pretenzii" className={styles.columnLink}>
                      Оформление претензии
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/dokumenty#vozvrat" className={styles.columnLink}>
                      Возврат денежных средств
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.column}>
                <Link href="/biznes/informaciya" className={styles.columnTitle}>
                  Информация
                </Link>
                <ul className={styles.columnList}>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/informaciya#kak-otpravit" className={styles.columnLink}>
                      Как отправить груз
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/informaciya#trebovaniya-k-gruzu" className={styles.columnLink}>
                      Требования к грузу
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/informaciya#zapret-gruzy" className={styles.columnLink}>
                      Грузы не принимаемые к перевозке
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/informaciya#obyazatelnaya-upakovka" className={styles.columnLink}>
                      Грузы, подлежащие обязательной жесткой упаковке
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/informaciya#kak-poluchit" className={styles.columnLink}>
                      Как получить груз
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/informaciya#kak-zaklyuchit-dogovor" className={styles.columnLink}>
                      Как заключить договор
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/informaciya#kak-otsledit" className={styles.columnLink}>
                      Как отследить груз
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/informaciya#sposoby-oplaty" className={styles.columnLink}>
                      Способы оплаты услуг
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/informaciya#kak-vnesti-izmeneniya" className={styles.columnLink}>
                      Как внести изменения
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/informaciya#kak-izmerit-obem" className={styles.columnLink}>
                      Как измерить объем груза
                    </a>
                  </li>
                  <li className={styles.columnListItem}>
                    <a href="/biznes/informaciya#chastnye-voprosy" className={styles.columnLink}>
                      Частные вопросы
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.column}></div>
              <div className={styles.column}></div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomFooter}>
        <div className={styles.bottomContainer}>
          <div className={styles.bottomContent}>
            <div className={styles.topRow}>
              <div className={styles.copyrightLeft}>
                <div className={styles.copyright}>
                  &copy; {currentYear} Транспортная компания &laquo;АВТО-СОЮЗ&raquo;
                </div>
                <div className={styles.city}>г. Красноярск</div>
              </div>
              <div className={styles.linksRight}>
                <Link href="/privacy-policy" className={styles.bottomLink}>
                  Политика конфиденциальности
                </Link>
                <Link href="/legal-documents" className={styles.bottomLink}>
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