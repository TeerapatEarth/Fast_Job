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
import { StyleSheet, Image } from "react-native";
import UserService from "../../service/UserService";
import { Alert, ImageBackground } from "react-native";
import * as ImagePicker from "expo-image-picker";
import JobService from "../../service/JobService";
import { TextInput } from "react-native-paper";
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
      description: "",
      job: "",
      day: "",
      month: "",
      year: "",
      img: null,
      dayArr: [],
      monthArr: [],
      yearArr: [],
      jobArr: [],
    };
    this.getYear();
    this.getAllJob();
  }
  getYear = () => {
    var currentYear = new Date().getFullYear();
    var stopYear = 1920;
    while (currentYear >= stopYear) {
      this.state.yearArr.push(currentYear.toString());
      currentYear--;
    }
    var start = 1;
    while (start <= 31) {
      this.state.dayArr.push(start.toString());
      start++;
    }
  };
  getAllJob = async () => {
    try {
      const result = await JobService.getJob();
      this.setState({ jobArr: result.data });
    } catch (err) {
      console.log(err);
    }
  };
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
      if (
        this.state.user_name == "" ||
        this.state.password == "" ||
        this.state.email == "" ||
        this.state.first_name == "" ||
        this.state.last_name == "" ||
        this.state.job == "" ||
        this.state.year == "" ||
        this.state.month == "" ||
        this.state.day == ""
      ) {
        Alert.alert("Error", "กรอกข้อมูลไม่ครบ", [
          {
            text: "OK",
          },
        ]);
        return 0;
      }
      if (this.state.password != this.state.confirmPassword) {
        Alert.alert("Error", "รหัสผ่านไม่ตรงกัน", [
          {
            text: "OK",
          },
        ]);
        return 0;
      }
      const fd = new FormData();
      fd.append("user_name", this.state.user_name);
      fd.append("password", this.state.password);
      fd.append("email", this.state.email);
      fd.append("first_name", this.state.first_name);
      fd.append("last_name", this.state.last_name);
      fd.append("description", this.state.description);
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
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../../assets/Back.png")}
        >
          <ScrollView width="100%">
            <Center flex={1}>
              <Heading textAlign="center" mb="3" mt="10" style={styles.font}>
                Fast Jobs
              </Heading>
              <Stack
                space={5}
                width="80%"
                style={{
                  backgroundColor: "rgba(20,78,99,0.3)",
                  padding: 10,
                  borderRadius: 10,
                  margin: 5,
                }}
              >
                <Text
                  fontSize="xl"
                  textAlign="center"
                  style={{ color: "white", fontSize: 25 }}
                >
                  Sign up
                </Text>
                {this.state.img && (
                  <Box style={{ alignItems: "center" }}>
                    <Image
                      source={{ uri: this.state.img }}
                      style={{
                        width: 200,
                        height: 200,
                        alignContent: "center",
                      }}
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
                  <TextInput
                    placeholder="Username"
                    style={styles.bgInput}
                    onChangeText={(text) => this.setState({ user_name: text })}
                    mode="outlined"
                    theme={{
                      colors: {
                        placeholder: "gray",
                        text: "black",
                        primary: "white",
                        underlineColor: "transparent",
                        background: "#003489",
                      },
                    }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormControl.Label _text={{ color: "white" }}>
                    Password
                  </FormControl.Label>
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.bgInput}
                    onChangeText={(text) => this.setState({ password: text })}
                    mode="outlined"
                    theme={{
                      colors: {
                        placeholder: "gray",
                        text: "black",
                        primary: "white",
                        underlineColor: "transparent",
                        background: "#003489",
                      },
                    }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormControl.Label _text={{ color: "white" }}>
                    Confirm Password
                  </FormControl.Label>
                  <TextInput
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    style={styles.bgInput}
                    onChangeText={(text) =>
                      this.setState({ confirmPassword: text })
                    }
                    mode="outlined"
                    theme={{
                      colors: {
                        placeholder: "gray",
                        text: "black",
                        primary: "white",
                        underlineColor: "transparent",
                        background: "#003489",
                      },
                    }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormControl.Label _text={{ color: "white" }}>
                    Email
                  </FormControl.Label>
                  <TextInput
                    placeholder="Email"
                    style={styles.bgInput}
                    onChangeText={(text) => this.setState({ email: text })}
                    mode="outlined"
                    theme={{
                      colors: {
                        placeholder: "gray",
                        text: "black",
                        primary: "white",
                        underlineColor: "transparent",
                        background: "#003489",
                      },
                    }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormControl.Label _text={{ color: "white" }}>
                    First name
                  </FormControl.Label>
                  <TextInput
                    placeholder="First name"
                    style={styles.bgInput}
                    onChangeText={(text) => this.setState({ first_name: text })}
                    mode="outlined"
                    theme={{
                      colors: {
                        placeholder: "gray",
                        text: "black",
                        primary: "white",
                        underlineColor: "transparent",
                        background: "#003489",
                      },
                    }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormControl.Label _text={{ color: "white" }}>
                    Last name
                  </FormControl.Label>
                  <TextInput
                    placeholder="Last name"
                    style={styles.bgInput}
                    onChangeText={(text) => this.setState({ last_name: text })}
                    mode="outlined"
                    theme={{
                      colors: {
                        placeholder: "gray",
                        text: "black",
                        primary: "white",
                        underlineColor: "transparent",
                        background: "#003489",
                      },
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label _text={{ color: "white" }}>
                    Description
                  </FormControl.Label>
                  <TextInput
                    placeholder="Description"
                    style={styles.bgInput}
                    onChangeText={(text) =>
                      this.setState({ description: text })
                    }
                    mode="outlined"
                    theme={{
                      colors: {
                        placeholder: "gray",
                        text: "black",
                        primary: "white",
                        underlineColor: "transparent",
                        background: "#003489",
                      },
                    }}
                    numberOfLines={10}
                    multiline={true}
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
                    {this.state.jobArr.map((item) => (
                      <Select.Item
                        key={item._id}
                        label={item.job}
                        value={item.job}
                      ></Select.Item>
                    ))}
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
                      {this.state.dayArr.map((item) => (
                        <Select.Item
                          key={item}
                          label={item}
                          value={item}
                        ></Select.Item>
                      ))}
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
                    {this.state.yearArr.map((item) => (
                      <Select.Item
                        key={item}
                        label={item}
                        value={item}
                      ></Select.Item>
                    ))}
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
        </ImageBackground>
      </NativeBaseProvider>
    );
  }
}
const styles = StyleSheet.create({
  font: {
    color: "rgb(20,78,99)",
    fontSize: 50,
  },
  bgInput: {
    backgroundColor: "white",
  },
});
