import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Проверяем, идет ли запрос к админке
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Пропускаем страницу логина
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // Проверяем наличие cookie с авторизацией
    const isAuthenticated = request.cookies.get('admin_auth')?.value === 'true';
    
    // Если не авторизован, перенаправляем на страницу входа
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};