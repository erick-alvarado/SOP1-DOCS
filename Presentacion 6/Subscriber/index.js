const { PubSub } = require('@google-cloud/pubsub');
const axios = require('axios');

// Acá escribimos la suscripción que creamos en Google Pub/Sub
const SUB_NAME = 'projects/glassy-clarity-370620/subscriptions/topic_ejemplo-sub';

// Cantidad de segundos que estara prendido nuestro listener
// Solo para efectos practicos, realmente esto debería estar escuchando en todo momento!
const TIMEOUT = process.env.TIMEOUT || 60;

const client = new PubSub();

const messages = [];

const messageReader = async message => {

    console.log('¡Mensaje recibido!');
    console.log(`${message.id} - ${message.data}`);
    console.table(message.attributes);

    messages.push({ msg: String(message.data), id: message.id, ...message.attributes });

    // Con esto marcamos el acknowledgement de que recibimos el mensaje
    // Si no marcamos esto, los mensajes se nos seguirán enviando aunque ya los hayamos leído!
    message.ack();

};

const notificationListener = () => {

    // Creamos un subscriptor
    const sub = client.subscription(SUB_NAME);

    sub.on('message', messageReader);

    console.log("Estoy a la espera de los mensajes...");

    setTimeout(() => {
        sub.removeListener('message', messageReader);

        if (messages.length > 0) {
            console.log(`${messages.length} mensajes recibidos: `);
            console.log("---------");
            console.table(messages);
        }
        else {
            console.log("No hubo ningún mensaje en este tiempo. :(")
        }

    }, TIMEOUT * 1000);
};

console.log(`Iniciando Subscriber, deteniendolo en ${TIMEOUT} segundos...`);

notificationListener();