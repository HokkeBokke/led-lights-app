const bodyParser = require("body-parser");
import { Application, Request, Response, NextFunction, urlencoded } from "express";
const express = require('express');
const app: Application = express();

const PORT = 8765;

/**
 *  header = { "alg": HS256, "typ": "JWT" }
 *  payload = { "name": string, "address": string }
 *  secret: string
 * 
 *  HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload) + "." + base64UrlEncode(secret))
 * */ 
const trustedTokens = [
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSMOla29uIiwiYWRkcmVzcyI6Ikt2aXR1bmdldmVnZW4gMTMifQ.XzE6QgAyVre_kdag35fG6fXvosngWAIcVQikYHrxaWQ",
]

///// MIDDLEWARE \\\\\
/*
 *  Drop traffic if no authentication is provided  
 */
const verifyTraffic = (req: Request, res: Response, next: NextFunction) => {
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
}
///// END \\\\\

app.use(bodyParser.json());
app.use(verifyTraffic);

app.post('/api/v1/changeLights', (req: Request, res: Response) => {
  console.log("URL: " + req.url);
  console.log("Token: " + req.body.token);
  console.log("hex param: " + req.body.hex);
  res.status(200);
  res.end(req.query.hex + " set");
})

app.listen(PORT, () => console.log("Listening on " + PORT))