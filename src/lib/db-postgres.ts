import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'avto_soyuz',
  max: 10,
  idleTimeoutMillis: 30000,
});

export async function query(sql: string, params?: any[]) {
  try {
    const result = await pool.query(sql, params);
    return result.rows;
  } catch (error) {
    console.error('Ошибка запроса:', error);
    throw error;
  }
}

export default pool;