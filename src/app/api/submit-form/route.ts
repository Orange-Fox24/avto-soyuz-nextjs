import { NextResponse } from 'next/server';
import { query } from '@/lib/db-postgres';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formType, ...data } = body;

    let sql = '';
    let params: any[] = [];

    switch (formType) {
      case 'main':
        sql = `INSERT INTO main_applications 
               (name, company, from_city, to_city, phone, email, message) 
               VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
        params = [data.name, data.company, data.fromCity, data.toCity, data.phone, data.email, data.message];
        break;

      case 'contact':
        sql = `INSERT INTO contact_applications 
               (name, company, phone, email, topic, message) 
               VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
        params = [data.name, data.company, data.phone, data.email, data.topic, data.message];
        break;

      case 'partner':
        sql = `INSERT INTO partner_applications 
               (name, company, phone, email, experience, message) 
               VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
        params = [data.name, data.company, data.phone, data.email, data.experience, data.message];
        break;

      default:
        return NextResponse.json(
          { error: 'Неизвестный тип формы' },
          { status: 400 }
        );
    }

    const result = await query(sql, params);
    
    return NextResponse.json({ 
      success: true, 
      id: result[0]?.id,
      message: 'Заявка успешно отправлена!' 
    });

  } catch (error) {
    console.error('Ошибка:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}