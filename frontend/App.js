import React from "react";
import { NativeBaseProvider } from "native-base";
import Login from "./app/views/Login";
import { Appbar } from "react-native-paper";
export default function App() {
  return (
    <NativeBaseProvider>
      <Appbar.Header>
        <Appbar.Content title="Title" subtitle={"Subtitle"} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
    </NativeBaseProvider>
  );
}
