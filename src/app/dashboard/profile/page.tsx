// src/app/dashboard/profile/page.tsx
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = {
    id: (session.user as any)?.id,
    name: session.user?.name || "",
    email: session.user?.email || "",
    role: (session.user as any)?.role || "CLIENT",
  };

  return <ProfileClient user={user} />;
}