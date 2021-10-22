import {
  NativeBaseProvider,
  Stack,
  Text,
  Input,
  Button,
  Center,
  Heading,
  FormControl,
  ScrollView,
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";
import AuthService from "../../service/AuthService";
import { withRouter } from "react-router-native";
class FormLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      password: "",
    };
  }
  login = async () => {
    const obj = {
      user_name: this.state.user_name,
      password: this.state.password,
    };
    try {
      await AuthService.login(obj);
      console.log("Login");
      this.props.history.push("/home")
    } catch (err) {
      Alert.alert("Error", "กรอกข้อมูลไม่ถูกต้อง", [{ text: "OK" }]);
    }
  };
  render() {
    return (
      <NativeBaseProvider>
        <ScrollView
          width="100%"
          _contentContainerStyle={{
            bg: "primary.900",
            height: "100%",
          }}
        >
          <Center flex={1}>
            <Heading textAlign="center" mb="3" style={styles.font}>
              Fast Jobs
            </Heading>
            <Stack space={5} width="80%">
              <Text fontSize="xl" textAlign="center" style={styles.font}>
                Login
              </Text>
              <FormControl>
                <FormControl.Label _text={{ color: "white" }}>
                  Username
                </FormControl.Label>
                <Input
                  placeholder="Username"
                  style={styles.bgInput}
                  onChangeText={(text) => this.setState({ user_name: text })}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ color: "white" }}>
                  Password
                </FormControl.Label>
                <Input
                  placeholder="Password"
                  type="password"
                  style={styles.bgInput}
                  onChangeText={(text) => this.setState({ password: text })}
                />
              </FormControl>
              <Button width="100%" mt="3" onPress={() => this.login()}>
                Login
              </Button>
              <Button width="100%" onPress={() => this.props.regis()}>
                Sign up
              </Button>
            </Stack>
          </Center>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

const styles = StyleSheet.create({
  font: {
    color: "white",
  },
  bgInput: {
    backgroundColor: "white",
  },
});

export default withRouter(FormLogin);
