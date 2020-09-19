const ampq = require('amqplib')

const initReceiveMq = async () => {
    const conn = await ampq.connect('amqp://localhost')
    const channel = await conn.createChannel();

    await channel.assertQueue('hello', { durable: true })

    channel.consume('hello', function (data) {
        console.log(" [x] Received %s", data.content.toString());
    }, { noAck: true });
}

initReceiveMq();