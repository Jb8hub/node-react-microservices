const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
/*const cors = require('cors');
app.use(cors());*/
app.use(bodyParser.json());
const events = [];

app.get('/events', (req, res) => {
    res.send(events);
});

app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);

    console.log('req.body:', event);
    axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
        console.log('Err:', err.message);
    });
    // axios.post('http://localhost:4001/events', event).catch((err) => {
    //     console.log('Err:', err.message);
    // });
    // axios.post('http://localhost:4002/events', event).catch((err) => {
    //     console.log('Err:', err.message);
    // });
    // axios.post('http://localhost:4003/events', event).catch((err) => {
    //     console.log('Err:', err.message);
    // });
    res.send({ status: 'OK' });
});

app.listen(4005, () => {
    console.log('Listening on 4005');
})

