import { Router } from "express";
import { validar } from "../controllers/autenticacion.js";

const rutaAutemnticacion = Router()

rutaAutemnticacion.post("/validarAutenticacion", validar)

export default rutaAutemnticacion