import React, { Component } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminPage from '../component/Admin/AdminPage';
const Stack = createNativeStackNavigator();

export default class Admin extends Component {
    render() {
        return (
            <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "#26c5de" } }}>
                <Stack.Screen name={"Admin"} component={AdminPage}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}
