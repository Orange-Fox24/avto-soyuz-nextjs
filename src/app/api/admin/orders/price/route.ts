// src/app/api/admin/orders/price/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "MANAGER") {
      return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
    }

    const { orderId, price } = await request.json();

    // Проверяем, не установлена ли уже точная цена
    const existing = await prisma.order.findUnique({ where: { id: orderId } });
    if (existing?.price && existing.price > 0) {
      return NextResponse.json({ error: "Цена уже установлена, изменение невозможно" }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { price: parseFloat(price) },
    });

    return NextResponse.json({ message: "Цена установлена", order });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}