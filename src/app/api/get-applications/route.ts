import { NextResponse } from 'next/server';
import { query } from '@/lib/db-postgres';

export async function GET() {
  try {
    // Получаем все заявки из всех таблиц
    const mainApps = await query(`
      SELECT *, 'main' as source 
      FROM main_applications 
      ORDER BY created_at DESC
    `);
    
    const contactApps = await query(`
      SELECT *, 'contact' as source 
      FROM contact_applications 
      ORDER BY created_at DESC
    `);
    
    const partnerApps = await query(`
      SELECT *, 'partner' as source 
      FROM partner_applications 
      ORDER BY created_at DESC
    `);

    const allApplications = [
      ...(mainApps as any[]),
      ...(contactApps as any[]),
      ...(partnerApps as any[])
    ].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({ applications: allApplications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { applications: [] },
      { status: 200 }
    );
  }
}