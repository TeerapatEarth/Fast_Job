import React from "react";
import Login from "./app/views/Login";
import Home from "./app/views/Home";
import { NativeRouter, Route, Link } from "react-router-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notify from "./app/views/Notify"
import Profile from "./app/views/Profile"
import AnotherProfile from "./app/views/AnotherProfile";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"login"} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"login"} component={Login}></Stack.Screen>
        <Stack.Screen name={"home"} component={Home}></Stack.Screen>
        <Stack.Screen name={"notify"} component={Notify}></Stack.Screen>
        <Stack.Screen name={"profile"} component={Profile}></Stack.Screen>
        <Stack.Screen name={"anotherprofile"} component={AnotherProfile}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
