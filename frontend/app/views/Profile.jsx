import {
  NativeBaseProvider,
  ScrollView,
  Center,
  Heading,
  FormControl,
  Button,
  Stack,
  Input,
  Select,
  Box,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import React, { Component } from "react";
import { StyleSheet, Text, Image } from "react-native";
import { Appbar } from "react-native-paper";
const bcrypt = require("bcryptjs");
const styles = StyleSheet.create({
  bottom: {
    backgroundColor: "#26c5de",
    height: 80,
  },
  arrow: {
    marginTop: 55,
    marginBottom: 30,
  },
});
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: this.props.route.params.user_name,
      password: "123",
      email: this.props.route.params.email,
      first_name: this.props.route.params.first_name,
      last_name: this.props.route.params.last_name,
      job: this.props.route.params.job,
      img: this.props.route.params.img,
      hideInputPassword: true,
    };
  }
  pickImage = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          this.setState({ img: result.uri });
          console.log(this.state.img);
        }
      }
    }
  };
  resetPassword = async () => {
    // const result = bcrypt.compareSync(
    //   this.state.password,
    //   this.props.route.params.password
    // );
    // console.log(result);
    this.setState({ hideInputPassword: false });
  };
  render() {
    return (
      <NativeBaseProvider>
        <Appbar style={styles.bottom}>
          <Appbar.BackAction
            onPress={() => this.props.navigation.goBack()}
            style={styles.arrow}
          />
          <Appbar.Content title="Profile" style={styles.arrow} />
        </Appbar>
        <ScrollView width="100%">
          <Center flex={1}>
            <Heading textAlign="center" mb="3" mt="5" style={styles.font}>
              {this.props.route.params.user_name}
            </Heading>
            <Stack space={5} width="80%">
              <Box style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: this.state.img }}
                  style={{
                    width: 200,
                    height: 200,
                    alignContent: "center",
                    borderRadius: 1000,
                  }}
                />
              </Box>
              <Button width="100%" onPress={() => this.pickImage()}>
                Change Image
              </Button>
              <FormControl>
                <FormControl.Label _text={{ color: "black" }}>
                  Username
                </FormControl.Label>
                <Input
                  placeholder="Username"
                  style={{ borderColor: "black" }}
                  onChangeText={(text) => this.setState({ user_name: text })}
                  value={this.state.user_name}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ color: "black" }}>
                  Password
                </FormControl.Label>
                {!this.state.hideInputPassword && (
                  <Input
                    placeholder="Password"
                    style={{ borderColor: "black" }}
                    onChangeText={(text) => this.setState({ password: text })}
                    isDisabled={this.state.hideInputPassword}
                  />
                )}
                <Button
                  width="100%"
                  onPress={() => this.resetPassword()}
                  style={{ marginTop: 20 }}
                >
                  Reset password
                </Button>
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ color: "black" }}>
                  Email
                </FormControl.Label>
                <Input
                  placeholder="Username"
                  style={{ borderColor: "black" }}
                  onChangeText={(text) => this.setState({ email: text })}
                  value={this.state.email}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ color: "black" }}>
                  First name
                </FormControl.Label>
                <Input
                  placeholder="Username"
                  style={{ borderColor: "black" }}
                  onChangeText={(text) => this.setState({ first_name: text })}
                  value={this.state.first_name}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ color: "black" }}>
                  Last name
                </FormControl.Label>
                <Input
                  placeholder="Username"
                  style={{ borderColor: "black" }}
                  onChangeText={(text) => this.setState({ last_name: text })}
                  value={this.state.last_name}
                />
              </FormControl>
              <FormControl style={{ marginBottom: 20 }}>
                <FormControl.Label _text={{ color: "black" }}>
                  Job
                </FormControl.Label>
                <Select
                  placeholder="Job"
                  onValueChange={(value) => this.setState({ job: value })}
                  value={this.state.job}
                >
                  <Select.Item
                    label="Front-end Developer"
                    value="Front-end Developer"
                  ></Select.Item>
                  <Select.Item
                    label="Back-end Developer"
                    value="Back-end Developer"
                  ></Select.Item>
                  <Select.Item
                    label="Full Stack Developer"
                    value="Full Stack Developer"
                  ></Select.Item>
                </Select>
              </FormControl>
              <FormControl style={{marginBottom: 20}}>
                <Button width="100%" onPress={() => this.resetPassword()} colorScheme="red" _text={{color: "white"}}>
                  Delete Account
                </Button>
              </FormControl>
            </Stack>
          </Center>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}
export default Profile;
