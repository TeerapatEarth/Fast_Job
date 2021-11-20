import React, { Component } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminPage from '../component/Admin/AdminPage';
const Stack = createNativeStackNavigator();

export default class Admin extends Component {
    render() {
        return (
            <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "rgb(20,78,99)" } }}>
                <Stack.Screen name={"Admin"} component={AdminPage}></Stack.Screen>
            </Stack.Navigator>
        )
    }
}
