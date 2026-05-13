// src/app/driver/page.tsx
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import LogoutButton from "./LogoutButton";
import DriverTabs from "./DriverTabs";
import styles from "./Driver.module.css";

export default async function DriverPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const driverId = (session.user as any)?.id;

  const activeOrders = await prisma.order.findMany({
    where: { driverId, status: { notIn: ["DELIVERED", "CANCELLED"] } },
    orderBy: { createdAt: "desc" },
  });

  const completedOrders = await prisma.order.findMany({
    where: { driverId, status: "DELIVERED" },
    orderBy: { createdAt: "desc" },
    take: 20,
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
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <Link
              href="/driver/profile"
              style={{
                fontFamily: '"Wadik Bold", "Wadik", Arial, Helvetica, sans-serif',
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "#ffa20c",
                textDecoration: "none",
                padding: "0.75rem 1.5rem",
                border: "1px solid #ffa20c",
                borderRadius: "12px",
              }}
            >
              Профиль
            </Link>
            <LogoutButton />
          </div>
        </div>

        <DriverTabs
          activeOrders={JSON.parse(JSON.stringify(activeOrders))}
          completedOrders={JSON.parse(JSON.stringify(completedOrders))}
        />
      </div>
    </div>
  );
}