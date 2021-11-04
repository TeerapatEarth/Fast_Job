import {
  NativeBaseProvider,
  ScrollView,
  Center,
  Heading,
  Stack,
  Box,
  Button,
  Image,
  Text,
  HStack,
  VStack,
} from "native-base";
import { Appbar } from "react-native-paper";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  bottom: {
    backgroundColor: "#26c5de",
    height: 80,
  },
  arrow: {
    marginTop: 55,
    marginBottom: 30,
  },
});
export default class AnotherProfile extends Component {
  render() {
    return (
      <NativeBaseProvider>
        <Appbar style={styles.bottom}>
          <Appbar.BackAction
            onPress={() => this.props.navigation.goBack()}
            style={styles.arrow}
          />
          <Appbar.Content title="Another Profile" style={styles.arrow} />
        </Appbar>
        <ScrollView width="100%" mt={5}>
          <Center flex={1}>
            <Heading textAlign="center" mb="3" mt="5">
              Another Profile
            </Heading>
            <Text fontSize={20}>Back-end Developer</Text>
            <Stack space={5} width="80%" mt={10}>
              <Box style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: "https://i.imgur.com/ZydjgsF.jpeg" }}
                  style={{
                    width: 200,
                    height: 200,
                    alignContent: "center",
                    borderRadius: 1000,
                  }}
                  alt="text"
                />
                <Box mt={5} mt={10} mb={10}>
                  <Text fontSize={25}>Teerapat Boonchuaylaew</Text>
                  <Box alignItems="flex-end">
                    <Text fontSize={15}>frontend@email.com</Text>
                  </Box>
                </Box>
                <Button
                  width="85%"
                  colorScheme="red"
                  _text={{ color: "white" }}
                >
                  Report User
                </Button>
              </Box>
            </Stack>
          </Center>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}
