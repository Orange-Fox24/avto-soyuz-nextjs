"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Stats.module.css";

interface StatItemProps {
  end: number;
  label: string;
  suffix?: string;
}

const stats = [
  { end: 17, label: "лет успешной работы", suffix: "" },
  { end: 120, label: "городов присутствия", suffix: "" },
  { end: 8500, label: "населенных пунктов доставки", suffix: "" },
  { end: 45000, label: "выполненных заказов", suffix: "" },
  { end: 8, label: "часовых поясов", suffix: "" },
];

function StatItem({ end, label, suffix = "" }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    let timer: NodeJS.Timeout;

    const updateCount = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        timer = setTimeout(updateCount, 16);
      } else {
        setCount(end);
      }
    };

    updateCount();

    return () => clearTimeout(timer);
  }, [isVisible, end]);

  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div ref={itemRef} className={styles.statItem}>
      <div className={styles.number}>
        {formattedCount}
        {suffix}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              end={stat.end}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
