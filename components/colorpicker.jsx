import React, { useContext, useEffect, useState } from "react";
import {Pressable, Button, Modal, StyleSheet, Text, View, InteractionManager, Image} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import ColorPicker, { colorKit, Swatches, HueSlider, BrightnessSlider, SaturationSlider, Panel3, Panel4, Panel1, Panel5, RedSlider, GreenSlider, BlueSlider, HueCircular, Preview } from 'reanimated-color-picker';
import socket, { colorFromServer } from './socket';
import onOff from '../assets/turn-off.png';

const LEDColorPicker = () => {
  socket.on('current color', (color) => {
    selectedColor.value = color;
  })

  const [showModal, setShowModal] = useState(false);

  const customSwatches = new Array(6)
    .fill('#fff')
    .map(() => colorKit.randomRgbColor().hex());

  const selectedColor = useSharedValue(colorFromServer);
  const backgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: selectedColor.value,
  }))

  const onSelectColor = ({ hex }) => {
    selectedColor.value = hex;
    socket.emit('rgb value', hex);
  }

  const onOffPress = (ev) => {
    socket.emit('toggle power');
  }

  const [RGBPickerView, setRGBPickerView] = useState(false);

  const DefaultPicker = () => {
    return (
      <>
        <HueCircular sliderThickness={15} containerStyle={styles.hueContainer}><Pressable onPressOut={onOffPress} style={({pressed}) => [
          {backgroundColor: pressed ? 'white' : 'grey'},
          styles.onOffButton
        ]}><Image source={onOff} style={{width: '80%', height: '80%', alignSelf: 'center'}} /></Pressable></HueCircular>
        <SaturationSlider style={styles.sliderStyle} />
        <Text style={{color: 'white', marginBottom: -15, marginTop: 20}}>Lysstyrke</Text>
        <BrightnessSlider  style={styles.sliderStyle} />
        <Swatches 
          style={styles.swatchesContainer}
          swatchStyle={styles.swatchStyle}
          colors={customSwatches} />
      </>
    )
  }

  const RGBPicker = () => {
    return (
      <>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
          <Text style={{fontWeight: 600, color: '#fff'}}>Red</Text>
          <Text style={{fontWeight: 600, color: '#fff'}}>Green</Text>
          <Text style={{fontWeight: 600, color: '#fff'}}>Blue</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', height: 300}}>
          <RedSlider style={styles.sliderStyle} vertical reverse />
          <GreenSlider style={styles.sliderStyle} vertical reverse />
          <BlueSlider style={styles.sliderStyle} vertical reverse />
        </View>
        <Swatches 
          style={styles.swatchesContainer}
          swatchStyle={styles.swatchStyle}
          colors={customSwatches} />
      </>
    )
  }

  return (
    <>
      <Button title='Velg farge' onPress={() => setShowModal(true)} />

      <Modal visible={showModal} animationType="slide">
        <Animated.View style={[styles.container, backgroundColorStyle]}>
          <View style={styles.pickerContainer}>
            <ColorPicker 
              value={selectedColor.value}
              sliderThickness={25}
              thumbSize={24}
              thumbShape='circle' 
              onChange={onSelectColor}
              boundedThumb>
              {RGBPickerView ? <RGBPicker /> : <DefaultPicker />}
            </ColorPicker>
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around', width: '80%'}}>
            <Pressable style={styles.buttonStyle} onPress={() => setShowModal(false)}>
              <Text style={{fontWeight: 700, color: '#fff'}}>Lukk</Text>
            </Pressable>
            <Pressable style={styles.buttonStyle} onPress={() => setRGBPickerView(!RGBPickerView)}>
              <Text style={{fontWeight: 700, color: '#fff'}}>{RGBPickerView ? "Hue" : "RGB"}</Text>
            </Pressable>
          </View>
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
  pickerContainer: {
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#202020',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  panelStyle: {
    borderRadius: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  hueContainer: {
    justifyContent: 'center',
    backgroundColor: '#202020'
  },
  onOffButton: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
    borderRadius: '100%',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2,
    justifyContent: 'center'
  },
  innerPanelStyle: {
    width: '90%',
    height: '90%',
    alignSelf: 'center'
  },
  previewStyle: {
    height: '20%',
    width: '70%',
    alignSelf: 'center'
  },
  sliderStyle: {
    borderRadius: 20,
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  swatchesContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#bebdbe',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  buttonStyle: {
    marginTop: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#202020',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  error: {
    backgroundColor: '#ff1a1a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: 54,
    zIndex: 10,
    position: 'absolute',
    width: '100%'
  }
})

export default LEDColorPicker;