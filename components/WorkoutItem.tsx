import React from "react";
import { View, Text } from "react-native/types";
import { Workout } from "../types/data";


function WorkoutItem({ item }: { item: Workout }) {
  return (
    <View>
      <Text>
        {item.name} | {item.difficulty}
      </Text>
    </View>
  );
}

export default WorkoutItem;
