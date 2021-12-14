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
  Image
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, Alert, ImageBackground, View} from "react-native";
import { TextInput } from "react-native-paper";
import AuthService from "../../service/AuthService";
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
      this.setState({user_name: "", password: ""})
      this.props.navigation.navigate("home")
    } catch (err) {
      Alert.alert("ข้อมูลไม่ถูกต้อง", "กรอก Username หรือ password ไม่ถูกต้อง", [{ text: "OK" }]);
    }
  };
  render() {
    return (
      
      <NativeBaseProvider>
        <ImageBackground style={{flex: 1}} source={require("../../assets/Back.png")}>
        <ScrollView
          width="100%"
          _contentContainerStyle={{
            height: "100%",
          }}
        >
          <Center flex={1}>
            <View style={{paddingLeft: 15}}>
            <Image
              source={require("../../assets/Logo3.png")}
              resizeMode="contain"
              alt="Header"
              style={{padding: 10}}
            />
            </View>
            <Stack space={5} width="80%">
              <Heading size="2xl" textAlign="center" style={styles.font}>
                Login
              </Heading>
              <FormControl>
                <FormControl.Label _text={{ color: "white" }}>
                  Username
                </FormControl.Label>
                <TextInput
                  placeholder="Username"
                  style={styles.bgInput}
                  onChangeText={(text) => this.setState({ user_name: text })}
                  value={this.state.user_name}
                  mode="outlined"
                  theme={{ colors: { placeholder: 'gray', text: 'black', primary: 'white',underlineColor:'transparent',background : '#003489'}}}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ color: "white" }}>
                  Password
                </FormControl.Label>
                <TextInput
                  placeholder="Password"
                  secureTextEntry={true}
                  style={styles.bgInput}
                  onChangeText={(text) => this.setState({ password: text })}
                  value={this.state.password}
                  mode="outlined"
                  theme={{ colors: { placeholder: 'gray', text: 'black', primary: 'white',underlineColor:'transparent',background : '#003489'}}}
                />
              </FormControl>
              <Button width="100%" mt="3" onPress={() => this.login()}>
                Login
              </Button>
              <Button width="100%" onPress={() => this.props.navigation.navigate("FormRegis")}>
                Sign up
              </Button>
            </Stack>
          </Center>
        </ScrollView>
        </ImageBackground>
      </NativeBaseProvider>
      
    );
  }
}

const styles = StyleSheet.create({
  font: {
    color: "rgb(20,78,99)",
  },
  bgInput: {
    backgroundColor: "white",
  },
});

export default FormLogin;
