import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Workout } from "../types/data";
import { formatSecs } from "../utils/time";


function WorkoutItem({ item }: { item: Workout }) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {item.name}
      </Text>
      <Text style={styles.duration}>
      {item.difficulty === "Hard" ? `${item.difficulty} 🔥`  : item.difficulty} | {(formatSecs(item.duration))}
      </Text>
    </View>
  );
}

export default WorkoutItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: "rgba(0,0,0, 0.1)",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#BBC2E2',
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5
  },
  duration: {
    fontSize: 10
  }
})
