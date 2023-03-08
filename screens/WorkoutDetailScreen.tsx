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

  const { countDown, isRunning, stop, start } = useCountDown(trackerIdx);

  console.log(isRunning);

  useEffect(() => {
    if (!workout) {
      return;
    }

    if (trackerIdx === workout.sequence.length - 1) {
      return;
    } //reached the end of workout sequences

    if (countDown === 0) {
      addItemToSequence(trackerIdx + 1);
    }
  }, [countDown]);

  const addItemToSequence = (idx: number) => {
    const newSequence = [...sequence, workout!.sequence[idx]];
    setSequence(newSequence); // ! works instead of ? because data will defintiley be here
    setTrackerIdx(idx);
    start(newSequence[idx].duration);
  };

  if (!workout) {
    return null;
  }

  const hasReachedEnd =
    sequence.length === workout.sequence.length && countDown === 0;

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
      <View style={style.centerView}>
        {sequence.length === 0 ? (
          <FontAwesome
            name="play-circle-o"
            size={100}
            onPress={() => addItemToSequence(0)}
          />
        ) : isRunning ? (
          <FontAwesome name="stop-circle-o" size={100} onPress={() => stop()} />
        ) : (
          <FontAwesome
            name="play-circle-o"
            size={100}
            onPress={() => {
              if (hasReachedEnd) {
                console.log("restart now function");
              } else {
                start(countDown);
              }
            }}
          />
        )}
        {sequence.length > 0 && countDown >= 0 && (
          <View>
            <Text style={{ fontSize: 35 }}>{countDown}</Text>
          </View>
        )}
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 50, fontWeight: "bold" }}>
          {sequence.length === 0
            ? "GET READY"
            : hasReachedEnd
            ? "お疲れ様！"
            : sequence[trackerIdx].name}
        </Text>
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
  centerView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default WorkoutDetailScreen;
