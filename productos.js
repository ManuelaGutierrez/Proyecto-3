const Sequelize = require ("sequelize");
const sequelize= new Sequelize("mysql://root:root@127.0.0.1:3306/pedidos");
module.exports = {

InsertarProducto: (req,res) => {
    const{
        nombre_producto,
        precio
    }=req.body;

    console.log(req.body)
    
sequelize.query('INSERT INTO producto (nombre_producto,precio) VALUES ("' + nombre_producto + '", "' + precio + '")', {
    type: sequelize.QueryTypes.INSERT
    }).then((resultado) => {
        res.json({ "Status": "Producto ingresado"});
    }).catch((e) => {
    res.json({ "Status": "Error" +e});
    });
},

 MostrarProducto: (req,res) => {
    sequelize.query ('select * from producto ', {
        type: sequelize.QueryTypes.select})
    .then(MostrarProducto =>{
        (MostrarProducto.lenght== 0) ?res.json({status:"no hay usuarios registrados"}) :res.json ({status:MostrarProducto});
    }).catch((e) => {
            res.json({ "Status": "Error" +e}) })
    
    },

ActualizarProducto: (req,res) => {
        const{
            nombre_producto,
            precio,
            id
        }=req.body;
        sequelize.query('update producto set precio =' +precio +', nombre_producto ="' + nombre_producto +'" where id = ' +id, { 
           type: sequelize.QueryTypes.Update
        }).then((resultado) => {
        res.json({ "Status": "Producto Actualizado" });
        }).catch((e) => {
        res.json({ "Status": "Error"+e });
        });
},
BorrarProducto: (req,res) => {

    const{
       id
    }=req.body;

sequelize.query('delete from producto where id = ' + id + '', {
    type: sequelize.QueryTypes.Delete
    }).then((resultado) => {
    res.json({ "Status": "Producto Eliminado" });
    }).catch(() => {
    res.json({ "Status": "Error" });
    });
},

ValidarProducto: (nombre_producto) =>{
    const resultado =  sequelize.query ('select nombre_producto from prodcuto where nombre_producto = "' + nombre_producto + '"',{
        type: sequelize.QueryTypes.select
    }).catch((error) => {
        console.log("error");
    });
    return resultado;
},
}
