import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const { useState } = require('react');
const { Pressable, Text, Button, Modal, StyleSheet, Animated } = require("react-native")


const RainbowButton = () => {
  const [showModal, setShowModal] = useState(false);

  const currentColor = useSharedValue('#fff');
  const backgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: currentColor.value,
  }))

  return (
    <>
      <Button title="Rainbow Slide" onPress={() => setShowModal(true)} />

      <Modal visible={showModal}>
        <Animated.View style={[styles.container, backgroundColorStyle]}>
          
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
  }
})

export default RainbowButton;