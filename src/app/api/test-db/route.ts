import { NextResponse } from 'next/server';
import { query } from '@/lib/db-sqlite';

export async function GET() {
  try {
    const tables = await query("SELECT name FROM sqlite_master WHERE type='table'");
    return NextResponse.json({ 
      success: true, 
      message: 'SQLite работает!',
      tables: tables 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: 'Ошибка SQLite',
      error: error.message 
    }, { status: 500 });
  }
}