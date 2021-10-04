import {
  NativeBaseProvider,
  Stack,
  Text,
  Input,
  Button,
  Center,
  Heading,
  FormControl,
  ScrollView
} from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
export default class FormLogin extends Component {
  render() {
    return (
      <NativeBaseProvider>
        <ScrollView
          width="100%"
          _contentContainerStyle={{
            bg: "primary.900",
            height: "100%"
          }}
        >
          <Center flex={1}>
            <Heading textAlign="center" mb="3" style={styles.font}>
              Fast Jobs
            </Heading>
            <Stack space={5} width="80%">
              <Text fontSize="xl" textAlign="center" style={styles.font}>
                Login
              </Text>
              <FormControl>
                <FormControl.Label _text={{ color: "white" }}>
                  Username
                </FormControl.Label>
                <Input placeholder="Username" style={styles.bgInput} />
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ color: "white" }}>
                  Password
                </FormControl.Label>
                <Input
                  placeholder="Password"
                  type="password"
                  style={styles.bgInput}
                />
              </FormControl>
              <Button width="100%" mt="3">Login</Button>
              <Button width="100%" onPress={() => this.props.regis()}>
                Sign up
              </Button>
            </Stack>
          </Center>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

const styles = StyleSheet.create({
  font: {
    color: "white",
  },
  bgInput: {
    backgroundColor: "white",
  },
});
