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
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

  const startupSeq = ["GO", "1", "2", "3"];
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
    let newSequence = [];
    if (idx > 0) {
      // push more items
      newSequence = [...sequence, workout!.sequence[idx]]; // existing items and new sequence
    } else {
      newSequence = [workout!.sequence[idx]]; // if no data
    }
    setSequence(newSequence); // ! works instead of ? because data will defintiley be here
    setTrackerIdx(idx);
    start(newSequence[idx].duration + startupSeq.length);
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
      <View style={style.wrapper}>
        <View style={style.counterUI}>
          <View style={style.centerItem}>
            {sequence.length === 0 ? (
              <FontAwesome
                name="play-circle-o"
                size={100}
                onPress={() => addItemToSequence(0)}
              />
            ) : isRunning ? (
              <FontAwesome
                name="stop-circle-o"
                size={100}
                onPress={() => stop()}
              />
            ) : (
              <MaterialCommunityIcons
                name="restart"
                color="black"
                size={100}
                onPress={() => {
                  if (hasReachedEnd) {
                    addItemToSequence(0);
                  } else {
                    start(countDown);
                  }
                }}
              />
            )}
          </View>
          {sequence.length > 0 && countDown >= 0 && (
            <View style={style.centerItem}>
              <Text style={{ fontSize: 35 }}>
                {countDown > sequence[trackerIdx].duration
                  ? startupSeq[countDown - sequence[trackerIdx].duration - 1]
                  : countDown}
              </Text>
            </View>
          )}
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 50, fontWeight: "bold" }}>
            {sequence.length === 0
              ? "GET READY"
              : hasReachedEnd
              ? "???????????????"
              : sequence[trackerIdx].name}
          </Text>
        </View>
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
  counterUI: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  centerItem: {
    flex: 1,
    alignItems: "center",
  },
  wrapper: {
    borderRadius: 10,
    borderColor: "#606060FF",
    backgroundColor: '#606060FF',
    borderWidth: 1,
    padding: 10
  }
});

export default WorkoutDetailScreen;
