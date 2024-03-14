import { Router } from "express";
import { cargarImagen, guardarJuego } from "../controllers/controller.juego.js";

const juegoRuta = Router()

juegoRuta.post("/juegoRuta", cargarImagen, guardarJuego)

export default  juegoRuta;