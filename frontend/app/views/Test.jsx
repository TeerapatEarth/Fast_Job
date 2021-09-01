import React, { Component } from "react";
import { View } from "react-native";
import { Button, Center, NativeBaseProvider } from "native-base";
export default class Test extends Component {
  render() {
    return (
      <View>
        <NativeBaseProvider>
          <Button>PRIMARY</Button>
        </NativeBaseProvider>
      </View>
    );
  }
}
