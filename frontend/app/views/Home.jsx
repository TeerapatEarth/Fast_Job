import { Text, ScrollView, Box } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import HeadCarousel from "../component/Carousel/HeadCarousel";
import { Tabs, NativeBaseProvider, Center, Image } from "native-base";
import JobTabs from "../component/Tab/JobTabs";
import { FAB, Portal } from "react-native-paper";

const styles = StyleSheet.create({
  Header: {
    backgroundColor: "rgb(20,78,99)",
  },
  TextHearder: {
    color: "white",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb(20,78,99)"
  },
});
class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      dummyData: [
        {
          id: "0001",
          OwnerName: "Nattawat Samsee",
          Type: "FindJob",
          position: "Front-end developer",
          Status: "Available",
          description: "ABCDEF",
        },
        {
          id: "0002",
          OwnerName: "Nattawat Samsee",
          Type: "FindWorker",
          position: "Front-end developer",
          Status: "Available",
          description: "ABCDEF",
        },
        {
          id: "0003",
          OwnerName: "Nattawat Samsee",
          Type: "FindJob",
          position: "Front-end developer",
          Status: "Available",
          description: "ABCDEF",
        },
        {
          id: "0004",
          OwnerName: "Nattawat Samsee",
          Type: "FindWorker",
          position: "Back-end developer",
          Status: "Available",
          description: "ABCDEF",
        },
        {
          id: "0005",
          OwnerName: "Nattawat Samsee",
          Type: "FindJob",
          position: "Front-end developer",
          Status: "Available",
          description: "ABCDEF",
        },
        {
          id: "0006",
          OwnerName: "Nattawat Samsee",
          Type: "FindWorker",
          position: "Front-end developer",
          Status: "Available",
          description: "ABCDEF",
        },
        {
          id: "0007",
          OwnerName: "Nattawat Samsee",
          Type: "FindJob",
          position: "Network Security",
          Status: "Available",
          description: "ABCDEF",
        },
      ],
    };
  }
  render() {
    return (
      <View>
        <ScrollView>
          <Box p={5} mb={3} style={styles.Header}>
            <Image
              source={require("../assets/logover2.png")}
              resizeMode="contain"
              alt="Header"
            />
          </Box>
          <HeadCarousel />

          <Box mt={6}>
            <JobTabs data={this.state.dummyData} />
          </Box>
        </ScrollView>
        <FAB
          style={styles.fab}
          large
          icon="plus"
          onPress={() => console.log("kuy jeff")}
        />
      </View>
    );
  }
}
export default Homepage;
