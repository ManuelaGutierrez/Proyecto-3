const express = require('express');
const app = express ();
app.use(express.json());
const PORT = 5000;

/////////////////SWAGGER
const swaggerUI=require ("swagger-ui-express")
const swaggerDocument=require("./swagger.json");
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument))

/////////////////MIDDLEWARE
const {InsertarUsuario,ValidarUsuarioContra,MostrarUsuarios} = require('./clientes');
const{InsertarProducto,MostrarProducto,ActualizarProducto,BorrarProducto} =require('./productos');
const{InsertarPedido,ActualizarPedido,EliminarPedido} = require ('./pedidos');
const {ValidarDatos,ValidarDatosIngresadosLogin,ValidarPermisos} = require('./midleware');
////////////////CLIENTES
app.post('/IngresarUsuario',ValidarDatos,InsertarUsuario);
app.post ('/login',ValidarDatosIngresadosLogin,ValidarUsuarioContra);
app.get ('/MostrarUsuario',ValidarPermisos,MostrarUsuarios);
////////////////PRODUCTOS
app.post('/CrearProducto',ValidarPermisos,InsertarProducto);  
app.put('/ActualizarProducto',ValidarPermisos,ActualizarProducto);
app.delete('/EliminarProducto',ValidarPermisos,BorrarProducto);
app.get('/MostrarProducto',ValidarPermisos,MostrarProducto);
/////////////////PEDIDOS
app.post('/CrearPedido',InsertarPedido);
app.get ('/ValidarPermisos',ValidarPermisos);
app.put ('/ActualizarPedido',ValidarPermisos,ActualizarPedido);
app.delete('/EliminarPedido',ValidarPermisos,EliminarPedido);

app.listen(PORT,()=>console.log("Servidor funcionando" + PORT));




