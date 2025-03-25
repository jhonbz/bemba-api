const express = require("express");
const router = express.Router();
const { register } = require("../controllers/auth_controller");

// Ruta para registrar usuario
router.post("/register", register);

module.exports = router;
