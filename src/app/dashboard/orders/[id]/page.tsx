// src/app/dashboard/orders/[id]/page.tsx
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CancelButton from "../CancelButton";
import styles from "./OrderDetail.module.css";

const statusLabels: Record<string, string> = {
  NEW: "Новая",
  ASSIGNED: "Назначен",
  LOADING: "Погрузка",
  IN_TRANSIT: "В пути",
  DELIVERED: "Доставлен",
  CANCELLED: "Отменён",
};

const statusStyleMap: Record<string, string> = {
  NEW: styles.statusNew,
  ASSIGNED: styles.statusAssigned,
  LOADING: styles.statusAssigned,
  IN_TRANSIT: styles.statusInTransit,
  DELIVERED: styles.statusDelivered,
  CANCELLED: styles.statusCancelled,
};

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { id } = await params;
  const userId = (session.user as any)?.id;

  const order = await prisma.order.findFirst({
    where: { id, clientId: userId },
    include: {
      driver: { select: { name: true, phone: true } },
    },
  });

  if (!order) redirect("/dashboard/orders");

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/dashboard/orders" className={styles.backLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Назад к заказам
        </Link>

        <div className={styles.card}>
          <h1 className={styles.title}>Детали заказа</h1>

          <p className={styles.route}>
            {order.fromCity} → {order.toCity}
          </p>

          <div className={styles.grid}>
            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Статус</p>
              <span className={`${styles.status} ${statusStyleMap[order.status] || ""}`}>
                {statusLabels[order.status] || order.status}
              </span>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Вес</p>
              <p className={styles.infoValue}>{order.weight} т</p>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Тип груза</p>
              <p className={styles.infoValue}>{order.cargoType}</p>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Цена</p>
              <p className={styles.infoValue}>{order.price ? `${order.price.toLocaleString()} ₽` : "Ожидает уточнения"}</p>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Оплата</p>
              <p className={styles.infoValue}>{order.isPaid ? "Оплачен" : "Не оплачен"}</p>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Водитель</p>
              <p className={styles.infoValue}>{order.driver?.name || "Не назначен"}</p>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Телефон водителя</p>
              <p className={styles.infoValue}>{order.driver?.phone || "—"}</p>
            </div>

            <div className={styles.infoBlock}>
              <p className={styles.infoLabel}>Дата создания</p>
              <p className={styles.infoValue}>{new Date(order.createdAt).toLocaleDateString("ru-RU")}</p>
            </div>

            {order.desiredDate && (
              <div className={styles.infoBlock}>
                <p className={styles.infoLabel}>Желаемая дата доставки</p>
                <p className={styles.infoValue}>{new Date(order.desiredDate).toLocaleDateString("ru-RU")}</p>
              </div>
            )}
          </div>

          {order.comment && (
            <div className={styles.comment}>
              <strong>Комментарий:</strong> {order.comment}
            </div>
          )}

          {order.status === "NEW" && (
            <>
              <hr className={styles.divider} />
              <CancelButton orderId={order.id} status={order.status} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}