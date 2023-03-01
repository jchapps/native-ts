import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { getData, storeData } from "../storage";
import data from '../data.json'

export default function useCachedResources() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    console.log("Running useEffect");
    async function loadResourcesAndDataAsync() {
      try {
        await storeData("workout-data", data ) //storing
        await Font.loadAsync({
          "Poppins": require("../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        const workouts = await getData("workout-data") // retrieving
        console.log(workouts)
        setIsLoadingComplete(true)
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete; //initally false but true after 3 seconds
}
