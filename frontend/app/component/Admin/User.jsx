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
import { TouchableRipple } from "react-native-paper";
import UserService from "../../service/UserService";
import AuthService from "../../service/AuthService";
export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUser: [],
      renderItem: false,
      id: "",
    };
    this.getAllUser();
    this.session()
  }
  session = async () => {
    try {
      const result = await AuthService.session();
      this.setState({ id: result.data._id });
    } catch (err) {
      console.log(err);
    }
  };
  getAllUser = async () => {
    try {
      const result = await UserService.getAllUser();
      this.setState({ allUser: result.data, renderItem: true });
    } catch (err) {
      console.log(err);
    }
  };
  banUser = async (id, idx) => {
    try {
      await UserService.banUser(id)
      const newArr = this.state.allUser
      newArr[idx].ban = true
      this.setState({allUser: newArr})
    } catch (err){
      console.log(err)
    }
  }
  unBanUser = async (id, idx) => {
    try{
      await UserService.unBan(id)
      const newArr = this.state.allUser
      newArr[idx].ban = false
      this.setState({allUser: newArr})
    } catch (err){
      console.log(err)
    }
  }
  render() {
    return (
      <NativeBaseProvider>
        {this.state.renderItem && (
          <FlatList
            style={{ borderBottomColor: "red" }}
            data={this.state.allUser}
            renderItem={({ item, index }) => (
              <TouchableRipple>
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
                          id: item._id,
                        })
                      }
                    >
                      <Image
                        size="md"
                        source={{
                          uri: item.img,
                        }}
                        alt="Alternate Text"
                        style={{ borderRadius: 40, marginTop: 10 }}
                      />
                    </TouchableRipple>
                    <VStack style={{ width: 200, marginTop: 13 }}>
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
                        numberOfLines={1}
                      >
                        {item.email}
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: "warmGray.200",
                        }}
                      >
                        {item.job}
                      </Text>
                    </VStack>
                    <VStack
                      justifyContent="space-between"
                      style={{ width: "23%" }}
                    >
                      {item._id !== this.state.id && item.ban === false &&(
                        <Button
                          colorScheme="red"
                          _text={{ color: "white" }}
                          style={{ marginTop: 25 }}
                          onPress={()=>this.banUser(item._id, index)}
                        >
                          Ban
                        </Button>
                      )}
                      {
                        item._id !== this.state.id && item.ban === true &&(
                          <Button
                          style={{ marginTop: 25 }}
                          onPress={()=>this.unBanUser(item._id, index)}
                        >
                          Un ban
                        </Button>
                        )
                      }
                    </VStack>
                  </HStack>
                </Box>
              </TouchableRipple>
            )}
            keyExtractor={(item) => item._id}
          />
        )}
      </NativeBaseProvider>
    );
  }
}
