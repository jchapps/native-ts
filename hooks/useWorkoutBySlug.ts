import { useEffect, useState } from "react";
import { getWorkoutBySlug, getWorkouts } from "../storage/workout";
import { Workout } from "../types/data";

export const useWorkoutBySlug = (slug: string) => {
  const [workout, setWorkout] = useState<Workout>();

  // console.log(isFocused) - returns false when on a different page, true on home

  useEffect(() => {
    async function getData() {//GETTING DATA
      console.log("Getting data from storage");
      const _workout = await getWorkoutBySlug(slug); // GETTING ARRAY OF OBJECTS
      setWorkout(_workout); // UPDATE STATE
    }

      getData();

  },[]);

  return workout; // initially returns empty array until useEffect fetchs workouts
};
