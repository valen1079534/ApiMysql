import express  from "express";
import body_parser from "body-parser";
import router from "./src/routers/router.usuario.js";
import rutaAutemnticacion from "./src/routers/router.autenticacion.js";

const servidor = express()

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extended:true}))


//PLANTILLA PARA UTILIZAR EN EJS 
//PARA INSTALAR EN LA CONSOLA EL EJS, UTILIZAR (NPM INSTALL EJS)
servidor.set('view engine', 'ejs')


//dECLARACION DE RUTA, DONDE SE ENCUNETRA CITUADO NUESTRO VIEWS
servidor.set('views','./views')


servidor.use(express.static('./public')) //se utiliza para que los archivos estaticos se puedan ver en la carpeta public



//ESPECIFICACION DE LAS RUTAS 
servidor.get('/document', (req, res)=>{
    //ESPECIFICAR LA RUTA DEL DOCUMENTO, DONDE SE ENCUENTRA NUESTRO DOCUMENT
    res.render('document.ejs')
})

servidor.use(rutaAutemnticacion)
servidor.use('/usuarios', router)

servidor.listen(5000, ()=>{
    console.log('Servidor Corriendo en el puerto 8000')
})