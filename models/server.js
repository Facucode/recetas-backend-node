import express from 'express';
import cors from 'cors';
import recetasRoutes from '../routes/recetas.js';
import authRoutes from '../routes/auth.js';

import dbConnection from '../database/config.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.recetasPath = '/api/recipes';
        this.authPath = '/api/auth';
        this.connectDB();

        this.middlewares();

        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        }));

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.recetasPath, recetasRoutes);
        this.app.use(this.authPath, authRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

export default Server;