// src/app/api/driver/problem/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "DRIVER") {
      return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
    }

    const { orderId, problem } = await request.json();

    // Добавляем комментарий о проблеме к заказу
    await prisma.order.update({
      where: { id: orderId },
      data: {
        comment: `ПРОБЛЕМА: ${problem} (${new Date().toLocaleString("ru-RU")})`,
      },
    });

    console.log(`\n=== ПРОБЛЕМА ВОДИТЕЛЯ ===`);
    console.log(`Заказ: ${orderId}`);
    console.log(`Проблема: ${problem}`);
    console.log(`===========================\n`);

    return NextResponse.json({ message: "Проблема зафиксирована" });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}