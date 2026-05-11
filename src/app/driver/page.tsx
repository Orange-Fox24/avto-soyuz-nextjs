// src/app/driver/page.tsx
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LogoutButton from "./LogoutButton";
import DriverOrdersClient from "./DriverOrdersClient";
import styles from "./Driver.module.css";

export default async function DriverPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const driverId = (session.user as any)?.id;

  const orders = await prisma.order.findMany({
    where: {
      driverId: driverId,
      status: { not: "DELIVERED" },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Мои рейсы</h1>
            <p className={styles.subtitle}>
              Добро пожаловать, {session.user?.name}!{" "}
              <span className={styles.role}>(Водитель)</span>
            </p>
          </div>
          <LogoutButton />
        </div>

        <DriverOrdersClient orders={JSON.parse(JSON.stringify(orders))} />
      </div>
    </div>
  );
}