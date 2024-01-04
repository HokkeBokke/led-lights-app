import { Application, Request, Response, NextFunction } from "express";
const express = require('express');
import * as dgram from 'node:dgram';
const sock: dgram.Socket = dgram.createSocket('udp4');

const PORT: number = 38667;
const IPTARGET: string = '172.18.0.72';

let hexValue: string = 'ffffff'; // White

function sendData(msg: string) {
  sock.send(`rgb=${msg}`, PORT, IPTARGET, (err: Error, bytes: number) => {
    if (err) return console.log("UDP Error: " + err);
    console.log("UDP: Sent " + bytes + "bytes to " + IPTARGET);
    sock.close(() => console.log("Socket closed"));
  });
}

sendData('ff0000');