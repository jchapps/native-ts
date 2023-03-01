import { Text } from "react-native";
import React from 'react'

export function PoppinsText(props: Text["props"]) {
  return (
    <Text {...props} style={[props.style, {fontFamily:'Poppins'}]}/>
  );
}
