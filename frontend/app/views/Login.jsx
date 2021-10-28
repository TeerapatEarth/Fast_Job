import React, { Component } from "react";
import FormLogin from "../component/LoginAndRegis/FormLogin";
import FormRegis from "../component/LoginAndRegis/FormRegis";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
export default class Login extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"FormLogin"} component={FormLogin}></Stack.Screen>
        <Stack.Screen name={"FormRegis"} component={FormRegis}></Stack.Screen>
      </Stack.Navigator>
    );
  }
}
