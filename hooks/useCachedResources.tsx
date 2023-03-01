import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { getData, storeData, containsKey } from "../storage";
import data from "../data.json";
import { getWorkouts, initWorkouts, removeWorkouts } from "../storage/workout";

export default function useCachedResources() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    console.log("Running useEffect");
    async function loadResourcesAndDataAsync() {
      try {
        await initWorkouts() // saving
        await Font.loadAsync({
          Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete; //initally false but true after 3 seconds
}
