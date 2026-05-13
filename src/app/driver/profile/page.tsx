// src/app/driver/profile/page.tsx
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProfileClient from "./ProfileClient";

export default async function DriverProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if ((session.user as any)?.role !== "DRIVER") redirect("/driver");

  const userId = (session.user as any)?.id;

  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, phone: true, role: true, isOnLeave: true },
  });

  if (!dbUser) redirect("/login");

  return <ProfileClient user={JSON.parse(JSON.stringify(dbUser))} />;
}