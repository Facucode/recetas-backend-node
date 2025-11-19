import 'dotenv/config';
import Server from './models/server.js';
console.log("Iniciando app.js...");
const server = new Server();
console.log("Server creado.");
server.listen();
console.log("Después del listen.");
