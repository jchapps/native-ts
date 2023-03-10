import { View, Text } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import WorkoutForm, { ExcerciseForm } from "../components/WorkoutForm";
import { StyleSheet } from "react-native";

function PlannerScreen({ navigation }: NativeStackHeaderProps) {

  const handleFormSubmit = (form: ExcerciseForm) => {
    alert(`${form.name} - ${form.duration}`)
  }


  return (
    <View style={style.container}>
      <Text>
        <WorkoutForm onSubmit={handleFormSubmit}/>
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
