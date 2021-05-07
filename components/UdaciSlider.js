import Slider from "@react-native-community/slider";
import React from "react";
import { View, Text } from "react-native";

export default function UdaciSlider({ max, unit, step, value, onChange }) {
  return (
    <View>
      <Text>UdaciSlider</Text>
      <Slider
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
}
