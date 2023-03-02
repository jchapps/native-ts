import { useEffect, useState } from "react";
import { getWorkouts } from "../storage/workout";
import { Workout } from "../types/data";

import { useIsFocused } from "@react-navigation/native";

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const isFocused = useIsFocused();

  // console.log(isFocused) - returns false when on a different page, true on home

  useEffect(() => {
    async function getData() {//GETTING DATA
      console.log("Getting data from storage");
      const _workouts = await getWorkouts(); // GETTING ARRAY OF OBJECTS
      setWorkouts(_workouts); // UPDATE STATE
    }

    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  return workouts; // initially returns empty array until useEffect fetchs workouts
};
