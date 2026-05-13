// src/app/api/admin/drivers/toggle-leave/route.ts
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

    const { driverId } = await request.json();

    const driver = await prisma.user.findUnique({ where: { id: driverId } });
    if (!driver || driver.role !== "DRIVER") {
      return NextResponse.json({ error: "Водитель не найден" }, { status: 404 });
    }

    const updated = await prisma.user.update({
      where: { id: driverId },
      data: { isOnLeave: !driver.isOnLeave },
    });

    return NextResponse.json({
      message: updated.isOnLeave ? "Водитель в отпуске" : "Водитель доступен",
      driver: { id: updated.id, name: updated.name, isOnLeave: updated.isOnLeave },
    });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}