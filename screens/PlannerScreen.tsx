import { View, Text, Button } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import WorkoutForm from "../components/WorkoutForm";
import { StyleSheet } from "react-native";

function PlannerScreen({ navigation }: NativeStackHeaderProps) {
  return (
    <View style={style.container}>
      <Text>
        <WorkoutForm />
      </Text>
    </View>
  );
}

export default PlannerScreen;


const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
})
