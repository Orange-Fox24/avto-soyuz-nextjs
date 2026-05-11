// src/app/dashboard/orders/page.tsx
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import styles from "./Orders.module.css";

const statusLabels: Record<string, string> = {
  NEW: "Новая",
  ASSIGNED: "Назначен",
  LOADING: "Погрузка",
  IN_TRANSIT: "В пути",
  DELIVERED: "Доставлен",
  CANCELLED: "Отменён",
};

const statusStyles: Record<string, string> = {
  NEW: styles.statusNew,
  ASSIGNED: styles.statusAssigned,
  LOADING: styles.statusAssigned,
  IN_TRANSIT: styles.statusInTransit,
  DELIVERED: styles.statusDelivered,
  CANCELLED: styles.statusCancelled,
};

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userId = (session.user as any)?.id;

  let orders: any[] = [];

  try {
    orders = await prisma.order.findMany({
      where: { clientId: userId },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Ошибка загрузки заказов:", error);
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/dashboard" className={styles.backLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Назад в личный кабинет
        </Link>

        <div className={styles.header}>
          <h1 className={styles.title}>Мои заказы</h1>
          <Link href="/dashboard/orders/new" className={styles.addButton}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-12" />
            </svg>
            Создать заказ
          </Link>
        </div>

        {orders.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Откуда</th>
                  <th>Куда</th>
                  <th>Вес (т)</th>
                  <th>Тип груза</th>
                  <th>Статус</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any, index: number) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.fromCity}</td>
                    <td>{order.toCity}</td>
                    <td>{order.weight}</td>
                    <td>{order.cargoType}</td>
                    <td>
                      <span className={`${styles.status} ${statusStyles[order.status] || ""}`}>
                        {statusLabels[order.status] || order.status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString("ru-RU")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>У вас пока нет заказов</h2>
            <p className={styles.emptyText}>Создайте свой первый заказ на перевозку</p>
            <Link href="/dashboard/orders/new" className={styles.addButton}>
              Создать заказ
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}