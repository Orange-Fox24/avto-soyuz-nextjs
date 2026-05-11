// src/app/api/driver/orders/status/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "DRIVER") {
      return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
    }

    const driverId = (session.user as any)?.id;
    const { orderId, status } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json({ error: "Не указан заказ или статус" }, { status: 400 });
    }

    // Проверяем, что заказ принадлежит этому водителю
    const order = await prisma.order.findFirst({
      where: { id: orderId, driverId },
    });

    if (!order) {
      return NextResponse.json({ error: "Заказ не найден" }, { status: 404 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return NextResponse.json({ message: "Статус обновлён", order: updatedOrder });
  } catch (error) {
    console.error("Ошибка:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}