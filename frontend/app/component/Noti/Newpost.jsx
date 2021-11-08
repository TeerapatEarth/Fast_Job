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
import AuthService from "../../service/AuthService";
import DescModal from "../Modal/DescModal";
import { TouchableRipple } from "react-native-paper";
export default class Newpost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionUser: "",
      time: "",
      modalDetail: false,
      modalSwitch: false,
      dataItem: "",
    };
    this.getSession();
  }
  getSession = async () => {
    try {
      const result = await AuthService.session();
      this.setState({ sessionUser: result.data });
    } catch (err) {
      console.log(err);
    }
  };
  setHide = (bool, item) => {
    this.setState({ modalDetail: bool, modalSwitch: bool, dataItem: item });
  };
  render() {
    return (
      <NativeBaseProvider>
        <FlatList
          style={{ borderBottomColor: "red" }}
          data={this.state.sessionUser.notiNewPost}
          renderItem={({ item }) => (
            <Box
              height={100}
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
                      id: item.ownerId,
                    })
                  }
                >
                  <Image
                    size="md"
                    source={{
                      uri: item.img,
                    }}
                    alt="Alternate Text"
                    style={{ borderRadius: 40 }}
                  />
                </TouchableRipple>
                <VStack style={{ width: 200 }}>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                    numberOfLines={1}
                  >
                    {item.first_name} {item.last_name}
                  </Text>

                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {item.job}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    numberOfLines={2}
                    mt={1}
                  >
                    {item.description}
                  </Text>
                </VStack>
                <VStack justifyContent="space-between" style={{ width: "23%" }}>
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    alignSelf="center"
                  >
                    {item.createDate}
                  </Text>
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    alignSelf="center"
                  >
                    {item.createTime}
                  </Text>
                  <Button
                    size="sm"
                    alignSelf="center"
                    onPress={() => {
                      this.setHide(true, item);
                    }}
                  >
                    Detail
                  </Button>
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
          )}
          keyExtractor={(item) => item._id}
        />
      </NativeBaseProvider>
    );
  }
}
