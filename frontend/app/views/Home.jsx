import { Text, ScrollView, Box } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Dimensions, View, Alert } from "react-native";
import HeadCarousel from "../component/Carousel/HeadCarousel";
import { Tabs, NativeBaseProvider, Center, Image } from "native-base";
import JobTabs from "../component/Tab/JobTabs";
import { FAB } from "react-native-paper";
import AuthService from "../service/AuthService";
import CreatePostModal from "../component/Modal/CreatePostModal";
import Navbar from "../component/Appbar/Navbar";

const styles = StyleSheet.create({
  Header: {
    backgroundColor: "rgb(50,191,241)",
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
      modalSwitch: false,
      value: 0,
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
      if (result.data.ban) {
        Alert.alert("เข้าสู่ระบบล้มเหลว", "บัญชีของคุณถูกระงับกรุณาติดต่อผู้ดูแลระบบ", [
          { text: "OK", onPress: () => this.logout() },
        ]);
      }
    } catch (err) {
      Alert.alert("Error", "โปรดเข้าสู่ระบบ", [{ text: "OK" }]);
    }
  };
  hide = (value) => {
    this.setState({ modalSwitch: value });
  };
  change = () => {
    this.child.setState({ checkData: false });
    this.child.getAllPost();
  };
  updateNav = (img, user_name) => {
    const newItem = this.state.sessionUser
    newItem.img = img,
    newItem.user_name = user_name
    this.setState({sessionUser: newItem})
  }
  render() {
    return (
      <NativeBaseProvider>
        <Navbar
          logout={this.confirmLogout}
          navigation={this.props.navigation}
          session={this.state.sessionUser}
          update={this.updateNav}
        ></Navbar>
        <ScrollView>
          <Box p={2} mb={3} style={styles.Header}>
            <Image
              source={require("../assets/Logo3.png")}
              resizeMode="contain"
              alt="Header"
            />
          </Box>
          <HeadCarousel />

          <Box mt={6}>
            <JobTabs
              user={this.state.sessionUser}
              change={this.state.value}
              onRef={(ref) => (this.child = ref)}
              navigation={this.props.navigation}
            />
          </Box>
        </ScrollView>
        <FAB
          style={styles.fab}
          large
          icon="plus"
          onPress={() => this.setState({ modalSwitch: true })}
        />
        {this.state.modalSwitch && (
          <CreatePostModal
            user={this.state.sessionUser}
            setHide={this.hide}
            reRenderPost={this.change}
          />
        )}
      </NativeBaseProvider>
    );
  }
}
export default Homepage;
