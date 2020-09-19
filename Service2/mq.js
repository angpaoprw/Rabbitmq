const amqp = require('amqplib');

let mq = exports;
let channel;

async function startMQServer() {
    const conn = await amqp.connect('amqp://localhost');
    const ch = await conn.createChannel();

    channel = ch
}

startMQServer();

mq.sendMessage = async (queueName, data) => {

    channel.assertExchange('direct')

    await channel.assertQueue(queueName, { durable: false })
    await channel.sendToQueue(queueName, Buffer.from(data));
    console.log('send message');
}

mq.receiveMessage = async (queueName) => {

    await channel.assertQueue(queueName, { durable: false })

    channel.consume(queueName, function (data) {

        console.time('1');
        setTimeout(() => {
            console.timeEnd('1');
            console.log(" [x] Received %s", data.content.toString());
        }, 200);
    }, { noAck: true });

}



