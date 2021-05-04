const {ValidarUsuario,MostrarUsuarios,MostrarSeccionUsu,} = require('./clientes');
const{ValidarProducto} =require('./productos');
const {Descodificar} = require('./seguridad');
const{MostrarPedidoUsu,MostrarPedidoAdmin} = require ('./pedidos');

module.exports ={
ValidarDatos:(req,res,next) => {
    
    const{
        nombreusuario,
        nombrecompleto,
        estado,
        direccion,
        correo,
        contraseña,
        celular
    }=req.body;
    if (nombreusuario!=""&&nombrecompleto!=""&&estado!=""&&direccion!=""&&correo!=""&&contraseña!=""&&celular!=""){
        next()   
    } else {
        res.json({ "Status": "Ingresar datos" });
    }
},
ValidarDatosIngresadosLogin: (req,res,next) =>{
    const{
        nombreusuario,
        contraseña
    }=req.body;
    if (nombreusuario!=""&&contraseña!=""){
        next()   
    } else {
        res.json({ "Status": "Ingresar datos" });
    }
},

ValidarPermisos: async (req,res,next) => {

    const Token = req.headers.autenticacion;

    if (!Token) {
        res.json({status: "Token inválido"})
    }
    else{
        const usuario = Descodificar(Token);
        
        if (!usuario){
           return res.json({estado: "No cuentas con permisos"})
        }
        else {
            const {
                id,
                rol
            } = usuario;


           if(rol == "admin"){
            switch (req.path) {
        case 'CrearProducto':
        const {
            nombre_producto
        } = req.body;
      
        await ValidarProducto(nombre_producto)
        .then (respuestavalidar => {
            if (respuestavalidar.length == 0){
                next ();
            }else{
                res.json({status:"Producto ya está registrado"})
            }
        }).catch((error) => {
            res.json ({
            status:"error: " + error }) 
        })
            break; 
        case '/ValidarPermisos':
            MostrarPedidoAdmin(req,res);
            break;
            
        case'/IngresarUsuario':
        MostrarUsuarios (req,res);
            break;
    
            default:next();
            break;
        }
    } else {
       
       switch (req.path){
           case '/MostrarProducto':
               next ();
               break;

           case '/CrearPedido':
            next ();
            break;
            
            case '/Usuario':
                console.log("-->" + id)
                res.locals.usuario = id;
                MostrarSeccionUsu(req,res)
                break;


                case'/ValidarPermisos':
                res.locals.usuario = id;
                console.log(usuario)
                MostrarPedidoUsu(req,res)
                break;
                
                default: res.json ({status: "No cuentas con persmisos"})
                break;
       }
    }
    }
}
},
}
