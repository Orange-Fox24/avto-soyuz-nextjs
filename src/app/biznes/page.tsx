import Link from "next/link";
import Image from "next/image";
import styles from "./Biznes.module.css";

const biznesItems = [
  {
    title: "Тарифы и сроки",
    description:
      "Прозрачное ценообразование и четкие временные обязательства по доставке грузов.",
    icon: "/icons/tariffs.svg",
    href: "/biznes/tarify",
  },
  {
    title: "Специальные предложения",
    description:
      "Выгодные условия, скидки и временные предложения для клиентов компании.",
    icon: "/icons/special.svg",
    href: "/biznes/special",
  },
  {
    title: "Партнерам",
    description:
      "Возможности делового сотрудничества и партнерские программы для совместного развития бизнеса.",
    icon: "/icons/partners.svg",
    href: "/biznes/partneram",
  },
  {
    title: "Документы",
    description:
      "Вся необходимая документация для юридического оформления перевозок, от заключения договора до разрешения спорных ситуаций.",
    icon: "/icons/documents.svg",
    href: "/biznes/dokumenty",
  },
  {
    title: "Информация",
    description:
      "Исчерпывающее руководство по всем этапам работы — от отправки до получения, с ответами на частые вопросы клиентов.",
    icon: "/icons/info.svg",
    href: "/biznes/informaciya",
  },
];

export default function BiznesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {biznesItems.map((item, index) => (
            <Link key={index} href={item.href} className={styles.card}>
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{item.title}</h2>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
              <div className={styles.cardIcon}>
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={130}
                  height={130}
                  className={styles.icon}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
