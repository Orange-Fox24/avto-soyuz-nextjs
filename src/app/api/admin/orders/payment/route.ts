// src/app/api/admin/orders/payment/route.ts
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

    const { orderId, isPaid } = await request.json();

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid,
        paidAt: isPaid ? new Date() : null,
      },
    });

    return NextResponse.json({ message: isPaid ? "Оплачен" : "Не оплачен", order });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}