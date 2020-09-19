const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const { sendMessage, receiveMessage } = require('./mq')

app.get('/send', async (req, res) => {

    var queue = 'hello';
    var msg = 'Hello world';

    for (let i = 0; i < 100; i++) {
        sendMessage(queue, msg);

    }

    res.json(true)

});

app.get('/receive', (req, res) => {

    var queue = 'hello';

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    receiveMessage(queue)

    res.json(true)

})

app.listen(port, () => console.log(`listening on http://localhost:${port}`));

