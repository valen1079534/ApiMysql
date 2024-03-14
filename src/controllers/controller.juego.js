import { pool } from "../databases/conexion.js";
import { query } from "express";
import multer from "multer";

//ALMACENAR IMAGEN
const storage = multer.diskStorage(
    {
        destination: function(req,img,cb){
            cb(null, "public/img")
        },

        filename: function(req,img,cb){
            cb(null,img.originalname)
        }
    }
)

const upload = multer({storage:storage})
export const cargarImagen= upload.single('img')


//REGISTRAR JUEGO
export const guardarJuego = async (req, res) =>{
    try {

        const {nombre, descripcion, precio} = req.body
        let imagen = req.file.originalname

        let sql = `INSERT INTO juegos (nombre, descripcion, imagen, precio) VALUES ( ?, ?, ?, ?)`;

        const [rows] = await pool.query(sql,[nombre, descripcion, imagen, precio])

        if(rows.affectedRows>0){
            res.status(200).json({'mesage':'Registro exitosamente'})
        }else{
            res.status(400).json({'message':'No registrado'})
        }

    } catch (error) {
        res.status(400).json({'message':'error servidor' + error})
    }
}