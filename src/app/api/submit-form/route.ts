import { NextResponse } from 'next/server';
import { query } from '@/lib/db-sqlite';

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
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
        params = [data.name, data.company, data.fromCity, data.toCity, data.phone, data.email, data.message];
        break;
      case 'contact':
        sql = `INSERT INTO contact_applications 
               (name, company, phone, email, topic, message) 
               VALUES (?, ?, ?, ?, ?, ?)`;
        params = [data.name, data.company, data.phone, data.email, data.topic, data.message];
        break;
      case 'partner':
        sql = `INSERT INTO partner_applications 
               (name, company, phone, email, experience, message) 
               VALUES (?, ?, ?, ?, ?, ?)`;
        params = [data.name, data.company, data.phone, data.email, data.experience, data.message];
        break;
    }

    const result: any = await query(sql, params);
    
    return NextResponse.json({ 
      success: true, 
      id: result.insertId,
      message: 'Заявка успешно отправлена!' 
    });

  } catch (error) {
    console.error('Ошибка:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка на сервере' },
      { status: 500 }
    );
  }
}