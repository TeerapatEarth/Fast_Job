import {
  Text,
  NativeBaseProvider,
  FlatList,
  Box,
  HStack,
  VStack,
  Image,
  Button,
  Input,
  FormControl,
  Heading,
  Spinner,
} from "native-base";
import React, { Component } from "react";
import { Alert, Keyboard } from "react-native";
import JobSerVice from "../../service/JobService";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allJob: [],
      renderItem: false,
      newJob: "",
    };
    this.getJob();
  }
  getJob = async () => {
    try {
      const result = await JobSerVice.getJob();
      this.setState({ allJob: result.data, renderItem: true });
    } catch (err) {
      console.log(err);
    }
  };
  addJob = async () => {
    try {
      if (this.state.newJob === "") {
        Alert.alert("Error", "กรอกข้อมูลไม่ครบ", [
          {
            text: "OK",
          },
        ]);
        return 0;
      }
      const result = await JobSerVice.createJob({ job: this.state.newJob });
      const newArr = this.state.allJob;
      newArr.push(result.data);
      this.setState({ allJob: newArr, newJob: "" });
      Alert.alert("Complete", "เพิ่มอาชีพสำเร็จ", [
        {
          text: "OK",
        },
      ]);
      Keyboard.dismiss();
    } catch (err) {
      console.log(err);
    }
  };
  confirmDelete = (id, index) => {
    Alert.alert("Logout", "คุณต้องการอาชีพหรือไม่", [
      { text: "Delete", onPress: () => this.deleteJob(id, index) },
      { text: "Cancle" },
    ]);
  };
  deleteJob = async (id, index) => {
    try {
      const newArr = this.state.allJob;
      newArr.splice(index, 1);
      this.setState({ allJob: newArr });
      await JobSerVice.deleteJob(id);
      Alert.alert("Complete", "ลบอาชีพสำเร็จ", [
        {
          text: "OK",
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <NativeBaseProvider>
        <FormControl width="70%" alignSelf="center" mb={5} mt={3}>
          <FormControl.Label>Job</FormControl.Label>
          <HStack space={4}>
            <Input
              placeholder="Job"
              onChangeText={(text) => this.setState({ newJob: text })}
              width="71%"
              value={this.state.newJob}
            />
            <Button
              colorScheme="green"
              _text={{ color: "white" }}
              onPress={() => this.addJob()}
            >
              Add
            </Button>
          </HStack>
        </FormControl>
        {!this.state.renderItem && (
          <Box>
            <Spinner accessibilityLabel="Loading posts" />
          </Box>
        )}
        {this.state.renderItem && (
          <FlatList
            style={{ borderBottomColor: "red" }}
            data={this.state.allJob}
            renderItem={({ item, index }) => (
              <Box
                style={{
                  height: 50,
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <HStack>
                  <VStack width="70%">
                    <Text fontSize={20} style={{ marginTop: 10 }}>
                      {item.job}
                    </Text>
                  </VStack>
                  <VStack>
                    <Button
                      colorScheme="red"
                      _text={{ color: "white" }}
                      onPress={() => this.confirmDelete(item._id, index)}
                    >
                      Delete
                    </Button>
                  </VStack>
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item._id}
          />
        )}
        <Box mb={3}></Box>
      </NativeBaseProvider>
    );
  }
}
