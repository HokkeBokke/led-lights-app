import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { colorKit } from 'reanimated-color-picker';
const { useState } = require('react');
const { Pressable, Text, Button, Modal, StyleSheet } = require("react-native")


const RainbowButton = () => {
  const [showModal, setShowModal] = useState(false);

  const [currentColor, setCurrentColor] = useState(colorKit.randomRgbColor().hex());
  const backgroundColorStyle = useAnimatedStyle(() => ({
      backgroundColor: currentColor
  }));

  return (
    <>
      <Button title="Rainbow Slide" onPress={() => setShowModal(true)} />

      <Modal visible={showModal} animationType='slide'>
        <Animated.View style={[styles.container, backgroundColorStyle]}>

          <Pressable style={styles.closeButton} onPress={() => setShowModal(false)}>
            <Text style={{fontWeight: 700}}>Lukk</Text>
          </Pressable>
        </Animated.View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  closeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
})

export default RainbowButton;