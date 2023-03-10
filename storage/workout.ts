import { containsKey, getData, removeItem, storeData } from ".";
import data from '../data.json'
import { Workout } from "../types/data";

export const getWorkouts = async(): Promise<Workout[]> => {
  const workouts = await getData("workout-data"); // retrieving
  return workouts
};

export const getWorkoutBySlug = async(slug: string): Promise<Workout> =>  {
  const workouts = await getWorkouts(); // gets array of workouts
  const workout = workouts.filter(workout => workout.slug === slug)[0] //compares iteration slug to slug and gets first object in array
  return workout //returns matching workout
}

export const initWorkouts = async (): Promise<boolean> => {
  const hasWorkouts = await containsKey("workout-data");
  if (!hasWorkouts) {
    // if we don't have workouts - store the data (basically only when we start the app for first time)
    console.log("Storing data...");
    await storeData("workout-data", data); //storing
    return true
  }
  return false
};

export const removeWorkouts = async() => {
  await removeItem("workout-data")
}
