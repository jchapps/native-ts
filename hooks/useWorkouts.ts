import { useEffect, useState } from "react";
import { getWorkouts } from "../storage/workout";
import { Workout } from "../types/data";

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    async function getData() { //GETTING DATA
      const _workouts = await getWorkouts(); // GETTING ARRAY OF OBJECTS
      setWorkouts(_workouts); // UPDATE STATE
    }
    getData();
  }, []);

  return workouts;
};
