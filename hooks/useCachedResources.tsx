import { useEffect, useState } from "react";
import * as Font from "expo-font";

export default function useCachedResources() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    console.log("Running useEffect");
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
          "Poppins": require("../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoadingComplete(true)
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete; //initally false but true after 3 seconds
}
