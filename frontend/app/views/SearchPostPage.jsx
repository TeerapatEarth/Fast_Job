import {
  NativeBaseProvider,
  FlatList,
  Box,
  HStack,
  VStack,
  Image,
  Text,
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";
import { Appbar } from "react-native-paper";
import PostService from "../service/PostService";
import { TouchableRipple } from "react-native-paper";
import DescModal from "../component/Modal/DescModal";
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
export default class SearchPostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      modalDetail: false,
      modalSwitch: false,
      dataItem: ""
    };
    this.getPost(this.props.route.params.word);
  }
  getPost = async (word) => {
    try {
      const result = await PostService.searchPost(word);
      this.setState({ post: result.data });
      console.log(this.state.post)
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
        <Appbar style={styles.bottom}>
          <Appbar.BackAction
            onPress={() => this.props.navigation.goBack()}
            style={styles.arrow}
          />
          <Appbar.Content
            title={this.props.route.params.word}
            style={styles.arrow}
          />
        </Appbar>
        <FlatList
          style={{ borderBottomColor: "red" }}
          data={this.state.post}
          renderItem={({ item }) => (
            <TouchableRipple onPress={() => this.setHide(true, item)}>
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
                        id: item.ownerId,
                      })
                    }
                  >
                    <Image
                      size="md"
                      source={{
                        uri: item.imgOwner,
                      }}
                      alt="Alternate Text"
                      style={{ borderRadius: 40, marginTop: 10 }}
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
                      {item.title}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      numberOfLines={2}
                      mt={1}
                    >
                      {item.createDate} {item.createTime}
                    </Text>
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
          )}
          keyExtractor={(item) => item._id}
        />
      </NativeBaseProvider>
    );
  }
}
