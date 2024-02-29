import { pool } from "../databases/conexion.js"
import { validationResult } from "express-validator"

export const listarUsuarios = async (req, res) =>{
    try {
        let sql = `select * from usuarios`
        const[resultado] = await pool.query(sql)

        if( resultado.length > 0)
        {
             res.status(200).json(resultado)
        }
        else
        {
            res.status(484).send({'mesage': 'error conexion'})
        }
    } catch (error) {
        res.status(500).json({"status": 500, "mesage": "error" + error})
    }
}



    export const registarUsuarios = async (req, res) =>{
        try {

            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json(errors)
            }

            const {nombres, direccion, telefono, correo, rol, password} = req.body
            let sql =  `insert into usuarios (nombres, direccion, telefono, correo, rol, password) values (?, ?, ?, ?, ?, ?)`
            const[rows] = await pool.query(sql,[nombres, direccion, telefono, correo, rol, password])

            if(rows.affectedRows > 0){
                res.status(200).send({'mesage': 'Hola ya sirvo'})
            }
            else
            {
                res.status(484).send({'mesage': 'No se registro ningun usuario'})
            }
        } catch (error) {
            res.status(500).json({"status": 500, "mesage": "error" + error})
        }
    }


    /* export const actualizarUsuario = async (req, res) =>{
        try {
            let {id} = req.params
    
            const {nombres, direccion, telefono, correo, rol} = req.body
            
            let sql=`UPDATE usuarios SET nombres=IFNULL(?,nombres),direccion=IFNULL(?,direccion),  telefono=IFNULL(?, telefono), correo=IFNULL(?, correo), rol=IFNULL(?,rol)  WHERE idusuario =?`
    
            const [rows] = await pool.query(sql, [nombres, direccion, telefono, correo, rol,id])
    
            if(rows.affectedRows > 0)
                res.status(200).json({'status': 200, 'message': 'Felicidades, La actualizacion del usuario fue un exito'})
    
            else
            res.status(404).json({'status': 404, 'message': 'Error, La actualizacion fue denegada'})
        } 
        catch (error) 
        {
            res.status(500).json({'status': 500, 'message': 'ERROR SERVIDOR' + error})
        }
    }


    export const buscarUsuarios = async (req, res) =>{
        try {
            let {id} = req.params
            let sql = `select from usuarios where idusuario = ${id}`
            const[resultado] = await pool.query(sql)
    
            if( resultado.length > 0)
            {
                 res.status(200).json(resultado)
            }
            else
            {
                res.status(484).send({'mesage': 'NO SE ENCUENTRA USUARIOS'})
            }
        } catch (error) {
            res.status(500).json({"status": 500, "mesage": "ERROR SERVIDOR" + error})
        }
    }


    export const eliminarUsuarios = async (req, res) =>{
        try {
            let {id} = req.params
            let sql = `delete from usuarios where idusuario = ${id}`
            const[resultado] = await pool.query(sql)
    
            if( resultado.length > 0)
            {
                res.status(200).json({'status': 200, 'message': 'Se elimino el usuario exitasamente'})
            }
            else
            {
                res.status(484).send({'mesage': 'ERROR EL USUARIO NO SE PUDO ELIMINAR'})
            }
        } catch (error) {
            res.status(500).json({"status": 500, "mesage": "ERROR SERVIDOR" + error})
        }
    } */