import { StyleSheet, Text, View } from "react-native";
import socket from "./socket";
import { useState } from "react";

const ConnectionStatus = () => {
  const [connected, setConnected] = useState(socket.connected);
  socket.on('connect', () => setConnected(true));
  socket.on('disconnect', () => setConnected(false));

  return (
    <View style={styles.deviceMenu}>
      <Text style={{color: 'white', fontSize: 16, alignSelf: 'center'}}>{connected ? "Connected" : "Disconnected"}</Text>
      <Text style={{color: 'white'}}>{connected ? "raspberrypi:3000" : "" }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  deviceMenu: {
    backgroundColor: '#3c008c',
    width: '100%',
    position: 'absolute',
    top: 0,
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default ConnectionStatus;