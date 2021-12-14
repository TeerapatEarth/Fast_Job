import {
  NativeBaseProvider,
  ScrollView,
  Center,
  Heading,
  Stack,
  Box,
  Button,
  Image,
  Text,
  HStack,
  VStack,
} from "native-base";
import { Appbar } from "react-native-paper";
import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";
import UserService from "../service/UserService";
import AuthService from "../service/AuthService";
const styles = StyleSheet.create({
  bottom: {
    backgroundColor: "rgb(20,78,99)",
    color: "white",
    height: 80,
  },
  arrow: {
    marginTop: 55,
    marginBottom: 30,
  },
});
export default class AnotherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      id: "",
      showReport: false,
      renderReported: false,
      renderItem: false,
    };
    this.session();
    this.getUser(this.props.route.params.id);
  }
  session = async () => {
    try {
      const result = await AuthService.session();
      this.setState({ id: result.data._id });
      if (this.state.id !== this.props.route.params.id) {
        this.setState({ showReport: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  getUser = async (id) => {
    try {
      const result = await UserService.getOneUser(id);
      this.setState({ user: result.data });
      const check = result.data.reportUser.some(
        (item) => item._id == this.state.id
      );
      if (check) {
        this.setState({ renderReported: true });
      }
      this.setState({ renderItem: true });
    } catch (err) {
      console.log(err);
    }
  };
  reportUser = async (id, idRequest) => {
    try {
      this.setState({renderReported: true})
      const obj = { _id: idRequest };
      await UserService.reportUser(obj, id);
      Alert.alert("Report user complete", "รายงานผู้ใช้สำเร็จ", [
        {
          text: "Close",
        },
      ]);
    } catch (err) {
      console.log(err);
    }
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
            title={this.state.user.user_name}
            style={styles.arrow}
          />
        </Appbar>
        {this.state.renderItem && (
          <ScrollView width="100%" mt={3}>
            <Center flex={1}>
              <Heading textAlign="center" mb="3" mt="5">
                {this.state.user.user_name}
              </Heading>
              <Text fontSize={20}>{this.state.user.job}</Text>
              <Stack space={5} width="80%" mt={5}>
                <Box style={{ alignItems: "center" }}>
                  <Image
                    source={{ uri: this.state.user.img }}
                    style={{
                      width: 200,
                      height: 200,
                      alignContent: "center",
                      borderRadius: 1000,
                    }}
                    alt="text"
                  />
                  <Box mt={5} mb={1}>
                    <Text fontSize={25} alignSelf="center">
                      {this.state.user.first_name} {this.state.user.last_name}
                    </Text>
                    <Text fontSize={15} alignSelf="center">
                      {this.state.user.email}
                    </Text>
                  </Box>
                  <Box mb={7} ml={4}>
                    <Text fontSize={15}>{this.state.user.description}</Text>
                  </Box>
                  {this.state.showReport && !this.state.renderReported && (
                    <Button
                      mb={10}
                      width="85%"
                      colorScheme="red"
                      _text={{ color: "white" }}
                      onPress={() =>
                        this.reportUser(
                          this.props.route.params.id,
                          this.state.id
                        )
                      }
                    >
                      Report User
                    </Button>
                  )}
                  {this.state.renderReported && (
                    <Button mb={10} width="85%" _text={{ color: "white" }}>
                      Reported
                    </Button>
                  )}
                </Box>
              </Stack>
            </Center>
          </ScrollView>
        )}
      </NativeBaseProvider>
    );
  }
}
