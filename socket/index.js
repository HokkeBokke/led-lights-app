"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var dgram = require("node:dgram");
var sock = dgram.createSocket('udp4');
var PORT = 38667;
var IPTARGET = '172.18.0.72';
var hexValue = 'ffffff'; // White
function sendData(msg) {
    sock.send("rgb=".concat(msg), PORT, IPTARGET, function (err, bytes) {
        if (err)
            return console.log("UDP Error: " + err);
        console.log("UDP: Sent " + bytes + "bytes to " + IPTARGET);
        sock.close(function () { return console.log("Socket closed"); });
    });
}
sendData('ff0000');
