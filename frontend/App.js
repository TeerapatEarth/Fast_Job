import React from "react";
import Login from "./app/views/Login";
import Home from "./app/views/Home";
import { NativeRouter, Route, Link } from "react-router-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notify from "./app/views/Notify"
import CreatePost from "./app/views/CreatePost";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"login"} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"login"} component={Login}></Stack.Screen>
        <Stack.Screen name={"home"} component={Home}></Stack.Screen>
        <Stack.Screen name={"notify"} component={Notify}></Stack.Screen>
        <Stack.Screen name={"createpost"} component={CreatePost}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
