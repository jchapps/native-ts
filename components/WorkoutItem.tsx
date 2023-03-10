import { ReactNode } from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Workout } from "../types/data";
import { formatSecs } from "../utils/time";

function WorkoutItem({
  item,
  children,
  childrenStyle = {},
}: {
  item: Workout;
  children?: React.ReactNode;
  childrenStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.duration}>
        {item.difficulty === "Hard" ? `${item.difficulty} 🔥` : item.difficulty}{" "}
        | {formatSecs(item.duration)}
      </Text>
      {children && <View style={childrenStyle}>{children}</View>}
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
    backgroundColor: "#D6ED17FF",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  duration: {
    fontSize: 10,
  },
});
