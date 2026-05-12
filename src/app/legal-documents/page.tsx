// src/app/legal-documents/page.tsx
import Link from "next/link";
import styles from "./LegalDocuments.module.css";

export default function LegalDocumentsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Правовые документы</h1>
        <p className={styles.subtitle}>
          Официальные документы, регламентирующие деятельность ООО «АВТО-СОЮЗ» и
          использование сайта компании.
        </p>

        {/* Пользовательское соглашение */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Пользовательское соглашение</h2>
          <p className={styles.sectionText}>
            Настоящее Пользовательское соглашение (далее — «Соглашение»)
            регулирует отношения между ООО «АВТО-СОЮЗ» (далее — «Компания») и
            пользователем (далее — «Пользователь») при использовании сайта{" "}
            <Link href="/" className={styles.link}>
              avto-soyuz.ru
            </Link>
            .
          </p>
          <p className={styles.sectionText}>
            Используя сайт, Пользователь подтверждает, что полностью ознакомился
            с условиями настоящего Соглашения и принимает их без каких-либо
            оговорок. Если Пользователь не согласен с условиями Соглашения, он
            обязан прекратить использование сайта.
          </p>
          <p className={styles.sectionText}>
            Компания оставляет за собой право вносить изменения в настоящее
            Соглашение в любое время без предварительного уведомления
            Пользователя. Изменения вступают в силу с момента публикации на
            сайте.
          </p>
        </div>

        {/* Политика конфиденциальности */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Политика конфиденциальности</h2>
          <p className={styles.sectionText}>
            Настоящая Политика конфиденциальности определяет порядок сбора,
            обработки и защиты персональных данных, которые Пользователь
            предоставляет при использовании сайта и услуг Компании.
          </p>
          <p className={styles.sectionText}>
            Компания собирает следующие персональные данные:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Фамилия, имя, отчество</li>
            <li className={styles.listItem}>Контактный телефон</li>
            <li className={styles.listItem}>Адрес электронной почты (email)</li>
            <li className={styles.listItem}>Название компании (для юридических лиц)</li>
            <li className={styles.listItem}>Город отправки и город назначения</li>
          </ul>
          <p className={styles.sectionText}>
            Персональные данные обрабатываются в целях:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Оформления заказов на грузоперевозку</li>
            <li className={styles.listItem}>Связи с Пользователем по вопросам услуг</li>
            <li className={styles.listItem}>Выставления счетов и закрывающих документов</li>
            <li className={styles.listItem}>Улучшения качества обслуживания</li>
          </ul>
          <p className={styles.sectionText}>
            Компания обязуется не передавать персональные данные третьим лицам
            без согласия Пользователя, за исключением случаев, предусмотренных
            законодательством Российской Федерации.
          </p>
          <p className={styles.sectionText}>
            Полный текст Политики конфиденциальности доступен по ссылке:{" "}
            <Link href="/privacy-policy" className={styles.link}>
              Политика конфиденциальности
            </Link>
          </p>
        </div>

        {/* Политика обработки файлов cookie */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Политика обработки файлов cookie</h2>
          <p className={styles.sectionText}>
            Сайт использует файлы cookie — небольшие текстовые файлы, которые
            сохраняются на устройстве Пользователя при посещении сайта.
          </p>
          <p className={styles.sectionText}>
            Мы используем следующие типы файлов cookie:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <strong>Обязательные</strong> — необходимы для корректной работы
              сайта, авторизации в личном кабинете
            </li>
            <li className={styles.listItem}>
              <strong>Аналитические</strong> — помогают анализировать
              посещаемость и улучшать работу сайта
            </li>
          </ul>
          <p className={styles.sectionText}>
            Пользователь может отключить файлы cookie в настройках браузера,
            однако это может ограничить функциональность сайта.
          </p>
        </div>

        {/* Реквизиты компании */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Реквизиты компании</h2>
          <p className={styles.sectionText}>
            <strong>Полное наименование:</strong> Общество с ограниченной
            ответственностью «АВТО-СОЮЗ»
          </p>
          <p className={styles.sectionText}>
            <strong>Сокращённое наименование:</strong> ООО «АВТО-СОЮЗ»
          </p>
          <p className={styles.sectionText}>
            <strong>Юридический адрес:</strong> г. Красноярск, ул. ________________,
            д. ___, офис ___
          </p>
          <p className={styles.sectionText}>
            <strong>ИНН:</strong> ________________
          </p>
          <p className={styles.sectionText}>
            <strong>КПП:</strong> ________________
          </p>
          <p className={styles.sectionText}>
            <strong>ОГРН:</strong> ________________
          </p>
          <p className={styles.sectionText}>
            <strong>Р/с:</strong> ________________
          </p>
          <p className={styles.sectionText}>
            <strong>Банк:</strong> ________________
          </p>
          <p className={styles.sectionText}>
            <strong>БИК:</strong> ________________
          </p>
          <p className={styles.sectionText}>
            <strong>К/с:</strong> ________________
          </p>
          <p className={styles.sectionText}>
            <strong>Телефон:</strong> +7 (983) 163-82-09
          </p>
          <p className={styles.sectionText}>
            <strong>Email:</strong> info@avto-soyuz.ru
          </p>
        </div>

        <p className={styles.updated}>
          Последнее обновление: 12 мая 2026 года
        </p>
      </div>
    </div>
  );
}