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
    backgroundColor: "#26c5de",
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
    };
    this.session()
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
    } catch (err) {
      console.log(err);
    }
  };
  reportUser = async (id) => {
    try {
      await UserService.reportUser(id);
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
        <ScrollView width="100%" mt={3}>
          <Center flex={1}>
            <Heading textAlign="center" mb="3" mt="5">
              {this.state.user.user_name}
            </Heading>
            <Text fontSize={20}>{this.state.user.job}</Text>
            <Stack space={5} width="80%" mt={10}>
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
                <Box mt={5} mb={10}>
                  <Text fontSize={25} alignSelf="center">
                    {this.state.user.first_name} {this.state.user.last_name}
                  </Text>
                  <Text fontSize={15} alignSelf="center">
                    {this.state.user.email}
                  </Text>
                </Box>
                {this.state.showReport && (
                  <Button
                    width="85%"
                    colorScheme="red"
                    _text={{ color: "white" }}
                    onPress={() => this.reportUser(this.props.route.params.id)}
                  >
                    Report User
                  </Button>
                )}
              </Box>
            </Stack>
          </Center>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}
