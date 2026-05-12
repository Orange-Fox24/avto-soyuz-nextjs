// src/app/api/forgot-password/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Введите email" }, { status: 400 });
    }

    // Ищем пользователя
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Пользователь с таким email не найден" },
        { status: 404 }
      );
    }

    // Генерируем токен (6 цифр)
    const token = crypto.randomInt(100000, 999999).toString();
    const expires = new Date(Date.now() + 30 * 60 * 1000); // 30 минут

    // Сохраняем токен в базе (добавим поле resetToken позже, пока логируем)
    console.log(`\n=== ВОССТАНОВЛЕНИЕ ПАРОЛЯ ===`);
    console.log(`Email: ${email}`);
    console.log(`Токен: ${token}`);
    console.log(`Действителен до: ${expires.toLocaleString()}`);
    console.log(`Ссылка: http://localhost:3000/reset-password?token=${token}&email=${email}`);
    console.log(`================================\n`);

    // Для диплома — показываем токен в ответе
    return NextResponse.json({
      message: "Токен отправлен (для демо показываем в ответе)",
      token: token,
      resetUrl: `/reset-password?token=${token}&email=${encodeURIComponent(email)}`,
    });
  } catch (error) {
    console.error("Ошибка:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}