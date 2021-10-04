import React from 'react';
import { NativeBaseProvider } from "native-base";
import Login from './app/views/Login'

export default function App() {
  return (
    <NativeBaseProvider>
      <Login></Login>
    </NativeBaseProvider>
  );
}
