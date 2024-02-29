import { Router } from "express";
import { listarUsuarios, registarUsuarios } from "../controllers/controller.usuario.js";
import { validarUsuario } from "../../validate/usuario.js";
import { validarToken } from "../controllers/autenticacion.js";


const router = Router()

router.get('/listar', validarToken,listarUsuarios)

router.post('/registra',validarUsuario, registarUsuarios)




/* router.put("/actualizar/:id", actualizarUsuario)
router.get("/buscar/:id", buscarUsuarios)
router.delete( "/eliminar/:id", eliminarUsuarios)  */

export default router