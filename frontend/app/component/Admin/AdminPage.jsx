import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import User from "./User";
import Post from "./Post"
const Tab = createBottomTabNavigator();
export default class AdminPage extends Component {
  render() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name={"User"}
          component={User}
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
          name={"Post"}
          component={Post}
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
