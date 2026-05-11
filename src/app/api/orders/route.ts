// src/app/api/orders/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET — получить заказы пользователя
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const userId = (session.user as any)?.id;
    const userRole = (session.user as any)?.role;

    let orders;

    if (userRole === "CLIENT") {
      // Клиент видит только свои заказы
      orders = await prisma.order.findMany({
        where: { clientId: userId },
        orderBy: { createdAt: "desc" },
      });
    } else if (userRole === "MANAGER") {
      // Менеджер видит все заказы
      orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
      });
    } else if (userRole === "DRIVER") {
      // Водитель видит назначенные ему заказы
      orders = await prisma.order.findMany({
        where: { driverId: userId },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json({ orders: orders || [] });
  } catch (error: any) {
    console.error("Ошибка получения заказов:", error);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}

// POST — создать заказ
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const userId = (session.user as any)?.id;
    const body = await request.json();
    const { fromCity, toCity, weight, cargoType, desiredDate, comment } = body;

    // Валидация
    if (!fromCity || !toCity || !weight) {
      return NextResponse.json(
        { error: "Город отправки, город назначения и вес обязательны" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        clientId: userId,
        fromCity,
        toCity,
        weight: parseFloat(weight),
        cargoType: cargoType || "Прочее",
        desiredDate: desiredDate ? new Date(desiredDate) : null,
        comment: comment || "",
        status: "NEW",
      },
    });

    return NextResponse.json({ message: "Заказ создан", order }, { status: 201 });
  } catch (error: any) {
    console.error("Ошибка создания заказа:", error);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}