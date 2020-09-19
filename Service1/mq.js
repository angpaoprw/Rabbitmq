const amqp = require('amqplib');

let mq = exports

mq.sendMessage = async (queueName, data) => {

    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();

    await channel.assertQueue(queueName, { durable: false })
    await channel.sendToQueue(queueName, Buffer.from(data));
    console.log('send message');

}

mq.receiveMessage = async (queueName) => {

    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();

    await channel.assertQueue(queueName, { durable: false })

    channel.consume(queueName, function (data) {
        console.log(" [x] Received %s", data.content.toString());
    }, { noAck: true });

}



