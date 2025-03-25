require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");
const authRoutes = require("./routes/auth_routes");
const sessionRoutes = require("./routes/session_routes");
const userRoutes = require("./routes/user_routes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Configurar conexión con AWS RDS
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1); // Detiene el servidor si no hay conexión
    }
    console.log('Conectado a AWS RDS');
});

// Rutas
app.get('/', (req, res) => res.send('¡Bienvenido a la API de BEMBA!'));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sessions", sessionRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
