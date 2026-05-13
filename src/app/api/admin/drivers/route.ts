// src/app/api/admin/drivers/route.ts
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

    const drivers = await prisma.user.findMany({
      where: { role: "DRIVER" },
      select: { id: true, name: true, email: true, isOnLeave: true },
      orderBy: { name: "asc" },
    });

    const driversWithOrders = await Promise.all(
      drivers.map(async (driver) => {
        const activeOrders = await prisma.order.count({
          where: {
            driverId: driver.id,
            status: { in: ["ASSIGNED", "LOADING", "IN_TRANSIT"] },
          },
        });
        return { ...driver, activeOrders };
      })
    );

    return NextResponse.json({ drivers: driversWithOrders });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}