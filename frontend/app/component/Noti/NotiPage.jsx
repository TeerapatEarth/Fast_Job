import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewPost from "./Newpost";
import NewJob from "./NewJob";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AuthService from "../../service/AuthService";
const Tab = createBottomTabNavigator();
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionUser: {},
      arrNotiJob: []
    };
    this.getSession();
  }
  getSession = async () => {
    try {
      const result = await AuthService.session();
      this.setState({ sessionUser: result.data, arrNotiJob: result.data.notiJob });
    } catch (err) {
      console.log(err);
    }
  };
  deleteUserNoti = (index) => {
    const newArr = this.state.arrNotiJob
    newArr.splice(index, 1)
    this.setState({arrNotiJob: newArr})
  }
  render() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name={"New Post"}
          children={() => (
            <NewPost
              notipost={this.state.sessionUser.notiNewPost}
              navigation={this.props.navigation}
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
