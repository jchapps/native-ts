import { View, Text, StyleSheet } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";
import { Modal } from "../components/styled/Modal";
import { PressableText } from "../components/styled/PressableText";
import { formatSecs } from "../utils/time";
import { FontAwesome } from "@expo/vector-icons";
import WorkoutItem from "../components/WorkoutItem";
import { useEffect, useState } from "react";
import { SequenceItem } from "../types/data";
import { useCountDown } from "../hooks/useCountDown";

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
  const [sequence, setSequence] = useState<SequenceItem[]>([]);
  const [trackerIdx, setTrackerIdx] = useState(-1);



  const workout = useWorkoutBySlug(route.params.slug);


  const countDown = useCountDown(trackerIdx, trackerIdx>= 0 ? sequence[trackerIdx].duration: -1)


  const addItemToSequence = (idx: number) => {
    setSequence([...sequence, workout!.sequence[idx]]); // ! works instead of ? because data will defintiley be here
    setTrackerIdx(idx);
  };

  if (!workout) {
    return null;
  }

  return (
    <View style={style.container}>
      <WorkoutItem item={workout} childrenStyle={{ marginTop: 10 }}>
        <Modal
          activator={({ handleOpen }) => (
            <PressableText onPress={handleOpen} text="More Details" />
          )}
        >
          <View>
            {workout?.sequence.map((seq, idx) => (
              <View key={seq.slug} style={style.sequence}>
                <Text>
                  {seq.name} - {seq.type} - {formatSecs(seq.duration)}
                </Text>
                {workout.sequence.length - 1 !== idx && (
                  <FontAwesome name="arrow-down" size={20} /> // no arrow on last item
                )}
              </View>
            ))}
          </View>
        </Modal>
      </WorkoutItem>
      <View>
        {sequence.length === 0 && (
          <FontAwesome
            name="play-circle-o"
            size={100}
            onPress={() => addItemToSequence(0)}
          />
        )}
      </View>
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
  sequence: {
    alignItems: "center",
  },
});

export default WorkoutDetailScreen;
