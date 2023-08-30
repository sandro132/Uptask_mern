import express from "express";
const router = express.Router();
import { 
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken
} from "../controllers/usuarioController.js"

// Autenticacion, Registro y confirmacion de Usuarios

router.post("/", registrar)
router.post("/login", autenticar)
router.get("/confirmar/:token", confirmar)
router.post("/olvide-password", olvidePassword);
router.get("/olvide-password/:token", comprobarToken);

export default router;