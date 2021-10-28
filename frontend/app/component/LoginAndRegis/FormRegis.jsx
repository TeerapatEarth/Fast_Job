import {
  NativeBaseProvider,
  Center,
  Heading,
  Text,
  FormControl,
  Button,
  Stack,
  Input,
  ScrollView,
  Select,
  Box,
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, Image, TouchableHighlight } from "react-native";
import UserService from "../../service/UserService";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
export default class FormRegis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      password: "",
      confirmPassword: "",
      email: "",
      first_name: "",
      last_name: "",
      job: "",
      day: "",
      month: "",
      year: "",
      img: null,
      arrday: ["1", "2"],
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
  regis = async () => {
    try {
      const fd = new FormData();
      fd.append("user_name", this.state.user_name);
      fd.append("password", this.state.password);
      fd.append("email", this.state.email);
      fd.append("first_name", this.state.first_name);
      fd.append("last_name", this.state.last_name);
      fd.append("job", this.state.job);
      const birth =
        this.state.year + "-" + this.state.month + "-" + this.state.day;
      fd.append("dateOfBirth", birth);
      let localUri = this.state.img;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      fd.append("myImage", { uri: localUri, name: filename, type });
      const result = await UserService.regis(fd);
      console.log("Regis complete");
      Alert.alert("Complete", "สร้างบัญชีสำเร็จ", [
        {
          text: "OK",
          onPress: () => this.props.navigation.navigate("FormLogin"),
        },
      ]);
    } catch (err) {
      console.log(err);
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
          }}
        >
          <Center flex={1}>
            <Heading textAlign="center" mb="3" mt="10" style={styles.font}>
              Fast Jobs
            </Heading>
            <Stack space={5} width="80%">
              <Text fontSize="xl" textAlign="center" style={styles.font}>
                Sign up
              </Text>
              {this.state.img && (
                <Box style={{ alignItems: "center" }}>
                  <Image
                    source={{ uri: this.state.img }}
                    style={{ width: 200, height: 200, alignContent: "center" }}
                  />
                </Box>
              )}
              <Button width="100%" onPress={() => this.pickImage()}>
                Upload Image
              </Button>
              <FormControl isRequired>
                <FormControl.Label _text={{ color: "white" }}>
                  Username
                </FormControl.Label>
                <Input
                  placeholder="Username"
                  style={styles.bgInput}
                  onChangeText={(text) => this.setState({ user_name: text })}
                />
              </FormControl>
              <FormControl isRequired>
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
              <FormControl isRequired>
                <FormControl.Label _text={{ color: "white" }}>
                  Confirm Password
                </FormControl.Label>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  style={styles.bgInput}
                  onChangeText={(text) =>
                    this.setState({ confirmPassword: text })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label _text={{ color: "white" }}>
                  Email
                </FormControl.Label>
                <Input
                  placeholder="Email"
                  style={styles.bgInput}
                  onChangeText={(text) => this.setState({ email: text })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label _text={{ color: "white" }}>
                  First name
                </FormControl.Label>
                <Input
                  placeholder="First name"
                  style={styles.bgInput}
                  onChangeText={(text) => this.setState({ first_name: text })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label _text={{ color: "white" }}>
                  Last name
                </FormControl.Label>
                <Input
                  placeholder="Last name"
                  style={styles.bgInput}
                  onChangeText={(text) => this.setState({ last_name: text })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label _text={{ color: "white" }}>
                  Job
                </FormControl.Label>
                <Select
                  placeholder="Job"
                  style={styles.bgInput}
                  onValueChange={(value) => this.setState({ job: value })}
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
              <Box style={{ flexDirection: "row" }}>
                <FormControl isRequired width="47%" mr={4}>
                  <FormControl.Label _text={{ color: "white" }}>
                    Day
                  </FormControl.Label>
                  <Select
                    placeholder="Day"
                    style={styles.bgInput}
                    onValueChange={(value) => this.setState({ day: value })}
                  >
                    <Select.Item label="1" value="1"></Select.Item>
                    <Select.Item label="2" value="2"></Select.Item>
                    <Select.Item label="3" value="3"></Select.Item>
                    <Select.Item label="4" value="4"></Select.Item>
                    <Select.Item label="5" value="5"></Select.Item>
                    <Select.Item label="6" value="6"></Select.Item>
                    <Select.Item label="7" value="7"></Select.Item>
                    <Select.Item label="8" value="8"></Select.Item>
                    <Select.Item label="9" value="9"></Select.Item>
                    <Select.Item label="10" value="10"></Select.Item>
                    <Select.Item label="11" value="11"></Select.Item>
                    <Select.Item label="12" value="12"></Select.Item>
                    <Select.Item label="13" value="13"></Select.Item>
                    <Select.Item label="14" value="14"></Select.Item>
                    <Select.Item label="15" value="15"></Select.Item>
                    <Select.Item label="16" value="16"></Select.Item>
                    <Select.Item label="17" value="17"></Select.Item>
                    <Select.Item label="18" value="18"></Select.Item>
                    <Select.Item label="19" value="19"></Select.Item>
                    <Select.Item label="20" value="20"></Select.Item>
                    <Select.Item label="21" value="21"></Select.Item>
                    <Select.Item label="22" value="22"></Select.Item>
                    <Select.Item label="23" value="23"></Select.Item>
                    <Select.Item label="24" value="24"></Select.Item>
                    <Select.Item label="25" value="25"></Select.Item>
                    <Select.Item label="26" value="26"></Select.Item>
                    <Select.Item label="27" value="27"></Select.Item>
                    <Select.Item label="28" value="28"></Select.Item>
                    <Select.Item label="29" value="29"></Select.Item>
                    <Select.Item label="30" value="30"></Select.Item>
                    <Select.Item label="31" value="31"></Select.Item>
                  </Select>
                </FormControl>
                <FormControl isRequired width="47%" mr={4}>
                  <FormControl.Label _text={{ color: "white" }}>
                    Month
                  </FormControl.Label>
                  <Select
                    placeholder="Month"
                    style={styles.bgInput}
                    onValueChange={(value) => this.setState({ month: value })}
                  >
                    <Select.Item label="January" value="1"></Select.Item>
                    <Select.Item label="Febuary" value="2"></Select.Item>
                    <Select.Item label="March" value="3"></Select.Item>
                    <Select.Item label="Apirl" value="4"></Select.Item>
                    <Select.Item label="May" value="5"></Select.Item>
                    <Select.Item label="June" value="6"></Select.Item>
                    <Select.Item label="July" value="7"></Select.Item>
                    <Select.Item label="August" value="8"></Select.Item>
                    <Select.Item label="September" value="9"></Select.Item>
                    <Select.Item label="October" value="10"></Select.Item>
                    <Select.Item label="November" value="11"></Select.Item>
                    <Select.Item label="December" value="12"></Select.Item>
                  </Select>
                </FormControl>
              </Box>
              <FormControl isRequired width="47%">
                <FormControl.Label _text={{ color: "white" }}>
                  Year
                </FormControl.Label>
                <Select
                  placeholder="Year"
                  style={styles.bgInput}
                  onValueChange={(value) => this.setState({ year: value })}
                >
                  <Select.Item label="2021" value="2021"></Select.Item>
                </Select>
              </FormControl>
              <Button width="100%" mb="1" mt="3" onPress={() => this.regis()}>
                Sign up
              </Button>
              <Button
                width="100%"
                mb="10"
                onPress={() => this.props.navigation.navigate("FormLogin")}
              >
                Back
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
