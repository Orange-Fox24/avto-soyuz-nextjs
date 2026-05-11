// src/app/dashboard/page.tsx
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import LogoutButton from "./LogoutButton";
import styles from "./Dashboard.module.css";

const statusLabels: Record<string, string> = {
  NEW: "Новая",
  ASSIGNED: "Назначен",
  LOADING: "Погрузка",
  IN_TRANSIT: "В пути",
  DELIVERED: "Доставлен",
  CANCELLED: "Отменён",
};

const statusStyles: Record<string, string> = {
  NEW: styles.statusNew || "",
  ASSIGNED: styles.statusAssigned || "",
  LOADING: styles.statusAssigned || "",
  IN_TRANSIT: styles.statusInTransit || "",
  DELIVERED: styles.statusDelivered || "",
  CANCELLED: styles.statusCancelled || "",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userId = (session.user as any)?.id;
  const userRole = (session.user as any)?.role;
  const userName = session.user?.name || session.user?.email;

  // Получаем последние 5 заказов
  const recentOrders = await prisma.order.findMany({
    where: { clientId: userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const totalOrders = await prisma.order.count({
    where: { clientId: userId },
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Личный кабинет</h1>
            <p className={styles.welcome}>
              Добро пожаловать, {userName}!{" "}
              <span className={styles.role}>
                {userRole === "CLIENT" && "(Клиент)"}
                {userRole === "MANAGER" && "(Менеджер)"}
                {userRole === "DRIVER" && "(Водитель)"}
              </span>
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* Карточки действий */}
        <div className={styles.grid}>
          <Link href="/dashboard/orders" className={styles.card}>
            <div className={styles.cardIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Мои заказы</h3>
            <p className={styles.cardText}>
              Просмотр и отслеживание статуса ваших заказов ({totalOrders})
            </p>
          </Link>

          <Link href="/dashboard/orders/new" className={styles.card}>
            <div className={styles.cardIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Создать заказ</h3>
            <p className={styles.cardText}>
              Оформить новую заявку на грузоперевозку
            </p>
          </Link>

          <Link href="/dashboard/profile" className={styles.card}>
            <div className={styles.cardIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Профиль</h3>
            <p className={styles.cardText}>
              Редактирование личных данных и контактной информации
            </p>
          </Link>
        </div>

        {/* Последние заказы */}
        <div style={{ marginTop: "2rem" }}>
          {recentOrders.length > 0 ? (
            <div className={styles.emptyState} style={{ textAlign: "left", padding: "1.5rem" }}>
              <h2 style={{ fontFamily: '"Actay Wide Bold", "Actay Wide", "Actay", Arial, Helvetica, sans-serif', fontSize: "1.25rem", color: "#0f0f0f", marginBottom: "1rem" }}>
                Последние заказы
              </h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "0.5rem", fontFamily: '"Actay Wide", "Actay", Arial, Helvetica, sans-serif', fontSize: "0.85rem", color: "#6b7280", borderBottom: "1px solid #e5e7eb" }}>Откуда</th>
                    <th style={{ textAlign: "left", padding: "0.5rem", fontFamily: '"Actay Wide", "Actay", Arial, Helvetica, sans-serif', fontSize: "0.85rem", color: "#6b7280", borderBottom: "1px solid #e5e7eb" }}>Куда</th>
                    <th style={{ textAlign: "left", padding: "0.5rem", fontFamily: '"Actay Wide", "Actay", Arial, Helvetica, sans-serif', fontSize: "0.85rem", color: "#6b7280", borderBottom: "1px solid #e5e7eb" }}>Вес</th>
                    <th style={{ textAlign: "left", padding: "0.5rem", fontFamily: '"Actay Wide", "Actay", Arial, Helvetica, sans-serif', fontSize: "0.85rem", color: "#6b7280", borderBottom: "1px solid #e5e7eb" }}>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order: any) => (
                    <tr key={order.id}>
                      <td style={{ padding: "0.5rem", fontFamily: '"Actay", Arial, Helvetica, sans-serif', fontSize: "0.9rem", borderBottom: "1px solid #f3f4f6" }}>{order.fromCity}</td>
                      <td style={{ padding: "0.5rem", fontFamily: '"Actay", Arial, Helvetica, sans-serif', fontSize: "0.9rem", borderBottom: "1px solid #f3f4f6" }}>{order.toCity}</td>
                      <td style={{ padding: "0.5rem", fontFamily: '"Actay", Arial, Helvetica, sans-serif', fontSize: "0.9rem", borderBottom: "1px solid #f3f4f6" }}>{order.weight} т</td>
                      <td style={{ padding: "0.5rem", borderBottom: "1px solid #f3f4f6" }}>
                        <span style={{
                          display: "inline-block",
                          fontFamily: '"Wadik Bold", "Wadik", Arial, Helvetica, sans-serif',
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "8px",
                          backgroundColor: 
                            order.status === "NEW" ? "#dbeafe" :
                            order.status === "ASSIGNED" || order.status === "LOADING" ? "#fef3c7" :
                            order.status === "IN_TRANSIT" ? "#e0e7ff" :
                            order.status === "DELIVERED" ? "#d1fae5" : "#fee2e2",
                          color:
                            order.status === "NEW" ? "#1e40af" :
                            order.status === "ASSIGNED" || order.status === "LOADING" ? "#92400e" :
                            order.status === "IN_TRANSIT" ? "#3730a3" :
                            order.status === "DELIVERED" ? "#065f46" : "#991b1b",
                        }}>
                          {statusLabels[order.status] || order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {totalOrders > 5 && (
                <div style={{ marginTop: "1rem", textAlign: "center" }}>
                  <Link href="/dashboard/orders" style={{ fontFamily: '"Wadik Bold", "Wadik", Arial, Helvetica, sans-serif', fontWeight: 700, color: "#ffa20c", textDecoration: "none" }}>
                    Все заказы ({totalOrders}) →
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h2 className={styles.emptyTitle}>У вас пока нет активных заказов</h2>
              <p className={styles.emptyText}>
                Создайте свой первый заказ на перевозку груза
              </p>
              <Link href="/dashboard/orders/new" className={styles.primaryButton}>
                Создать заказ
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}