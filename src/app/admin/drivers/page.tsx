// src/app/admin/drivers/page.tsx
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import styles from "./Drivers.module.css";

export default async function DriversPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const drivers = await prisma.user.findMany({
    where: { role: "DRIVER" },
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: { name: "asc" },
  });

  // Считаем активные заказы для каждого водителя
  const driversWithOrders = await Promise.all(
    drivers.map(async (driver) => {
      const activeOrders = await prisma.order.count({
        where: {
          driverId: driver.id,
          status: { in: ["ASSIGNED", "LOADING", "IN_TRANSIT"] },
        },
      });
      return { ...driver, activeOrders };
    })
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/admin" className={styles.backLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Назад в панель менеджера
        </Link>

        <h1 className={styles.title}>Водители</h1>

        {driversWithOrders.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Имя</th>
                  <th>Email</th>
                  <th>Активных заказов</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {driversWithOrders.map((driver: any, index: number) => (
                  <tr key={driver.id}>
                    <td>{index + 1}</td>
                    <td>{driver.name || "Без имени"}</td>
                    <td>{driver.email}</td>
                    <td>{driver.activeOrders}</td>
                    <td>
                      <span className={`${styles.status} ${driver.activeOrders === 0 ? styles.free : styles.busy}`}>
                        {driver.activeOrders === 0 ? "Свободен" : "Занят"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>Нет водителей</h2>
            <p className={styles.emptyText}>Зарегистрированные водители появятся здесь</p>
          </div>
        )}
      </div>
    </div>
  );
}