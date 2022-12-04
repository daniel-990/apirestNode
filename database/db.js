const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'bcbdnp4clfjvyhj0r37q-mysql.services.clever-cloud.com',
    user: 'uokldxkoryzk33ck',
    password: '8lX3lFTjRZ8NHo9XlnIk',
    database: 'bcbdnp4clfjvyhj0r37q'
})

connection.connect((err) => {
    if(err){
        console.log('error al conectar a la base de datos');
    }else{
        console.log('se conecto a la base de datos');
    }
})

module.exports = connection;