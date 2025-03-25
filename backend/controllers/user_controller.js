const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Clave secreta para generar tokens (debería estar en variables de entorno)
const SECRET_KEY = process.env.JWT_SECRET;

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuarios" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    // El ID del usuario autenticado está en req.user (del token JWT)
    const user = await User.findByPk(req.user.id, { attributes: ["id", "nombre", "email"] });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error obteniendo perfil:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { nombre, email } = req.body;

    // Buscar usuario autenticado
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar datos si se enviaron
    if (nombre) user.nombre = nombre;
    if (email) user.email = email;

    await user.save();

    res.json({ message: "Perfil actualizado correctamente", user });
  } catch (error) {
    console.error("Error actualizando perfil:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};