import { NextResponse } from 'next/server';
import { query } from '@/lib/db-postgres';

export async function GET() {
  try {
    // Проверяем подключение и получаем список таблиц
    const tables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    // Пробуем получить количество записей в каждой таблице
    const mainCount = await query(`SELECT COUNT(*) as count FROM main_applications`);
    const contactCount = await query(`SELECT COUNT(*) as count FROM contact_applications`);
    const partnerCount = await query(`SELECT COUNT(*) as count FROM partner_applications`);

    return NextResponse.json({ 
      success: true, 
      message: 'PostgreSQL подключение работает!',
      tables: tables,
      counts: {
        main: mainCount[0]?.count || 0,
        contact: contactCount[0]?.count || 0,
        partner: partnerCount[0]?.count || 0
      }
    });
  } catch (error: any) {
    console.error('Ошибка PostgreSQL:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Ошибка подключения к PostgreSQL',
      error: error?.message || 'Неизвестная ошибка',
      code: error?.code
    }, { status: 500 });
  }
}