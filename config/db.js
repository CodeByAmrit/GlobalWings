const Database = require('better-sqlite3');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const dbPath =
  process.env.DB_PATH ||
  path.resolve(__dirname, '../database/globalwings.sqlite');

const db = new Database(dbPath);

// Better-sqlite3 is synchronous.
// We provide a similar interface to mysql2/promise for compatibility.
const pool = {
  execute: async (sql, params = []) => {
    try {
      const stmt = db.prepare(sql);
      if (sql.trim().toLowerCase().startsWith('select')) {
        const rows = stmt.all(params);
        return [rows];
      } else {
        const info = stmt.run(params);
        return [{ ...info, insertId: info.lastInsertRowid }];
      }
    } catch (error) {
      console.error('Database Error:', error);
      throw error;
    }
  },
  query: async (sql, params = []) => {
    return pool.execute(sql, params);
  },
  getConnection: async () => {
    return {
      execute: pool.execute,
      release: () => {}, // No-op for SQLite
    };
  },
};

module.exports = {
  pool,
  db, // Export raw db for advanced cases if needed
};
