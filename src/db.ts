import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const db = async () => {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  await db.exec(`CREATE TABLE IF NOT EXISTS vendedor (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  salario REAL NOT NULL
)`);

  await db.exec(`CREATE TABLE IF NOT EXISTS producto (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  tipo TEXT NOT NULL
)`);

  await db.exec(`CREATE TABLE IF NOT EXISTS venta (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vendedorId INTEGER NOT NULL,
  productoId INTEGER NOT NULL,
  valor REAL NOT NULL,
  FOREIGN KEY (vendedorId) REFERENCES vendedor(id),
  FOREIGN KEY (productoId) REFERENCES producto(id)
)`);
  return db;
};
