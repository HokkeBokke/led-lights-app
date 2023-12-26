"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require('express');
var app = express();
var PORT = 8765;
/**
 *  header = { "alg": HS256, "typ": "JWT" }
 *  payload = { "name": string, "address": string }
 *  secret: string
 *
 *  HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload) + "." + base64UrlEncode(secret))
 * */
var trustedTokens = [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSMOla29uIiwiYWRkcmVzcyI6Ikt2aXR1bmdldmVnZW4gMTMifQ.XzE6QgAyVre_kdag35fG6fXvosngWAIcVQikYHrxaWQ",
];
///// MIDDLEWARE \\\\\
/*
 *  Drop traffic if no authentication is provided
 */
var verifyTraffic = function (req, res, next) {
    console.log(req.body);
    if (!req.body.token) {
        console.log("Dropped. No token");
        res.status(401);
        res.contentType('text/plaintext');
        res.end("No authentication included...");
        return;
    }
    if (!trustedTokens.includes(req.body.token)) {
        console.log("Dropped. Wrong token");
        res.status(401);
        res.contentType('text/plaintext');
        res.end("Not allowed");
        return;
    }
    next();
};
///// END \\\\\
app.use(bodyParser.json());
app.use(verifyTraffic);
app.post('/api/v1/changeLights', function (req, res) {
    console.log("URL: " + req.url);
    console.log("Token: " + req.body.token);
    console.log("hex param: " + req.body.hex);
    res.status(200);
    res.end(req.query.hex + " set");
});
app.listen(PORT, function () { return console.log("Listening on " + PORT); });
