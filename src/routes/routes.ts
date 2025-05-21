import { Router } from 'express';
import { db } from '../db';

const router = Router();

// POST /api/vendedor
router.post('/vendedor', async (req, res) => {
  try {
    const { nombre, salario } = req.body;
    const database = await db();
    const result = await database.run(
      'INSERT INTO vendedor (nombre, salario) VALUES (?, ?)',
      [nombre, salario]
    );
    res.json({ id: result.lastID });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/producto
router.post('/producto', async (req, res) => {
  try {
    const { nombre, tipo } = req.body;
    const database = await db();
    const result = await database.run(
      'INSERT INTO producto (nombre, tipo) VALUES (?, ?)',
      [nombre, tipo]
    );
    res.json({ id: result.lastID });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/venta
router.post('/venta', async (req, res) => {
  try {
    const { vendedorId, productoId, valor } = req.body;
    const database = await db();
    const result = await database.run(
      'INSERT INTO venta (vendedorId, productoId, valor) VALUES (?, ?, ?)',
      [vendedorId, productoId, valor]
    );
    res.json({ id: result.lastID });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/venta
router.get('/venta', async (req, res) => {
  const { filter } = req.query;

  try {
    const database = await db();

   const query = `
    SELECT venta.id, vendedor.nombre as vendedor, venta.valor, producto.nombre as producto, producto.tipo
    FROM venta
    JOIN vendedor ON venta.vendedorId = vendedor.id
    JOIN producto ON venta.productoId = producto.id
    WHERE vendedor.nombre LIKE '%${filter}%'
  `;

    const rows = await database.all(query);
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
