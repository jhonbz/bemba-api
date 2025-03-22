require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");

const app = express();


app.use(express.json());
app.use(cors());
app.use(require('cors')());

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
        return;
    }
    console.log('Conectado a AWS RDS');
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de BEMBA!');
});

const authRoutes = require("./routes/auth_routes");
app.use("/api/auth", authRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

