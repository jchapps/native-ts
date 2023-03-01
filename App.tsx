import { StatusBar } from "expo-status-bar";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";

export default function App() {
  const isLoaded = useCachedResources();
    return (
      isLoaded && ( // Only load when fonts have been loaded so Poppins displays properly
        <>
          <Navigation />
          <StatusBar style="auto" />
        </>
      )
    );
}
