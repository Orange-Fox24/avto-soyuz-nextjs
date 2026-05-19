// src/app/api/admin/applications/route.ts
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

    const [main, contact, partner] = await Promise.all([
      prisma.main_applications.findMany({ orderBy: { created_at: "desc" } }),
      prisma.contact_applications.findMany({ orderBy: { created_at: "desc" } }),
      prisma.partner_applications.findMany({ orderBy: { created_at: "desc" } }),
    ]);

    return NextResponse.json({ main, contact, partner });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}