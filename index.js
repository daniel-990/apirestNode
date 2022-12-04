const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

//mysql
const conn = require('./database/db.js');
//puerto
const PORT = process.env.PORT || 5000

//app
const app = express();

//respuesta del servidor
let respuesta = {
  error: false,
  codigo: 0,
  mensaje: ''
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
  
  //se ingresan productos
  let post = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    categoria: req.body.categoria,
    cantidad: req.body.cantidad,
    precio: req.body.precio
  }
  //console.log(post);

  conn.connect(() =>{
    conn.query("INSERT INTO db_producto (nombre, descripcion, categoria, cantidad, precio) VALUES ('"+post.nombre+"','"+post.descripcion+"','"+post.categoria+"','"+post.cantidad+"','"+post.precio+"')", (err, result) => {
        if(!err){
          let respuestaServidor = {
            codigo: respuesta.codigo = 200,
            error: respuesta.error = false,
            mensaje: respuesta.mensaje = result.body
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
