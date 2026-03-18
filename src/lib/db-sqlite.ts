import Database from 'better-sqlite3';

const db = new Database('avto_soyuz.db');

// Создаем таблицы, если их нет
db.exec(`
  CREATE TABLE IF NOT EXISTS main_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT,
    from_city TEXT NOT NULL,
    to_city TEXT,
    phone TEXT,
    email TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contact_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT,
    phone TEXT NOT NULL,
    email TEXT,
    topic TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS partner_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT,
    phone TEXT NOT NULL,
    email TEXT,
    experience TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export function query(sql: string, params: any[] = []) {
  try {
    const stmt = db.prepare(sql);
    if (sql.trim().toUpperCase().startsWith('SELECT')) {
      return stmt.all(...params);
    } else {
      const result = stmt.run(...params);
      return { insertId: result.lastInsertRowid };
    }
  } catch (error) {
    console.error('Ошибка запроса:', error);
    throw error;
  }
}

export default db;