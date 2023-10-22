import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./Screens/Splash";
import Login from "./Screens/Login";
import Home from "./Screens/Home";
import SignUp from "./Screens/SignUp";
import Splash2 from "./Screens/Splash2";
import Favourites from "./Screens/Favourites";
import RecipeDetails from "./Screens/RecipeDetails";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={Splash}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash2"
          component={Splash2}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="RecipeDetails"
          component={RecipeDetails}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Favourites"
          component={Favourites}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
