// src/app/login/layout.tsx
import { Suspense } from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div>Загрузка...</div>}>{children}</Suspense>;
}