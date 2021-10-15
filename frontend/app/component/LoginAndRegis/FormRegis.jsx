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
import { StyleSheet } from "react-native";
import UserService from "../../service/UserService"
import { Alert } from "react-native";
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
      img: "",
    };
  }
  regis = async () => {
    try {
      const fd = new FormData()
      fd.append("user_name", this.state.user_name)
      fd.append("password", this.state.password)
      fd.append("email", this.state.email)
      fd.append("first_name", this.state.first_name)
      fd.append("last_name", this.state.last_name)
      fd.append("job", this.state.job)
      const birth = this.state.year + "-" + this.state.month + "-" + this.state.day
      fd.append("dateOfBirth", birth)
      const result = await UserService.regis(fd)
      console.log("Regis complete")
      Alert.alert("Complete", "สร้างบัญชีสำเร็จ",[
        { text: "OK", onPress: () => this.props.login() }
      ])
    } catch (err) {
      Alert.alert("Error", "กรอกข้อมูลไม่ถูกต้อง",[
        { text: "OK", }
      ])
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
                  onChangeText={(text) => this.setState({ confirmPassword: text })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label _text={{ color: "white" }}>
                  Email
                </FormControl.Label>
                <Input placeholder="Email" style={styles.bgInput} onChangeText={(text) => this.setState({ email: text })}/>
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label _text={{ color: "white" }}>
                  First name
                </FormControl.Label>
                <Input placeholder="First name" style={styles.bgInput} onChangeText={(text) => this.setState({ first_name: text })}/>
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label _text={{ color: "white" }}>
                  Last name
                </FormControl.Label>
                <Input placeholder="Last name" style={styles.bgInput} onChangeText={(text) => this.setState({ last_name: text })}/>
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label _text={{ color: "white" }}>
                  Job
                </FormControl.Label>
                <Select placeholder="Job" style={styles.bgInput} onValueChange={(value) => this.setState({job: value})}>
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
                  <Select placeholder="Day" style={styles.bgInput} onValueChange={(value) => this.setState({ day: value })}>
                    <Select.Item label="1" value="1"></Select.Item>
                  </Select>
                </FormControl>
                <FormControl isRequired width="47%" mr={4}>
                  <FormControl.Label _text={{ color: "white" }}>
                    Month
                  </FormControl.Label>
                  <Select placeholder="Month" style={styles.bgInput} onValueChange={(value) => this.setState({ month: value })}>
                    <Select.Item label="1" value="1"></Select.Item>
                  </Select>
                </FormControl>
              </Box>
              <FormControl isRequired width="47%">
                <FormControl.Label _text={{ color: "white" }}>
                  Year
                </FormControl.Label>
                <Select placeholder="Year" style={styles.bgInput} onValueChange={(value) => this.setState({ year: value })}>
                  <Select.Item label="2021" value="2021"></Select.Item>
                </Select>
              </FormControl>
              <Button width="100%" mb="1" mt="3" onPress={() => this.regis()}>
                Sign up
              </Button>
              <Button width="100%" mb="10" onPress={() => this.props.login()}>
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
