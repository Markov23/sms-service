require('dotenv').config();

const cors = require('cors');

const express = require('express');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(cors());

app.use(bodyParser.json());

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

app.post('/sms', (req, res) => {

    const telefono = req.body.telefono;
    const mensaje = req.body.mensaje;

    client.messages.create({
        to: telefono,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: mensaje
    }).then(message => res.json(message.sid));

});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));