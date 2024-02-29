import { pool } from "../databases/conexion.js";
import jwt, { decode } from "jsonwebtoken";

export const validar = async (req, res)=>{

    try {
              
    let {login, password} = req.body
    let sql= `SELECT idusuario, nombres, rol  FROM usuarios where correo='${login}' and password='${password}'`

    const [rows] = await pool.query(sql)
    
    if(rows.length >0)
    {
        let token = jwt.sign({rows}, process.env.AUT_SECRET, {expiresIn:process.env.AUT_EXPIRE})

        return res.status(200).json({'user':rows, 'token':token, 'mensaje':'se pudo :)'}); 
    }  

    else
    {
        return res.status(400).json({'status':404, 'mensage':"usuario no autoirizado"})
    }

    } catch (error) 
    {
        return res.status(500).json({'mensage':"error" + error})
    }
}

export const validarToken = async (req, res, next) =>{
    
    let tokenCliente = req.headers['token']

    if(!tokenCliente){
        return res.status(404).json({ 'mensaje':'Token es requerido :('}); 
    }else{
        const token = jwt.verify(tokenCliente, process.env.AUT_SECRET, (error, decode) => {
            if(error){
                return res.status(404).json({ 'mensaje':'Token incorrecto :('}); 
            }
            else{
                next()
            }
        })
    }
}