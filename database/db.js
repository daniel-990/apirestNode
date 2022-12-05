const mysql = require('mysql')
const config = require('config');

//rutas para la conexion a base de datos
const host = config.get('servidordb.host');
const user = config.get('servidordb.user');
const pass = config.get('servidordb.password');
const database = config.get('servidordb.database');

const connection = mysql.createConnection({
    host: host,
    user: user,
    password: pass,
    database: database
})

connection.connect((err) => {
    if(err){
        console.log('error al conectar a la base de datos');
    }else{
        console.log('se conecto a la base de datos');
    }
})

module.exports = connection;