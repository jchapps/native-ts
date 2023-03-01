import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import PlannerScreen from "../screens/PlannerScreen";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WorkoutDetailScreen from "../screens/WorkoutDetailScreen";


export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
}

// stack navigation package stuff
const Stack = createNativeStackNavigator();

function RootNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNav}
        options={{ headerShown: false }} //removes title and title background
      />
      <Stack.Screen
        name="WorkoutDetail"
        component={WorkoutDetailScreen}
        options={{ title: "" }} //removes text but stil leave white background

      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();
function BottomTabNav() {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => <Octicons name="home" size={size} color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Planner"
        component={PlannerScreen}
        options={{
          tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="book-education-outline" size={size} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
