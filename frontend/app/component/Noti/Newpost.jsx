import React, { Component } from "react";
import {
  Text,
  NativeBaseProvider,
  FlatList,
  Box,
  HStack,
  VStack,
  Image,
  Button,
} from "native-base";
import AuthService from "../../service/AuthService";
const data = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    fullName: "Aafreen Khan",
    timeStamp: "12:47 PM",
    recentText: "Good Day!",
    avatarUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    fullName: "Sujitha Mathur",
    timeStamp: "11:11 PM",
    recentText: "Cheer there!",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    fullName: "Anci Barroco",
    timeStamp: "6:22 PM",
    recentText: "Good Day!",
    avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
  },
  {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    fullName: "Aniket Kumar",
    timeStamp: "8:56 PM",
    recentText: "All the best",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
  },
  {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    fullName: "Kiara",
    timeStamp: "12:47 PM",
    recentText: "I will call today.",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
  },
];
export default class Newpost extends Component {
  constructor(props){
    super(props);
    this.state = {
      sessionUser: ""
    }
    this.getSession()
  }
  getSession = async () => {
    try{
      const result = await AuthService.session();
      this.setState({ sessionUser: result.data });
      console.log(this.state.sessionUser)
    } catch (err){
      console.log(err)
    }
  }
  render() {
    return (
      <NativeBaseProvider>
        <FlatList
        style={{borderBottomColor: "red"}}
          data={this.state.sessionUser.notiNewPost}
          renderItem={({ item }) => (
            <Box
              height={100}
              mb={1}
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2"
            >
              <HStack space={2}>
                <Image
                  size="md"
                  source={{
                    uri: item.img,
                  }}
                  alt="Alternate Text"
                  style={{borderRadius: 10}}
                />
                <VStack style={{ width: 200, }}>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                    numberOfLines={1}
                  >
                    {item.first_name} {item.last_name}
                  </Text>
                  
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {item.job}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    numberOfLines={2}
                    mt={1}
                  >
                    {item.description}aksldklaksd;askdlaks;dkalksd;ka;skdlaskd;mamksdmkamdklmaskmaskd;l
                  </Text>
                </VStack>
                <VStack justifyContent="space-between" style={{ width: "23%"}}>
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    alignSelf="center"
                  >
                    xxxxxxx
                  </Text>
                  <Button size="sm" alignSelf="center">Detail</Button>
                </VStack>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item._id}
        />
      </NativeBaseProvider>
    );
  }
}
