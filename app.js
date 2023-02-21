'use strict';

//  All required libraries
const express = require('express');
const logger = require('silly-logger');

/*

//  This section is enabled on the official https://klappstuhlverein.de website for the SSL certificate
const https = require('https');
const fs = require('fs');


const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/klappstuhlverein.de//privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/klappstuhlverein.de//cert.pem'),
};
*/

//  Get config file
const { serverConfig } = require('./config/config.json');

//  Creating the Express App
const app = express();

//  Gives Express the public folder as static files
app.use(express.static('public'));


//  Standard Route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
    logger.info(`Acces to ${req.url} from ${req.ip}`);
});

app.get('/regelwerk', (req, res) => {
    res.sendFile(__dirname + '/views/rules.html');
    logger.info(`Acces to ${req.url} from ${req.ip}`);
});

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/views/error.html');
    logger.warn(`Tried to acces ${req.url} from ${req.ip}`);
});


//  Let the App listen on port
app.listen(serverConfig.port, () => {
    logger.success(`Server Successfully started.`);
    logger.info(`Available now on https://klappstuhlverein.de`);
});

/*
//  This section is enabled on the official https://klappstuhlverein.de website for the SSL certificate

https.createServer(options, app).listen(serverConfig.port, () => {
    logger.success(`Server Successfully started.`);
    logger.info(`Available now on https://klappstuhlverein.de on port ${serverConfig.port}`);
});
*/