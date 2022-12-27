/*
    Autor: Leonel Aguilar
*/

const express = require("express"); 
const redis = require("redis"); 

const app = new express(); 

app.use(express.json({ extended: true }))

// Conectarse con redis, para este ejemplo se especifican todos los campos
// el valor actual de estos campos es el que trae por defecto el cliente de redis
const client = redis.createClient({
    host: 'localhost',
    port: 6379,
    auth_pass: ""
});

client.on('error', (err) => { console.error(err); });

app.get('/', (req, res) => {
    // Utilizar el comando keys * para obtener todas las llaves almacenadas en REDIS
    client.keys('*', (err, keys) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }

        return res.send(keys);
    });
});

// Obtener una lista de datos 
// enviar como parámetro el nombre de alguna lista
app.get('/get/:list', (req, res) => {
    // obtener el nombre de la lista de los parámetros
    const { list } = req.params;

    // obtener el inicio desde donde se leerá la lista
    // si no fue enviado, utilizar 0
    const init = req.query.init || 0;
    // obtener el fin hasta donde se leerá la lista
    // si no fue enviado, utilizar -1 (o sea, leer hasta el final)
    const last = req.query.final || -1;

    // utilizar lrange para leer los datos de la lista
    client.lrange(list, init, last, (err, result) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }

        const jsonresult = result.map(r => JSON.parse(r));

        return res.send(jsonresult);
    });
});


app.post('/add', (req, res) => {
    const { db, data } = req.body;
    // convertir el valor que enviaremos a string
    const json = JSON.stringify(data);

    // Utilizamos RPush para almacenar datos al FINAL de la lista
    // si necesitaramos agregarlo al inicio utilizaríamos LPush
    client.rpush(db, json, (err, result) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }

        return res.send({ result });
    });
});


const PORT = process.env.port || 4001;

app.listen(PORT, () => { console.log(`API lista en -> http://localhost:${PORT}`) });