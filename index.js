const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//set the static path
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json())
const publicVapidKey = 'BBjYXkQBMuZQAltG9loqGzC4dwzuzNIsM9sEYi7tGR3zYurEx2M0EYbDoL6TZ4oEXEBGOaPpUUWZSE40tZkquzo';
const privateVapidKey = 'xOgREkvml2-JwCQzJGIGbrNkRUYigBDtQeepyZQ9Alg';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey,privateVapidKey);

//subscribe route
app.post('/subscribe', (req, res)=>{
    //get push subscription object
    const subscription = req.body;

    //send status 201
    res.status(201).json({})

    //create paylod
    const payload = JSON.stringify({title: 'Node Js Push Notification' });

    //pass the object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
})

const port = 3000;
app.listen(port, ()=>{
    console.log(`server started on ${port}`)
});

/*

=======================================

Public Key:
BBjYXkQBMuZQAltG9loqGzC4dwzuzNIsM9sEYi7tGR3zYurEx2M0EYbDoL6TZ4oEXEBGOaPpUUWZSE40tZkquzo

Private Key:
xOgREkvml2-JwCQzJGIGbrNkRUYigBDtQeepyZQ9Alg

=======================================
*/