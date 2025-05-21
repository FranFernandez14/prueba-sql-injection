import express from 'express';
import routes from './routes/routes';
import { db } from './db';

async function startServer() {
  // Esperamos que la base de datos esté lista y las tablas creadas
  await db();

  const app = express();
  app.use(express.json());

  app.use('/api', routes);

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/api`);
  });
}

startServer().catch((err) => {
  console.error('Error iniciando el servidor:', err);
});
