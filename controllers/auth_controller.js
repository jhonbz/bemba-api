const bcrypt = require("bcrypt");
const { User } = require("../models"); // Importamos el modelo de usuario

// Función para registrar un usuario
const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Validación de datos
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const userExistente = await User.findOne({ where: { email } });
    if (userExistente) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario en la base de datos
    const nuevoUsuario = await User.create({
      nombre,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Usuario registrado exitosamente", usuario: nuevoUsuario });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { register };
