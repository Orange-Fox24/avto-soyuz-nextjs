import Image from "next/image";
import styles from "./WhyUs.module.css";

const advantages = [
  {
    icon: "/icons/special-conditions.svg",
    text: "Специальные условия",
  },
  {
    icon: "/icons/personal-manager.svg",
    text: "Персональный менеджер",
  },
  {
    icon: "/icons/implant-office.svg",
    text: "Имплант-офис",
  },
  {
    icon: "/icons/documents-return.svg",
    text: "Возврат документов",
  },
  {
    icon: "/icons/it-solutions.svg",
    text: "IT-решения",
  },
  {
    icon: "/icons/responsible-storage.svg",
    text: "Ответственное хранение",
  },
];

export default function WhyUs() {
  return (
    <section className={styles.whyUs}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Почему <span className={styles.companyName}>«АВТО-СОЮЗ»</span>
        </h2>

        <div className={styles.grid}>
          {advantages.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <Image
                  src={item.icon}
                  alt={item.text}
                  width={80}
                  height={80}
                  className={styles.icon}
                />
              </div>
              <p className={styles.text}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
