import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LEDColorPicker from './components/colorpicker';
import RainbowButton from './components/rainbow';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>Her kan du skifte farge på LED lysene</Text>
      <LEDColorPicker />
      <RainbowButton />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
