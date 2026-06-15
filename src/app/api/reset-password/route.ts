// src/app/api/reset-password/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { token, email, password } = await request.json();

    if (!token || !email || !password) {
      return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Пароль должен быть минимум 6 символов" }, { status: 400 });
    }


    // Хешируем новый пароль
    const hashedPassword = await bcrypt.hash(password, 12);

    // Обновляем пользователя
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Пароль успешно изменён" });
  } catch (error) {
    console.error("Ошибка:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}