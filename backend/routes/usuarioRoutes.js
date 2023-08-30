import express from "express";
const router = express.Router();
import { registrar, autenticar } from "../controllers/usuarioController.js"

// Autenticacion, Registro y confirmacion de Usuarios

router.post("/", registrar)
router.post("/login", autenticar)

export default router;