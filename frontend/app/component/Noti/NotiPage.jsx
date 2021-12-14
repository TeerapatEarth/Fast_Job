import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewPost from "./Newpost";
import NewJob from "./NewJob";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AuthService from "../../service/AuthService";
import { TouchableHighlightBase } from "react-native";
const Tab = createBottomTabNavigator();
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrNotiJob: [],
      arrNotiPost: [],
      id: ""
    };
    this.getSession();
  }
  getSession = async () => {
    try {
      const result = await AuthService.session();
      this.setState({
        arrNotiJob: result.data.notiJob,
        arrNotiPost: result.data.notiNewPost,
        id: result.data._id
      });
    } catch (err) {
      console.log(err);
    }
  };
  deleteUserNoti = (index) => {
    const newArr = this.state.arrNotiJob;
    newArr.splice(index, 1);
    this.setState({ arrNotiJob: newArr });
  };
  deletePostNoti = (index) => {
    const newArr = this.state.arrNotiPost;
    newArr.splice(index, 1)
    this.setState({ arrNotiPost: newArr})
  };
  render() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name={"New Post"}
          children={() => (
            <NewPost
              notipost={this.state.arrNotiPost}
              navigation={this.props.navigation}
              deletePost={this.deletePostNoti}
              id={this.state.id}
            />
          )}
          options={{
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialIcons
                  name="local-post-office"
                  size={20}
                  color={color}
                />
              );
            },
          }}
        ></Tab.Screen>
        <Tab.Screen
          name={"New Job"}
          children={() => (
            <NewJob
              notijob={this.state.arrNotiJob}
              navigation={this.props.navigation}
              deleteUser={this.deleteUserNoti}
              id={this.state.id}
            />
          )}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Entypo name="briefcase" size={20} color={color} />;
            },
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    );
  }
}
