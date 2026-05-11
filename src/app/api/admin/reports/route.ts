// src/app/api/admin/reports/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "MANAGER") {
      return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
    }

    // Общая статистика
    const totalOrders = await prisma.order.count();
    const newOrders = await prisma.order.count({ where: { status: "NEW" } });
    const inProgress = await prisma.order.count({
      where: { status: { in: ["ASSIGNED", "LOADING", "IN_TRANSIT"] } },
    });
    const delivered = await prisma.order.count({ where: { status: "DELIVERED" } });
    const cancelled = await prisma.order.count({ where: { status: "CANCELLED" } });

    // Топ водителей по выполненным заказам
    const topDrivers = await prisma.user.findMany({
      where: { role: "DRIVER" },
      select: {
        id: true,
        name: true,
        email: true,
        _count: {
          select: { driverOrders: true },
        },
      },
      orderBy: {
        driverOrders: { _count: "desc" },
      },
      take: 5,
    });

    // Последние заказы
    const recentOrders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        fromCity: true,
        toCity: true,
        weight: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      stats: {
        totalOrders,
        newOrders,
        inProgress,
        delivered,
        cancelled,
      },
      topDrivers: topDrivers.map((d) => ({
        name: d.name || d.email,
        completed: d._count.driverOrders,
      })),
      recentOrders,
    });
  } catch (error) {
    console.error("Ошибка отчётов:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}