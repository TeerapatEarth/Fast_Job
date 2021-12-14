import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import User from "./User";
import Addjob from "./AddJob"
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
                <FontAwesome name="users" size={20} color={color} />
              );
            },
          }}
        ></Tab.Screen>
        <Tab.Screen
          name={"Add job"}
          component={Addjob}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <MaterialIcons name="local-post-office" size={20} color={color} />;
            },
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    );
  }
}
