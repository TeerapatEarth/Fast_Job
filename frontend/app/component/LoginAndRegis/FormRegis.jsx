import {
  NativeBaseProvider,
  Center,
  Heading,
  Text,
  FormControl,
  Button,
  Stack,
  Input,
  ScrollView,
} from "native-base";
import React, { Component } from "react";
import { StyleSheet } from 'react-native'
export default class FormRegis extends Component {
  render() {
    return (
      <NativeBaseProvider>
        <ScrollView
          width="100%"
          _contentContainerStyle={{
            bg: "primary.900",
          }}
        >
          <Center flex={1}>
            <Heading textAlign="center" mb="3" mt="10" style={styles.font}>
              Fast Jobs
            </Heading>
            <Stack space={5} width="80%">
              <Text fontSize="xl" textAlign="center" style={styles.font}>
                Sign up
              </Text>
              <FormControl isRequired>
                <FormControl.Label _text={{color: 'white'}}>Username</FormControl.Label>
                <Input placeholder="Username" style={styles.bgInput}/>
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label _text={{color: 'white'}}>Password</FormControl.Label>
                <Input placeholder="Password" type="password" style={styles.bgInput}/>
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label _text={{color: 'white'}}>Confirm Password</FormControl.Label>
                <Input placeholder="Confirm Password" type="password" style={styles.bgInput}/>
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label _text={{color: 'white'}}>First name</FormControl.Label>
                <Input placeholder="First name" style={styles.bgInput}/>
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label _text={{color: 'white'}}>Last name</FormControl.Label>
                <Input placeholder="Last name" style={styles.bgInput}/>
              </FormControl>
              <Button width="100%" mb="1" mt="3">
                Sign up
              </Button>
              <Button width="100%" mb="10" onPress={() => this.props.login()}>
                Back
              </Button>
            </Stack>
          </Center>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}
const styles = StyleSheet.create({
    font:{
        color: 'white',
    },
    bgInput:{
        backgroundColor: 'white'
    }
})
