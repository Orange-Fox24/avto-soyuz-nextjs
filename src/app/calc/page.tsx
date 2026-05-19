// src/app/calc/page.tsx
"use client";

import { useState } from "react";
import AddressInput from "@/components/ui/AddressInput";
import styles from "./Calc.module.css";

export default function CalcPage() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [weight, setWeight] = useState("");
  const [cargoType, setCargoType] = useState("Прочее");
  const [result, setResult] = useState<{
    price: number;
    distance: string;
    time: string;
  } | null>(null);

  const cargoTypes = [
    "Прочее",
    "Стройматериалы",
    "Оборудование",
    "Продукты",
    "Мебель",
    "Одежда",
    "Автозапчасти",
  ];

  const calculate = () => {
    if (!fromCity || !toCity || !weight) return;

    const tariffs: Record<string, number> = {
      "красноярский край": 2000,
      "ачинск": 2500,
      "канск": 3000,
      "новосибирск": 6000,
      "иркутск": 5500,
      "москва": 15000,
      "санкт-петербург": 18000,
      "екатеринбург": 9000,
      "казань": 12000,
      "владивосток": 18000,
      "хабаровск": 16000,
      "томск": 4500,
      "кемерово": 4000,
      "барнаул": 5500,
      "омск": 7000,
      "челябинск": 9500,
      "уфа": 11000,
      "самара": 13000,
      "ростов-на-дону": 16000,
      "краснодар": 17000,
      "сочи": 18000,
      "калининград": 22000,
    };

    const toLower = toCity.toLowerCase().trim();
    let basePrice = 10000;

    for (const [city, price] of Object.entries(tariffs)) {
      if (toLower.includes(city) || city.includes(toLower)) {
        basePrice = price;
        break;
      }
    }

    const weightNum = parseFloat(weight);
    const weightInKg = weightNum * 1000;
    const weightMultiplier = Math.max(0.2, weightInKg / 500);
    const price = Math.round(basePrice * weightMultiplier);

    // Примерное расстояние и время
    const distances: Record<string, { km: number; h: number }> = {
      "красноярский край": { km: 100, h: 3 },
      "новосибирск": { km: 680, h: 10 },
      "иркутск": { km: 1060, h: 15 },
      "москва": { km: 4150, h: 56 },
      "санкт-петербург": { km: 4700, h: 64 },
      "екатеринбург": { km: 2300, h: 32 },
      "владивосток": { km: 4500, h: 60 },
      "томск": { km: 580, h: 8 },
    };

    let distance = { km: 1000, h: 14 };
    for (const [city, d] of Object.entries(distances)) {
      if (toLower.includes(city)) {
        distance = d;
        break;
      }
    }

    setResult({
      price,
      distance: `${distance.km} км`,
      time: `~${distance.h} ч`,
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Калькулятор стоимости</h1>
          <p className={styles.subtitle}>
            Рассчитайте примерную стоимость перевозки груза
          </p>

          <div className={styles.form}>
            <div className={styles.formRow}>
              <AddressInput
                value={fromCity}
                onChange={setFromCity}
                placeholder="Откуда"
                label="Город отправки"
                required
              />
              <AddressInput
                value={toCity}
                onChange={setToCity}
                placeholder="Куда"
                label="Город назначения"
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Вес груза (тонн) <span className={styles.required}>*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  className={styles.input}
                  placeholder="Например: 1.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Тип груза</label>
                <select
                  className={styles.select}
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                >
                  {cargoTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className={styles.calculateButton}
              onClick={calculate}
              disabled={!fromCity || !toCity || !weight}
            >
              Рассчитать стоимость
            </button>
          </div>

          {result && (
            <div className={styles.result}>
              <p className={styles.resultLabel}>Примерная стоимость</p>
              <p className={styles.resultPrice}>
                {result.price.toLocaleString()} ₽
              </p>
              <p className={styles.resultDetails}>
                Расстояние: {result.distance} • Время в пути: {result.time}
              </p>
              <p className={styles.resultDisclaimer}>
                * Это примерный расчёт. Точная стоимость зависит от объёма груза,
                типа упаковки, срочности доставки и дополнительных услуг.
                Для получения точной цены оформите заказ или свяжитесь с менеджером.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}