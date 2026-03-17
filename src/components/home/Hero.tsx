import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Левая часть с текстом - прижата к левому краю */}
          <div className={styles.textContent}>
            <p className={styles.title}>
              Компания <span className={styles.companyName}>«АВТО-СОЮЗ»</span> с
              момента своего основания делает особый упор на предоставление
              транспортных и логистических услуг для корпоративных клиентов.
            </p>

            <p className={styles.description}>
              Мы придерживаемся индивидуального подхода для удовлетворения
              потребностей бизнеса в грузоперевозках. Мы сделаем вам предложение
              исходя из ваших потребностей, учитывая все особенности бизнеса
              наших партнеров. Отправьте заявку, мы свяжемся с вами в течение 30
              минут в рабочее время.
            </p>
          </div>

          {/* Правая часть с картинкой */}
          <div className={styles.imageWrapper}>
            <Image
              src="/images/hero-truck.webp"
              alt="Грузовик компании АВТО-СОЮЗ"
              fill
              className={styles.image}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
