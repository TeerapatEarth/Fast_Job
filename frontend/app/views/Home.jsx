import { Text, ScrollView, Box } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Alert } from "react-native";
import HeadCarousel from "../component/Carousel/HeadCarousel";
import { Tabs, NativeBaseProvider, Center, Image } from "native-base";
import JobTabs from "../component/Tab/JobTabs";
import { FAB, Portal, Appbar, Avatar } from "react-native-paper";
import AuthService from "../service/AuthService";
const styles = StyleSheet.create({
  Header: {
    backgroundColor: "rgb(20,78,99)",
  },
  TextHearder: {
    color: "white",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  fab: {
    position: "absolute",
    margin: 50,
    right: -30,
    bottom: -20,
    backgroundColor: "rgb(20,78,99)",
  },
  bottom: {
    marginTop: 20,
    justifyContent: "flex-end",
    backgroundColor: "#26c5de",
  },
});
class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionUser: "",
      activeIndex: 0,
      dummyData: [
        {
          id: "0001",
          OwnerName: "Nattawat Samsee",
          Type: "FindJob",
          position: "Front-end developer",
          Status: "Available",
          description: "ABCDEF",
        },
        {
          id: "0002",
          OwnerName: "Nattawat Samsee",
          Type: "FindWorker",
          position: "Front-end developer",
          Status: "Available",
          description: "ABCDEF",
        },
        {
          id: "0003",
          OwnerName: "Nattawat Samsee",
          Type: "FindJob",
          position: "Front-end developer",
          Status: "Available",
          description: "ABCDEF",
        },
        {
          id: "0004",
          OwnerName: "Nattawat Samsee",
          Type: "FindWorker",
          position: "Back-end developer",
          Status: "Available",
          description: "ABCDEF",
        },
        {
          id: "0005",
          OwnerName: "Nattawat Samsee",
          Type: "FindJob",
          position: "Front-end developer",
          Status: "Available",
          description: "ABCDEF",
        },
        {
          id: "0006",
          OwnerName: "Nattawat Samsee",
          Type: "FindWorker",
          position: "Front-end developer",
          Status: "Available",
          description: "ABCDEF",
        },
        {
          id: "0007",
          OwnerName: "Nattawat Samsee",
          Type: "FindJob",
          position: "Network Security",
          Status: "Available",
          description: "ABCDEF",
        },
      ],
    };
    this.session();
  }
  confirmLogout = () => {
    Alert.alert("Logout", "คุณต้องการออกจากระบบหรือไม่", [
      { text: "Logout", onPress: () => this.logout() },
      { text: "Cancle" },
    ]);
  };
  logout = async () => {
    try {
      await AuthService.logout();
      this.props.navigation.navigate("login");
    } catch (err) {
      console.log(err);
    }
  };
  session = async () => {
    try {
      const result = await AuthService.session();
      this.setState({ sessionUser: result.data });
    } catch (err) {
      Alert.alert("Error", "โปรดเข้าสู่ระบบ", [{ text: "OK" }]);
    }
  };
  render() {
    return (
      <NativeBaseProvider>
        <Appbar style={styles.bottom}>
          <Avatar.Icon size={35} icon="account" backgroundColor="black"/>
          <Appbar.Content
            title={this.state.sessionUser.user_name}
            color="white"
          />
          <Appbar.Action
            icon="bell"
            color="white"
            onPress={() => this.props.navigation.navigate("notify")}
          />
          <Appbar.Action
            icon="power"
            color="white"
            onPress={() => this.confirmLogout()}
          />
        </Appbar>
        <ScrollView>
          <Box p={5} mb={3} style={styles.Header}>
            <Image
              source={require("../assets/logover2.png")}
              resizeMode="contain"
              alt="Header"
            />
          </Box>
          <HeadCarousel />

          <Box mt={6}>
            <JobTabs data={this.state.dummyData} />
          </Box>
        </ScrollView>
        <FAB
          style={styles.fab}
          large
          icon="plus"
          onPress={() => console.log("kuy jeff")}
        />
      </NativeBaseProvider>
    );
  }
}
export default Homepage;