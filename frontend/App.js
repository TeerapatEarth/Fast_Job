import React from "react";
import { NativeBaseProvider, Switch } from "native-base";
import Login from "./app/views/Login";
import { Appbar } from "react-native-paper";
import Home from "./app/views/Home";
import { NativeRouter, Route, Link } from "react-router-native";
export default function App() {
  return (
    <NativeRouter>
      <NativeBaseProvider>
        <Route path="/" component={Login}></Route>
        <Route path="/home" component={Home}></Route>
      </NativeBaseProvider>
    </NativeRouter>
  );
}
