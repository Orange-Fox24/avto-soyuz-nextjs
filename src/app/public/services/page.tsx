import Link from "next/link";
import Image from "next/image";
import styles from "./Services.module.css";

const services = [
  {
    title: "Грузоперевозки",
    description:
      "Полный цикл транспортных услуг — от посылок до промышленных грузов, с учетом специфики разных отраслей бизнеса.",
    icon: "/icons/truck.svg",
    href: "/public/services/gruzoperevozki",
  },
  {
    title: "Дополнительные услуги",
    description:
      "Дополнительные сервисы для максимального удобства — заберем груз у вас, поможем с погрузкой и доставим точно к назначенному времени.",
    icon: "/icons/additional.svg",
    href: "/public/services/dop-uslugi",
  },
  {
    title: "Складные услуги",
    description:
      "Комплекс складских услуг, включающий безопасное хранение, профессиональную упаковку и бесплатный складской сервис в рамках комплексных логистических решений.",
    icon: "/icons/warehouse.svg",
    href: "/public/services/skladskie-uslugi",
  },
  {
    title: "Направления",
    description:
      "Географическое покрытие включает внутренние перевозки по России и ключевые направления в страны-соседи с полным логистическим и таможенным сопровождением.",
    icon: "/icons/directions.svg",
    href: "/public/services/napravleniya",
  },
];

export default function ServicesPage() {
  return (
    <div className={styles.servicesPage}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {services.map((service, index) => (
            <Link key={index} href={service.href} className={styles.card}>
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{service.title}</h2>
                <p className={styles.cardDescription}>{service.description}</p>
              </div>
              <div className={styles.cardIcon}>
                <Image
                  src={service.icon}
                  alt={service.title}
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
