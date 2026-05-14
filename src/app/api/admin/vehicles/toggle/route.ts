// src/app/api/admin/vehicles/toggle/route.ts
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

    const { vehicleId, isAvailable } = await request.json();

    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { isAvailable },
    });

    return NextResponse.json({ message: "Статус обновлён" });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}