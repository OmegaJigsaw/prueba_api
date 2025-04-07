import express from 'express';
import 'dotenv/config';
import productoRouter from './src/routes/producto-routes.js';
import categoriaRouter from './src/routes/categoria-routes.js';

const app = express();

const APP_PORT = process.env.APP_PORT || 3000;

app.use(express.json());

app.use('/api/productos', productoRouter);
app.use('/api/categorias', categoriaRouter);

app.listen(APP_PORT, () => {
    console.log('Server corriendo en puerto: ', APP_PORT);
})