import React, { Component } from "react";
import {
  Text,
  NativeBaseProvider,
  FlatList,
  Box,
  HStack,
  VStack,
  Image,
  Button,
} from "native-base";
import DescModal from "../Modal/DescModal";
import { TouchableRipple } from "react-native-paper";
import PostService from "../../service/PostService";
import { Alert } from "react-native";
import UserService from "../../service/UserService";
export default class NewJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalDetail: false,
      modalSwitch: false,
      arr: props.notijob,
    };
  }
  confirmDeleteNoti = (item, index) => {
    Alert.alert("Delete", "ต้องการลบแจ้งเตือนหรือไม่", [
      {
        text: "Delete",
        onPress: () => this.deleteNoti(item, index),
      },
      { text: "Cancle" },
    ]);
  };
  deleteNoti = async (item, index) => {
    try {
      this.props.deleteUser(index);
      await UserService.deleteNotiJob(item, this.props.id);
    } catch (err) {
      console.log(err);
    }
  };
  setHide = (bool, item) => {
    this.setState({ modalDetail: bool, modalSwitch: bool, dataItem: item });
  };
  declineUser = async (item, index) => {
    try {
      this.props.deleteUser(index);
      const obj = { _id: item.userRequestId, job: item.job };
      await PostService.cancleUser(obj, item._id);
    } catch (err) {
      console.log(err);
    }
  };
  applyUser = async (item, index) => {
    try {
      this.props.deleteUser(index);
      const obj = { _id: item.userRequestId, job: item.job };
      await PostService.applyUser(obj, item._id);
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <NativeBaseProvider>
        <FlatList
          style={{ borderBottomColor: "red" }}
          data={this.props.notijob}
          renderItem={({ item, index }) => (
            <Box>
              <TouchableRipple
                onPress={() => this.setHide(true, item)}
                onLongPress={() => this.confirmDeleteNoti(item, index)}
              >
                <Box
                  height={120}
                  mb={1}
                  _dark={{
                    borderColor: "gray.600",
                  }}
                  borderColor="coolGray.200"
                  pl="4"
                  pr="5"
                  py="2"
                >
                  <HStack space={2}>
                    <TouchableRipple
                      onPress={() =>
                        this.props.navigation.navigate("anotherProfile", {
                          id: item.userRequestId,
                        })
                      }
                    >
                      <Image
                        size="md"
                        source={{
                          uri: item.imgRequest,
                        }}
                        alt="Alternate Text"
                        style={{ borderRadius: 40, marginTop: 10 }}
                      />
                    </TouchableRipple>
                    <VStack style={{ width: 200 , marginTop: 15}}>
                      <Text
                        _dark={{
                          color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        bold
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>

                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: "warmGray.200",
                        }}
                        numberOfLines={1}
                      >
                        By : {item.first_nameRequest} {item.last_nameRequest}
                      </Text>
                      {item.requestPost == true && (
                        <Text
                          color="coolGray.600"
                          _dark={{
                            color: "warmGray.200",
                          }}
                          numberOfLines={2}
                          mt={1}
                        >
                          Job : {item.jobRequest}
                        </Text>
                      )}
                      {item.type == "findJob" && item.requestPost == false && (
                        <Text
                          color="coolGray.600"
                          _dark={{
                            color: "warmGray.200",
                          }}
                          numberOfLines={2}
                          mt={1}
                        >
                          ยืนยันการรับงาน
                        </Text>
                      )}
                      {item.type == "hire" && item.requestPost == false && (
                        <Text
                          color="coolGray.600"
                          _dark={{
                            color: "warmGray.200",
                          }}
                          numberOfLines={2}
                          mt={1}
                        >
                          ยืนยันการรับสมัครงาน
                        </Text>
                      )}
                      {item.type == "findJob" && item.requestPost == true && (
                        <Text
                          color="coolGray.600"
                          _dark={{
                            color: "warmGray.200",
                          }}
                          numberOfLines={2}
                          mt={1}
                        >
                          {item.first_nameRequest} ต้องการจ้างคุณทำงาน
                        </Text>
                      )}
                      {item.type == "hire" && item.requestPost == true && (
                        <Text
                          color="coolGray.600"
                          _dark={{
                            color: "warmGray.200",
                          }}
                          numberOfLines={2}
                          mt={1}
                        >
                          {item.first_nameRequest} ต้องการสมัครงานของคุณ
                        </Text>
                      )}
                    </VStack>
                    <VStack
                      justifyContent="space-between"
                      style={{ width: "23%" }}
                    >
                      <Image
                        size="md"
                        source={{
                          uri: item.img,
                        }}
                        alt="Alternate Text"
                        style={{ marginTop: 11 }}
                      />
                    </VStack>
                  </HStack>
                  {this.state.modalSwitch && (
                    <DescModal
                      data={this.state.dataItem}
                      setHide={this.setHide}
                      hide={this.state.modalDetail}
                    ></DescModal>
                  )}
                </Box>
              </TouchableRipple>
              {item.requestPost == true && (
                <Box mb={3} mt={1}>
                  <HStack space={5} alignSelf="flex-end" mr={2}>
                    <Button
                      colorScheme="green"
                      onPress={() => this.applyUser(item, index)}
                    >
                      Accept
                    </Button>
                    <Button
                      colorScheme="red"
                      _text={{ color: "white" }}
                      onPress={() => this.declineUser(item, index)}
                    >
                      Decline
                    </Button>
                  </HStack>
                </Box>
              )}
            </Box>
          )}
          keyExtractor={(item) => item._id}
        />
      </NativeBaseProvider>
    );
  }
}
