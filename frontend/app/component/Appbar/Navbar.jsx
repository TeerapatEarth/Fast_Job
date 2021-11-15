import { NativeBaseProvider, Image } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Appbar, TouchableRipple, Badge, Box } from "react-native-paper";
import SearchPost from "../Modal/SearchPost";
import AuthService from "../../service/AuthService";
import UserService from "../../service/UserService";
const styles = StyleSheet.create({
  bottom: {
    marginTop: 20,
    justifyContent: "flex-end",
    backgroundColor: "#26c5de",
  },
});
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSearch: false,
      countNoti: 0,
      checkNoti: false,
      admin: false,
    };
    this.session();
  }
  session = async () => {
    try {
      const result = await AuthService.session();
      const arrNoti = result.data.notiNewPost;
      const noSee = arrNoti.filter((item) => item.seeByUser == false);
      const count = noSee.length;
      if (count == 0) {
        this.setState({ countNoti: count });
      } else {
        this.setState({ countNoti: count, checkNoti: true });
      }
      if(result.data.role === "Admin"){
        this.setState({admin: true})
      }
    } catch (err) {
      console.log(err);
    }
  };
  hidemodal = () => {
    this.setState({ modalSearch: false });
  };
  goToNotiPage = async (id) => {
    try {
      if (this.state.countNoti != 0) {
        await UserService.seeNotify(id);
      }
      this.setState({ countNoti: 0, checkNoti: false });
      this.props.navigation.navigate("notify");
    } catch (err) {}
  };
  render() {
    return (
      <Appbar style={styles.bottom}>
        <TouchableRipple
          onPress={() =>
            this.props.navigation.navigate("profile", {
              session: this.props.session,
              update: this.props.updateSec,
            })
          }
        >
          <Image
            size="xs"
            source={{ uri: this.props.img }}
            alt="Alternate Text"
            style={{ borderRadius: 20 }}
          />
        </TouchableRipple>
        <Appbar.Content title={this.props.user_name} color="white" />
        {this.state.admin && (
          <Appbar.Action
            icon="account"
            color="white"
            onPress={() => this.props.navigation.navigate("admin", this.props.session)}
          />
        )}
        <Appbar.Action
          icon="magnify"
          color="white"
          onPress={() => this.setState({ modalSearch: true })}
        />
        <Appbar.Action
          icon="bell"
          color="white"
          onPress={() => this.goToNotiPage(this.props.session._id)}
        />
        {this.state.checkNoti && (
          <Badge size={20} style={{ top: 10, right: 55, position: "absolute" }}>
            {this.state.countNoti}
          </Badge>
        )}
        <Appbar.Action
          icon="power"
          color="white"
          onPress={() => this.props.logout()}
        />
        <SearchPost
          show={this.state.modalSearch}
          hide={this.hidemodal}
          navigation={this.props.navigation}
        ></SearchPost>
      </Appbar>
    );
  }
}
