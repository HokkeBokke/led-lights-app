import { io } from "socket.io-client";
const socket = io.connect("http://raspberrypi:3000");

export let colorFromServer;
export default socket;

socket.on('connection', () => {
  console.log("Socket.io: Connected");
});

socket.on('current color', (color) => {
  colorFromServer = color;
  console.log("Current color: ", color);
})