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
      orders = await prisma.order.findMany({
        where: { clientId: userId },
        orderBy: { createdAt: "desc" },
      });
    } else if (userRole === "MANAGER") {
      orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
      });
    } else if (userRole === "DRIVER") {
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

    if (!fromCity || !toCity || !weight) {
      return NextResponse.json(
        { error: "Город отправки, город назначения и вес обязательны" },
        { status: 400 }
      );
    }

    const price = calculatePrice(fromCity, toCity, parseFloat(weight));

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
        price,
      },
    });

    return NextResponse.json({ message: "Заказ создан", order }, { status: 201 });
  } catch (error: any) {
    console.error("Ошибка создания заказа:", error);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}

function calculatePrice(from: string, to: string, weight: number): number {
  const fromLower = from.toLowerCase().trim();
  const toLower = to.toLowerCase().trim();

  // Базовые тарифы за 1 палету (~500 кг) из Красноярска
  const tariffs: Record<string, number> = {
    "красноярский край": 2000,
    "ачинск": 2500,
    "канск": 3000,
    "новосибирск": 6000,
    "иркутск": 5500,
    "москва": 15000,
    "санкт-петербург": 18000,
    "екатеринбург": 9000,
    "казань": 12000,
    "владивосток": 18000,
    "хабаровск": 16000,
    "томск": 4500,
    "кемерово": 4000,
    "барнаул": 5500,
    "омск": 7000,
    "челябинск": 9500,
    "уфа": 11000,
    "самара": 13000,
    "ростов-на-дону": 16000,
    "краснодар": 17000,
    "сочи": 18000,
    "калининград": 22000,
  };

  // Ищем подходящий тариф
  let basePrice = 10000; 

  for (const [city, price] of Object.entries(tariffs)) {
    if (toLower.includes(city) || city.includes(toLower)) {
      basePrice = price;
      break;
    }
  }

  // Коэффициент веса: базовая цена за 500 кг, дальше пропорционально
  const weightInKg = weight * 1000; 
  const weightMultiplier = Math.max(0.2, weightInKg / 500); 

  return Math.round(basePrice * weightMultiplier);
}