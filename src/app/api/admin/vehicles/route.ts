// src/app/api/admin/vehicles/route.ts
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

    const vehicles = await prisma.vehicle.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ vehicles });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "MANAGER") {
      return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
    }

    const { brand, model, plateNumber, type, capacity } = await request.json();

    if (!brand || !model || !plateNumber) {
      return NextResponse.json({ error: "Марка, модель и госномер обязательны" }, { status: 400 });
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        brand,
        model,
        plateNumber,
        type: type || "Тент",
        capacity: capacity ? parseFloat(capacity) : 5,
      },
    });

    return NextResponse.json({ message: "Транспорт добавлен", vehicle }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}