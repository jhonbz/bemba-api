const { Session } = require("../models");

// Crear una nueva sesión
exports.createSession = async (req, res) => {
  try {
    const { titulo, descripcion, url_youtube, estado } = req.body;

    if (!titulo || !url_youtube) {
      return res.status(400).json({ message: "Título y URL de YouTube son obligatorios" });
    }

    const nuevaSesion = await Session.create({ titulo, descripcion, url_youtube, estado });
    res.status(201).json({ message: "Sesión creada exitosamente", session: nuevaSesion });
  } catch (error) {
    console.error("Error creando sesión:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener todas las sesiones activas
exports.getAllSessions = async (req, res) => {
  try {
    const sesiones = await Session.findAll({ where: { estado: "Activa" } });
    res.json(sesiones);
  } catch (error) {
    console.error("Error obteniendo sesiones:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener una sesión por ID
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Sesión no encontrada" });
    }
    res.json(session);
  } catch (error) {
    console.error("Error obteniendo sesión:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Actualizar una sesión (opcional)
exports.updateSession = async (req, res) => {
  try {
    const { titulo, descripcion, url_youtube, estado } = req.body;
    const session = await Session.findByPk(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Sesión no encontrada" });
    }

    session.titulo = titulo || session.titulo;
    session.descripcion = descripcion || session.descripcion;
    session.url_youtube = url_youtube || session.url_youtube;
    session.estado = estado || session.estado;

    await session.save();
    res.json({ message: "Sesión actualizada", session });
  } catch (error) {
    console.error("Error actualizando sesión:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Eliminar una sesión (opcional)
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Sesión no encontrada" });
    }

    await session.destroy();
    res.json({ message: "Sesión eliminada correctamente" });
  } catch (error) {
    console.error("Error eliminando sesión:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
