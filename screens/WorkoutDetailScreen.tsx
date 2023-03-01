import { View, Text, StyleSheet} from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";


// getting slug to exist on object
type ParamDetails = {
  route: {
    params: {
      slug: string
    }
  }
}
// overwriting native stackheaderprops with our own paramdetails to include slug
type Navigation = NativeStackHeaderProps & ParamDetails

function WorkoutDetailScreen({ route }: Navigation) {


  return (
    <View style={style.container}>
      <Text style={style.header}>{route.params.slug}</Text>
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

export default WorkoutDetailScreen;
