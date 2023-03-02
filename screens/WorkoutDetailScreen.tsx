import { View, Text, StyleSheet, Button } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";
import { Modal } from "../components/styled/Modal";
import { PressableText } from "../components/styled/PressableText";
import { formatSecs } from "../utils/time";

// getting slug to exist on object
type ParamDetails = {
  route: {
    params: {
      slug: string;
    };
  };
};
// overwriting native stackheaderprops with our own paramdetails to include slug
type Navigation = NativeStackHeaderProps & ParamDetails;

function WorkoutDetailScreen({ route }: Navigation) {
  const workout = useWorkoutBySlug(route.params.slug);

  return (
    <View style={style.container}>
      <Text style={style.header}>{workout?.name}</Text>
      <Modal
        activator={({handleOpen}) =>
          <PressableText
            onPress={handleOpen}
            text="More Details"
          />
        }
      >
        <View>
          {
            workout?.sequence.map(seq =>
              <Text key={seq.slug}>{seq.name} - {seq.type} - {formatSecs(seq.duration)}</Text>
              )
          }
        </View>
      </Modal>
    </View>
  )
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

export default WorkoutDetailScreen;
