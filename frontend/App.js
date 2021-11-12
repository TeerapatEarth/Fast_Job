import React from "react";
import Login from "./app/views/Login";
import Home from "./app/views/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notify from "./app/views/Notify";
import CreatePost from "./app/views/CreatePost";
import Profile from "./app/views/Profile";
import AnotherProfile from "./app/views/AnotherProfile";
import SearchPostPage from "./app/views/SearchPostPage";
import Admin from "./app/views/Admin"
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"login"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={"login"} component={Login}></Stack.Screen>
        <Stack.Screen name={"home"} component={Home}></Stack.Screen>
        <Stack.Screen name={"notify"} component={Notify}></Stack.Screen>
        <Stack.Screen name={"createpost"} component={CreatePost}></Stack.Screen>
        <Stack.Screen name={"profile"} component={Profile}></Stack.Screen>
        <Stack.Screen
          name={"anotherProfile"}
          component={AnotherProfile}
        ></Stack.Screen>
        <Stack.Screen name={"search"} component={SearchPostPage}></Stack.Screen>
        <Stack.Screen name={"admin"} component={Admin}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
