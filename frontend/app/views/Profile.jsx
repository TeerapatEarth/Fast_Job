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
  Modal,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import React, { Component } from "react";
import { StyleSheet, Text, Image, Alert } from "react-native";
import { Appbar } from "react-native-paper";
import UserService from "../service/UserService";
const bcrypt = require("bcryptjs");
const styles = StyleSheet.create({
  bottom: {
    backgroundColor: "rgb(20,78,99)",
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
      user_name: this.props.route.params.session.user_name,
      newPassword: "",
      email: this.props.route.params.session.email,
      first_name: this.props.route.params.session.first_name,
      last_name: this.props.route.params.session.last_name,
      job: this.props.route.params.session.job,
      img: this.props.route.params.session.img,
      hideInputPassword: true,
      showModal: false,
      confirmPassword: "",
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
    this.setState({ showModal: true });
  };
  confirmPassword = async () => {
    try {
      const result = bcrypt.compareSync(
        this.state.confirmPassword,
        this.props.route.params.session.password
      );
      if (result) {
        this.setState({ showModal: false, hideInputPassword: false });
      } else {
        Alert.alert("Error", "รหัสผ่านไม่ถูกต้อง", [
          {
            text: "Ok",
          },
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  confirmDeleteAccount = () => {
    Alert.alert("Logout", "คุณต้องการลบบัญชีหรือไม่", [
      { text: "Delete", onPress: () => this.deleteAccount() },
      { text: "Cancle" },
    ]);
  }
  deleteAccount = async () => {
    try{
      await UserService.deleteUser(this.props.route.params.session._id)
      Alert.alert("Complete", "ลบบัญชีสำเร็จ", [
        {
          text: "Ok",
          onPress: () => this.logout()
        }
      ])
    } catch (err){
      console.log(err)
    }
  }
  updateProfile = async () => {
    try {
      const newSession = this.props.route.params.session
      newSession.user_name = this.state.user_name
      newSession.email = this.state.email
      newSession.first_name = this.state.first_name
      newSession.last_name = this.state.last_name
      newSession.job = this.state.job
      newSession.img = this.state.img
      this.props.route.params.update(newSession)
      const fd = new FormData()
      fd.append("user_name", this.state.user_name)
      fd.append("password", this.state.newPassword)
      fd.append("email", this.state.email)
      fd.append("first_name", this.state.first_name)
      fd.append("last_name", this.state.last_name)
      fd.append("job", this.state.job)
      let localUri = this.state.img;
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      fd.append("myImage", { uri: localUri, name: filename, type });
      await UserService.updateUser(this.props.route.params.session._id, fd)
      Alert.alert("Complete", "Update สำเร็จ", [
        {
          text: "Ok",
          onPress: () => this.props.navigation.goBack()
        }
      ])

    } catch (err){
      console.log(err)
    }
  }
  logout = async () => {
    try {
      await AuthService.logout();
      this.props.navigation.navigate("login");
    } catch (err) {
      console.log(err);
    }
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
              {this.state.user_name}
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
                    placeholder="New Password"
                    type="password"
                    style={{ borderColor: "black" }}
                    onChangeText={(text) => this.setState({ newPassword: text })}
                    isDisabled={this.state.hideInputPassword}
                  />
                )}
                {this.state.hideInputPassword && (
                  <Button
                    width="100%"
                    onPress={() => this.resetPassword()}
                    style={{ marginTop: 20 }}
                  >
                    Reset password
                  </Button>
                )}
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
              <Button
                width="100%"
                style={{ marginTop: 5 }}
                onPress={() => this.updateProfile()}
              >
                Update Profile
              </Button>
              <FormControl style={{ marginBottom: 20 }}>
                <Button
                  width="100%"
                  onPress={() => {}}
                  colorScheme="red"
                  _text={{ color: "white" }}
                  onPress={() => this.confirmDeleteAccount()}
                >
                  Delete Account
                </Button>
              </FormControl>
            </Stack>
          </Center>
        </ScrollView>
        <Modal isOpen={this.state.showModal}>
          <Modal.Content maxWidth="400px">
            <Modal.Header>Reset Password</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Enter your password</FormControl.Label>
                <Input
                  placeholder="Password"
                  type="password"
                  style={{ borderColor: "black" }}
                  onChangeText={(text) =>
                    this.setState({ confirmPassword: text })
                  }
                  value={this.state.confirmPassword}
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() =>
                    this.setState({ showModal: false, confirmPassword: "" })
                  }
                >
                  Cancel
                </Button>
                <Button onPress={() => this.confirmPassword()}>Ok</Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </NativeBaseProvider>
    );
  }
}
export default Profile;
