// src/app/biznes/dokumenty/page.tsx
"use client";

import styles from "./Dokumenty.module.css";

const documents = [
  {
    id: 1,
    title: "Договор на перевозку груза",
    description:
      "Типовой договор для заключения между заказчиком и перевозчиком",
    type: "PDF",
    file: "/documents/dogovor-perevozka.pdf",
  },
  {
    id: 2,
    title: "Заявка на перевозку",
    description: "Форма заявки для оформления заказа на транспортировку груза",
    type: "PDF",
    file: "/documents/zayavka-perevozka.pdf",
  },
  {
    id: 3,
    title: "Транспортная накладная",
    description:
      "Основной перевозочный документ, подтверждающий заключение договора перевозки",
    type: "PDF",
    file: "/documents/transportnaya-nakladnaya.pdf",
  },
  {
    id: 4,
    title: "Акт приёма-передачи груза",
    description:
      "Документ, подтверждающий факт передачи груза от отправителя перевозчику",
    type: "PDF",
    file: "/documents/akt-priema.pdf",
  },
  {
    id: 5,
    title: "Доверенность на получение груза",
    description:
      "Форма доверенности для представителя на получение товарно-материальных ценностей",
    type: "PDF",
    file: "/documents/doverennost.pdf",
  },
  {
    id: 6,
    title: "Претензия о возмещении ущерба",
    description:
      "Образец претензии при утрате, недостаче или повреждении груза",
    type: "PDF",
    file: "/documents/pretenziya.pdf",
  },
  {
    id: 7,
    title: "Политика конфиденциальности",
    description:
      "Порядок обработки и защиты персональных данных клиентов компании",
    type: "PDF",
    file: "/documents/politika-konfidencialnosti.pdf",
  },
  {
    id: 8,
    title: "Правила перевозки грузов",
    description:
      "Общие правила и условия оказания транспортно-экспедиционных услуг",
    type: "PDF",
    file: "/documents/pravila-perevozki.pdf",
  },
  {
    id: 9,
    title: "Тарифы на перевозку",
    description: "Актуальные тарифные ставки на грузоперевозки по направлениям",
    type: "XLSX",
    file: "/documents/tarify.xlsx",
  },
];

export default function DokumentyPage() {
  const handleDownload = (file: string, title: string) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = title + "." + file.split(".").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Документы</h1>
        <p className={styles.description}>
          Вся необходимая документация для юридического оформления перевозок, от
          заключения договора до разрешения спорных ситуаций.
        </p>

        <div className={styles.grid}>
          {documents.map((doc) => (
            <div key={doc.id} className={styles.card}>
              <div className={styles.cardIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>{doc.title}</h3>
              <p className={styles.cardText}>{doc.description}</p>
              <button
                onClick={() => handleDownload(doc.file, doc.title)}
                className={styles.cardButton}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Скачать {doc.type}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
