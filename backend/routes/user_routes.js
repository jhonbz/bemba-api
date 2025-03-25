const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const verificarToken = require("../middlewares/auth_middleware");


// Obtener información del usuario autenticado
router.get("/me", verificarToken, userController.getUserProfile);

// Actualizar datos del usuario autenticado
router.put("/me", verificarToken, userController.updateUserProfile);
router.get("/", userController.getAllUsers);
router.post("/login", userController.loginUser);

module.exports = router;
