const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('config');

//mysql
const conn = require('./database/db.js');
//puerto
const puerto = config.get('servidor.puerto');
const PORT = process.env.PORT || puerto

//app
const app = express();

//respuesta del servidor
let respuesta = {
  error: false,
  codigo: 0,
  mensaje: '',
  parametro: '',
}

const urlencodedParser = bodyParser.urlencoded({extended: true});
app.use(bodyParser.json()) // for parsing application/json
const jsonParser = bodyParser.json();

app.get('/productos', (req, res) => {
  conn.connect(() => {
    conn.query('SELECT * FROM db_producto', (err, result) => {
      if(err){
          let respuestaServidor = {
            codigo: respuesta.codigo = 500,
            error: respuesta.error = err,
            mensaje: respuesta.mensaje = 'no se tienen datos'
          }
          res.send(respuestaServidor);
      }else{
        //res.send(result);
        let respuestaServidor = {
          codigo: respuesta.codigo = 200,
          error: respuesta.error = false,
          mensaje: respuesta.mensaje = result
        }
        res.send(respuestaServidor);
      }
    })
  })

})

app.post('/ingresarproductos', urlencodedParser, (req, res) => {
  
  //se ingresan productos parametro query para pasar datos por url 
  //ejm: http://localhost:5000/ingresarproductos?nombre=prueba1&descripcion=descripcionDeLaprueba1&categoria=prueba1&cantidad=1200&precio=100
  let post = {
    nombre: req.query.nombre,
    descripcion: req.query.descripcion,
    categoria: req.query.categoria,
    cantidad: req.query.cantidad,
    precio: req.query.precio
  }
  //console.log(post);

  conn.connect(() =>{
    conn.query("INSERT INTO db_producto (nombre, descripcion, categoria, cantidad, precio) VALUES ('"+post.nombre+"','"+post.descripcion+"','"+post.categoria+"','"+post.cantidad+"','"+post.precio+"')", (err, result) => {
        if(!err){
          let respuestaServidor = {
            codigo: respuesta.codigo = 200,
            error: respuesta.error = false,
            mensaje: respuesta.mensaje = result,
            parametro: 'datos guardados con exito'
          }
          res.send(respuestaServidor);
        }else{
          let respuestaServidor = {
            codigo: respuesta.codigo = 500,
            error: respuesta.error = err,
            mensaje: respuesta.mensaje = 'producto no creado'
          }
          res.send(respuestaServidor);
        }
    });
  })
})

app.listen(PORT, () => {
  console.log(`se conecto al: http://localhost:${PORT}`);
})
