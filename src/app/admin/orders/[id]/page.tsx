import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
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

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      client: { select: { name: true, email: true, phone: true } },
      driver: { select: { name: true, phone: true } },
    },
  });

  if (!order) redirect("/admin/orders");

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/admin/orders" className={styles.backLink}>
          ← Назад к заказам
        </Link>
        <div className={styles.card}>
          <h1 className={styles.title}>Детали заказа</h1>
          <p className={styles.route}>{order.fromCity} → {order.toCity}</p>
          <div className={styles.grid}>
            <div className={styles.infoBlock}><p className={styles.infoLabel}>Статус</p><span className={`${styles.status} ${statusStyleMap[order.status]}`}>{statusLabels[order.status]}</span></div>
            <div className={styles.infoBlock}><p className={styles.infoLabel}>Вес</p><p className={styles.infoValue}>{order.weight} т</p></div>
            <div className={styles.infoBlock}><p className={styles.infoLabel}>Тип груза</p><p className={styles.infoValue}>{order.cargoType}</p></div>
            <div className={styles.infoBlock}><p className={styles.infoLabel}>Цена</p><p className={styles.infoValue}>{order.price ? `${order.price.toLocaleString()} ₽` : "—"}</p></div>
            <div className={styles.infoBlock}><p className={styles.infoLabel}>Оплата</p><p className={styles.infoValue}>{order.isPaid ? "Оплачен" : "Не оплачен"}</p></div>
            <div className={styles.infoBlock}><p className={styles.infoLabel}>Клиент</p><p className={styles.infoValue}>{order.client?.name || order.client?.email || "—"}</p></div>
            <div className={styles.infoBlock}><p className={styles.infoLabel}>Телефон клиента</p><p className={styles.infoValue}>{order.client?.phone || "—"}</p></div>
            <div className={styles.infoBlock}><p className={styles.infoLabel}>Водитель</p><p className={styles.infoValue}>{order.driver?.name || "Не назначен"}</p></div>
            <div className={styles.infoBlock}><p className={styles.infoLabel}>Телефон водителя</p><p className={styles.infoValue}>{order.driver?.phone || "—"}</p></div>
            <div className={styles.infoBlock}><p className={styles.infoLabel}>Дата создания</p><p className={styles.infoValue}>{new Date(order.createdAt).toLocaleDateString("ru-RU")}</p></div>
          </div>
          {order.comment && <div className={styles.comment}><strong>Комментарий:</strong> {order.comment}</div>}
        </div>
      </div>
    </div>
  );
}