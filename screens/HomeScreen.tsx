// import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import Data from "../data.json";
import { Workout } from "../types/data";
import WorkoutItem from "../components/WorkoutItem";

function HomeScreen({ navigation }: NativeStackHeaderProps) {
  // useEffect(() => {
  //   console.log("Rendering Home screen");

  //   // unmounting notice
  //   return () => console.log("unmounting home screen")
  // }, []);

  return (
    <View style={style.container}>
      <FlatList data={Data as Array<Workout>} renderItem={WorkoutItem} keyExtractor={item => item.slug} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default HomeScreen;
