const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/session_controller");

// Crear una nueva sesión
router.post("/", sessionController.createSession);

// Obtener todas las sesiones activas
router.get("/", sessionController.getAllSessions);

// Obtener una sesión específica por ID
router.get("/:id", sessionController.getSessionById);

// Actualizar una sesión (solo si es necesario)
router.put("/:id", sessionController.updateSession);

// Eliminar una sesión (solo si es necesario)
router.delete("/:id", sessionController.deleteSession);

module.exports = router;
