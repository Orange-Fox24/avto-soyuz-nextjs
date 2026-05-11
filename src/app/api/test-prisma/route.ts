// src/app/api/test-prisma/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      success: true,
      message: "Prisma работает!",
      userCount: userCount,
    });
  } catch (error) {
    console.error("Prisma error:", error);
    return NextResponse.json({
      success: false,
      error: "Ошибка подключения к БД через Prisma",
    }, { status: 500 });
  }
}