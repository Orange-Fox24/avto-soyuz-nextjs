"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Услуги", href: "/services" },
    { name: "Сервисы", href: "/calc" },
    { name: "Бизнесу и частным лицам", href: "/biznes" },
    { name: "О компании", href: "/o-kompanii" },
    { name: "Контакты", href: "/kontakty" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* Логотип слева */}
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo.png"
            alt="АВТО-СОЮЗ"
            width={300}
            height={120}
            className={styles.logoImage}
            priority
          />
        </Link>

        {/* Десктопное меню */}
        <nav className={styles.nav}>
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className={styles.navLink}>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Правая часть с иконками */}
        <div className={styles.rightSection}>
          {/* Иконка телефона */}
          <a href="tel:+79831638209" className={styles.iconLink}>
            <Image
              src="/icons/phone.svg"
              alt="Телефон"
              width={32}
              height={32}
              className={styles.icon}
            />
          </a>

          {/* Иконка ЛК */}
          <Link href="/login" className={styles.iconLink}>
            <Image
              src="/icons/profile.svg"
              alt="Личный кабинет"
              width={32}
              height={32}
              className={styles.icon}
            />
          </Link>

          {/* Мобильное меню (бургер) */}
          <button
            className={styles.burgerButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={styles.burgerIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Мобильное меню (выпадающее) */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuInner}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={styles.mobileNavLink}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
