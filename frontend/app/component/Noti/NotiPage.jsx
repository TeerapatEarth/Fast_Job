import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewPost from "./Newpost";
import NewJob from "./NewJob";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
export default class Login extends Component {
  render() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name={"New Post"}
          component={NewPost}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <MaterialIcons name="local-post-office" size={20} color={color}/>;
            },
          }}
        ></Tab.Screen>
        <Tab.Screen
          name={"New Job"}
          component={NewJob}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Entypo name="briefcase" size={20} color={color}/>;
            },
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    );
  }
}
