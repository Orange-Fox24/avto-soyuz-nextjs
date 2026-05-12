"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Reviews.module.css";

const reviews = [
  {
    text: "Работаем с АВТО-СОЮЗом с 2023 года. Никогда не подводили. Особенно ценим человеческое отношение, всегда идут навстречу, если нужны срочные перевозки. Рекомендую как надежного перевозчика.",
    author: "Халявин Даниил",
    position: 'руководитель компании ООО "ПИЛОН"',
    logo: "/logos/pilon.svg",
  },
  {
    text: "Обратились в АВТО-СОЮЗ по рекомендации партнёров. Приятно удивлены скоростью обработки заявок — менеджер перезвонил через 15 минут. Груз доставили точно в срок, документы оформлены без ошибок. Теперь на постоянной основе работаем.",
    author: "Морозова Елена",
    position: 'директор по логистике ООО "СИБТРЕЙД"',
    logo: "/logos/sibtrade.svg",
  },
  {
    text: "За три года сотрудничества ни одной сорванной поставки. Отдельное спасибо диспетчерам — всегда на связи, решают вопросы оперативно. С АВТО-СОЮЗом мы закрыли все перевозки по Сибири и Дальнему Востоку. Отличный партнёр.",
    author: "Григорьев Павел",
    position: 'генеральный директор ООО "ТРАНСЛОГИСТИК"',
    logo: "/logos/translogistik.svg",
  },
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Отзывы</h2>

        <div className={styles.reviewContainer}>
          <div className={styles.reviewCard}>
            <p className={styles.reviewText}>{reviews[currentIndex].text}</p>
            <div className={styles.reviewFooter}>
              <div>
                <div className={styles.reviewAuthor}>
                  {reviews[currentIndex].author}
                </div>
                <div className={styles.reviewPosition}>
                  {reviews[currentIndex].position}
                </div>
              </div>
              <div className={styles.logoWrapper}>
                <Image
                  src={reviews[currentIndex].logo}
                  alt="Логотип компании"
                  fill
                  className={styles.logoImage}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.dots}>
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Перейти к отзыву ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
