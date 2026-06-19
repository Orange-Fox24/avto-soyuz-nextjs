import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formType, ...data } = body;

    switch (formType) {
      case 'main':
        await prisma.main_applications.create({
          data: {
            name: data.name || '',
            company: data.company || '',
            from_city: data.fromCity || '',
            to_city: data.toCity || '',
            phone: data.phone || '',
            email: data.email || '',
            message: data.message || '',
          },
        });
        break;

      case 'contact':
        await prisma.contact_applications.create({
          data: {
            name: data.name || '',
            company: data.company || '',
            phone: data.phone || '',
            email: data.email || '',
            topic: data.topic || '',
            message: data.message || '',
          },
        });
        break;

      case 'partner':
        await prisma.partner_applications.create({
          data: {
            name: data.name || '',
            company: data.company || '',
            phone: data.phone || '',
            email: data.email || '',
            experience: data.experience || '',
            message: data.message || '',
          },
        });
        break;

      default:
        return NextResponse.json({ error: 'Неизвестный тип формы' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Заявка успешно отправлена!' });
  } catch (error) {
    console.error('Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}