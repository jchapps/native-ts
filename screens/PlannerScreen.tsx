import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

function PlannerScreen({ navigation }: NativeStackHeaderProps) {
  useEffect(() => {
    console.log("Rendering Planner screen");

    // unmounting notice
    return () => console.log("unmounting Planner screen");
  }, []);

  return (
    <View>
      <Text>
        Plannerscreen
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
      </Text>
    </View>
  );
}

export default PlannerScreen;
