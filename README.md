# Логистическая платформа для ООО "АВТО-СОЮЗ"
![NextJS](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)

## О проекте
Разработка фронтенд-части информационной системы для автоматизации управления логистической компанией. Реализованы два интерфейса: публичный сайт и личный кабинет клиента.

## Ролевая модель
- **Гость** - просмотр информации, услуг, формы связи, авторизация
- **Клиент** - личный кабинет, история заказов, отслеживание грузов
- **Водитель** - *(в разработке)* мобильный интерфейс для принятия заказов

## Технологии
- **Framework:** Next.js 15 (App Router)
- **Стилизация:** Tailwind CSS / CSS Modules
- **База данных:** PostgreSQL (через API routes)
- **Аутентификация:** NextAuth.js / JWT
- **Деплой:** Vercel

## Установка и запуск

```bash
# Клонировать репозиторий
git clone https://github.com/your-username/avto-soyuz-nextjs-frontend

# Установить зависимости
npm install

# Настроить переменные окружения
cp .env.example .env.local

# Запустить dev сервер
npm run dev
