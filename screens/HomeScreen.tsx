// import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import Data from "../data.json";

function HomeScreen({ navigation }: NativeStackHeaderProps) {
  // useEffect(() => {
  //   console.log("Rendering Home screen");

  //   // unmounting notice
  //   return () => console.log("unmounting home screen")
  // }, []);

  return (
    <View style={style.container}>
      <Text>Homescreen</Text>
      <FlatList data={Data} keyExtractor={item => item.slug} renderItem={({item}) =>

      <View><Text>{item.name}</Text></View>
      } />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default HomeScreen;
