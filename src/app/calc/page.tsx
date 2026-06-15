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
  const [loading, setLoading] = useState(false);
  const [packaging, setPackaging] = useState(false);
  const [pickup, setPickup] = useState(false);
  const [urgency, setUrgency] = useState<"standard" | "express">("standard");
  const [result, setResult] = useState<{ price: number; breakdown: string[]; note: string } | null>(null);

  const cargoTypes = ["Прочее", "Стройматериалы", "Оборудование", "Продукты", "Мебель", "Одежда", "Автозапчасти"];

  const tariffs: Record<string, { label: string; price: number; km: number; days: string }> = {
    "красноярский край": { label: "Красноярский край", price: 2000, km: 100, days: "1-3" },
    "новосибирск": { label: "Новосибирск", price: 6000, km: 680, days: "2-3" },
    "иркутск": { label: "Иркутск", price: 5500, km: 1060, days: "2-3" },
    "москва": { label: "Москва и ЦФО", price: 15000, km: 4150, days: "6-9" },
    "санкт-петербург": { label: "Санкт-Петербург", price: 18000, km: 4700, days: "8-12" },
    "екатеринбург": { label: "Урал", price: 9000, km: 2300, days: "4-6" },
    "владивосток": { label: "Дальний Восток", price: 18000, km: 4500, days: "5-8" },
    "хабаровск": { label: "Хабаровск", price: 16000, km: 3800, days: "5-8" },
    "томск": { label: "Томск", price: 4500, km: 580, days: "2-3" },
    "кемерово": { label: "Кемерово", price: 4000, km: 530, days: "2-3" },
    "барнаул": { label: "Барнаул", price: 5500, km: 900, days: "2-3" },
    "омск": { label: "Омск", price: 7000, km: 1400, days: "3-5" },
    "казань": { label: "Казань", price: 12000, km: 3000, days: "5-7" },
    "краснодар": { label: "Краснодар", price: 17000, km: 4200, days: "7-10" },
    "сочи": { label: "Сочи", price: 18000, km: 4500, days: "7-10" },
    "калининград": { label: "Калининград", price: 22000, km: 5200, days: "10-14" },
    "самара": { label: "Самара", price: 13000, km: 3100, days: "5-7" },
    "уфа": { label: "Уфа", price: 11000, km: 2600, days: "5-7" },
    "челябинск": { label: "Челябинск", price: 9500, km: 2200, days: "4-6" },
    "ростов-на-дону": { label: "Ростов-на-Дону", price: 16000, km: 4000, days: "7-10" },
  };

  const calculate = () => {
    if (!fromCity || !toCity || !weight) return;
    setLoading(true);

    setTimeout(() => {
      const w = parseFloat(weight);
      const toLower = toCity.toLowerCase().trim();

      let tariff: { label: string; price: number; km: number; days: string } | null = null;
      for (const [city, t] of Object.entries(tariffs)) {
        if (toLower.includes(city) || city.includes(toLower)) {
          tariff = t;
          break;
        }
      }

      if (!tariff) {
        setResult({
          price: 0,
          breakdown: [
            "Для данного направления нет готового тарифа.",
            "Свяжитесь с менеджером для расчёта стоимости.",
            "+7 983 163 82 09",
          ],
          note: "Направление не найдено",
        });
        setLoading(false);
        return;
      }

      const breakdown: string[] = [];
      let distanceCoeff = 1;
      if (tariff.km > 4000) distanceCoeff = 1.4;
      else if (tariff.km > 2500) distanceCoeff = 1.2;
      else if (tariff.km > 1000) distanceCoeff = 1.1;

      const basePrice = Math.round(tariff.price * distanceCoeff);
      const pallets = Math.max(1, Math.ceil(w / 0.5));
      const transportPrice = basePrice * pallets;

      breakdown.push(`Перевозка: ${pallets} пал. × ${basePrice.toLocaleString()} ₽`);
      if (distanceCoeff > 1) breakdown.push(`(коэф. расстояния ×${distanceCoeff})`);

      let total = transportPrice;
      const hours = Math.ceil(w / 2);
      const loadingPrice = hours * 400;
      breakdown.push(`Погрузка/разгрузка: ${hours} ч × 400 ₽ = ${loadingPrice.toLocaleString()} ₽`);
      total += loadingPrice;

      if (pickup) {
        breakdown.push(`Забор груза: 1 000 ₽`);
        total += 1000;
      }
      if (packaging) {
        const pkg = Math.ceil(w / 0.1) * 200;
        breakdown.push(`Упаковка: ${pkg.toLocaleString()} ₽`);
        total += pkg;
      }
      if (urgency === "express") {
        const urg = Math.round(transportPrice * 0.75);
        breakdown.push(`Срочная доставка: ${urg.toLocaleString()} ₽`);
        total += urg;
      }
      if (total < 2000) total = 2000;

      setResult({
        price: total,
        breakdown,
        note: `${tariff.label} | ~${tariff.km} км | ${urgency === "express" ? "экспресс" : tariff.days} дн.`,
      });
      setLoading(false);
    }, 300);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Калькулятор стоимости</h1>
          <p className={styles.subtitle}>Рассчитайте примерную стоимость перевозки с учётом всех услуг</p>

          <div className={styles.form}>
            <div className={styles.formRow}>
              <AddressInput value={fromCity} onChange={setFromCity} placeholder="Откуда" label="Город отправки" required />
              <AddressInput value={toCity} onChange={setToCity} placeholder="Куда" label="Город назначения" required />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Вес груза (тонн) <span className={styles.required}>*</span></label>
                <input type="number" step="0.1" min="0.05" className={styles.input} placeholder="Например: 0.5" value={weight} onChange={(e) => setWeight(e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Тип груза</label>
                <select className={styles.select} value={cargoType} onChange={(e) => setCargoType(e.target.value)}>
                  {cargoTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className={styles.servicesBlock}>
              <p className={styles.servicesTitle}>Дополнительные услуги</p>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkbox} checked={packaging} onChange={(e) => setPackaging(e.target.checked)} />
                Упаковка груза (от 200 ₽/ед.)
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkbox} checked={pickup} onChange={(e) => setPickup(e.target.checked)} />
                Забор груза по городу (от 1 000 ₽)
              </label>
              <div className={styles.urgencyRow}>
                <span className={styles.urgencyLabel}>Срочность:</span>
                <label className={`${styles.radioLabel} ${urgency === "standard" ? styles.radioLabelActive : ""}`}>
                  <input type="radio" className={styles.radio} checked={urgency === "standard"} onChange={() => setUrgency("standard")} />
                  Стандарт
                </label>
                <label className={`${styles.radioLabel} ${urgency === "express" ? styles.radioLabelActive : ""}`}>
                  <input type="radio" className={styles.radio} checked={urgency === "express"} onChange={() => setUrgency("express")} />
                  Экспресс (+75%)
                </label>
              </div>
            </div>

            <button className={styles.calculateButton} onClick={calculate} disabled={!fromCity || !toCity || !weight || loading}>
              {loading ? "Расчёт..." : "Рассчитать стоимость"}
            </button>
          </div>

          {result && (
            <div className={styles.result}>
              {result.price > 0 ? (
                <>
                  <p className={styles.resultLabel}>Детализация расчёта</p>
                  <div className={styles.breakdown}>
                    {result.breakdown.map((line, i) => (
                      <div key={i} className={line.startsWith("(") ? styles.breakdownLineNote : styles.breakdownLine}>{line}</div>
                    ))}
                    <div className={styles.breakdownLineTotal}>Итого: {result.price.toLocaleString()} ₽</div>
                  </div>
                  <p className={styles.resultDetails}>{result.note}</p>
                </>
              ) : (
                <>
                  <p className={styles.resultLabel}>Направление не найдено</p>
                  <div className={styles.breakdown}>
                    {result.breakdown.map((line, i) => (
                      <div key={i} className={styles.breakdownLine}>{line}</div>
                    ))}
                  </div>
                </>
              )}
              <p className={styles.resultDisclaimer}>* Примерный расчёт. Точная стоимость определяется менеджером.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}