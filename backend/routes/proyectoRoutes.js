import express from "express"

import {
    obtenerProyecto,
    nuevoProyectos,
    obtenerProyectos,
    editarProyecto,
    eliminarColaborador,
    agregarColaborador,
    eliminarProyecto,
} from "../controllers/proyectoControllers.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
    .route("/")
    .get(checkAuth, obtenerProyectos)
    .post(checkAuth, nuevoProyectos)

router
    .route("/:id")
    .get(checkAuth, obtenerProyecto)
    .put(checkAuth, editarProyecto)
    .delete(checkAuth, eliminarProyecto);

router.post("/agregar-colaborador/:id", checkAuth, agregarColaborador)
router.post('/eliminar-colaborador', checkAuth , eliminarColaborador)

export default router;