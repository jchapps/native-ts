// import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Workout } from "../types/data";
import WorkoutItem from "../components/WorkoutItem";
import { useEffect, useState } from "react";
import { getWorkouts } from "../storage/workout";

function HomeScreen({ navigation }: NativeStackHeaderProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    async function getData() { //GETTING DATA
      const _workouts = await getWorkouts(); // GETTING ARRAY OF OBJECTS
      setWorkouts(_workouts) // UPDATE STATE
    }
    getData()
  }, []);

  return (
    <View style={style.container}>
      <Text style={style.header}>My Workouts</Text>
      <FlatList
        data={workouts}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate("WorkoutDetail", { slug: item.slug })
              }
            >
              <WorkoutItem item={item} />
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.slug}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
