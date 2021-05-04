const Sequelize = require ("sequelize");
const sequelize= new Sequelize("mysql://root:root@127.0.0.1:3306/pedidos");
const {codificar} = require('./seguridad');
module.exports = {

ValidarUsuario:(nombreusuario)=>{
    const resultado = sequelize.query ('select nombreusuario from usuarios where nombreusuario = "' + nombreusuario + '"',{
        type: sequelize.QueryTypes.SELECT
    })
},
InsertarUsuario: (req,res) =>{
    const{
        nombreusuario,
        nombrecompleto,
        correo,
        celular,
        direccion,
        contraseña,
        rol
    }=req.body;

sequelize.query('INSERT INTO Usuarios (nombreusuario,nombrecompleto,correo,celular,direccion,contraseña,rol) VALUES ("' + nombreusuario + '", "' + nombrecompleto + '", "' + correo + '", "' + celular + '", "' + direccion + '","' + contraseña + '","' + rol + '")', {
    type: sequelize.QueryTypes.INSERT
    }).then((resultado) => {
        console.log (resultado);
        const usuarioId = resultado[0];
        const Token = codificar( nombreusuario, contraseña, rol, usuarioId);
        res.json({ estado: "Usuario registrado", Token: Token });
    }).catch((error) => {
    res.json({"estado":error});
    });
},
ValidarUsuarioContra: (req,res) =>{
    const{
        nombreusuario,
        contraseña
     
    }=req.body;
   
    var query = 'select id,rol from usuarios where nombreusuario = "'+ nombreusuario + '" and contraseña ="'+ contraseña+'"'
    sequelize.query (query, {
        type: sequelize.QueryTypes.SELECT
        }).then(respuestavalidar => {
            if(respuestavalidar.length == 1){
                const {id,rol} = respuestavalidar [0];
                const Token = codificar( nombreusuario, contraseña, rol);
                (Token) ?res.json({status:"Usuario autenticado",Token}) :res.json ({status:"Usuario no autenticado"});
            } else{res.json ({status:"Usuario o clave inválida"});

            }
        }).catch((e) => {
        res.json({ "Status": "Error" +e}) });

},

MostrarUsuarios: (req,res) => {
    sequelize.query ('select * from usuarios',{
        type: sequelize.QueryTypes.select})
    .then(MostrarUsuarios =>{
        (MostrarUsuarios.lenght== 0) ?res.json({status:"No hay usuarios registrados"}) :res.json ({status:MostrarUsuarios});
    }).catch((e) => {
            res.json({ "Status": "Error" +e}) })
    
    },
    MostrarSeccionUsu:(req,res) => {
    const id = res.locals.usuario;

    console.log(res.locals)

    sequelize.query ('select * from usuarios where id = '+ id +'',{
type: sequelize.QueryTypes.select})
.then(mostrarusuario =>{
    (mostrarusuario.lenght== 0) ?res.json({status:"No hay usuarios registrados"}) :res.json ({status:mostrarusuario});
    }).catch((e) => {
            res.json({ "Status": "Error" +e}) })
    
    },
}