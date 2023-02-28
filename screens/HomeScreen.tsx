import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { NativeStackHeaderProps } from '@react-navigation/native-stack'


function HomeScreen({ navigation }: NativeStackHeaderProps) {
  useEffect(() => {
    console.log("Rendering Home screen");


    // unmounting notice
    return () => console.log("unmounting home screen")
  }, []);
  return (
    <View>
      <Text>
        Homescreen
        <Button title="Planner" onPress={() => navigation.navigate("Planner")} />
      </Text>
    </View>
  );
}

export default HomeScreen;
