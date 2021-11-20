import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotiPage from "../component/Noti/NotiPage";
const Stack = createNativeStackNavigator();

export default class Login extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "rgb(20,78,99)" } }}
      >
        <Stack.Screen name={"Notify"} component={NotiPage}></Stack.Screen>
      </Stack.Navigator>
    );
  }
}
