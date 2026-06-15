// src/app/api/profile/update/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const userId = (session.user as any)?.id;
    const body = await request.json();
    const { name, phone } = body;

    if (!name) {
      return NextResponse.json({ error: "Имя обязательно" }, { status: 400 });
    }

   
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, phone },
    });

    return NextResponse.json({
      message: "Профиль обновлён",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
      },
    });
  } catch (error: any) {
    console.error("Ошибка обновления профиля:", error);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}