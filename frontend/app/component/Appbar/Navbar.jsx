import { NativeBaseProvider, Image } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Appbar, TouchableRipple } from "react-native-paper";
const styles = StyleSheet.create({
  bottom: {
    marginTop: 20,
    justifyContent: "flex-end",
    backgroundColor: "#26c5de",
  },
});
export default class Navbar extends Component {
  render() {
    return (
      <Appbar style={styles.bottom}>
        <TouchableRipple
          onPress={() =>
            this.props.navigation.navigate("profile", {
              session: this.props.session,
              update: this.props.updateSec,
              goBack: this.props.navigation.goBack,
            })
          }
        >
          <Image
            size="xs"
            source={{ uri: this.props.img }}
            alt="Alternate Text"
            style={{ borderRadius: 20 }}
          />
        </TouchableRipple>
        <Appbar.Content title={this.props.user_name} color="white" />
        <Appbar.Action
          icon="bell"
          color="white"
          onPress={() => this.props.navigation.navigate("notify")}
        />
        <Appbar.Action
          icon="power"
          color="white"
          onPress={() => this.props.logout()}
        />
      </Appbar>
    );
  }
}
