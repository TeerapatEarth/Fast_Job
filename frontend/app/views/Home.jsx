import { Text, ScrollView, Box } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import HeadCarousel from "../component/Carousel/HeadCarousel";
import JobCarousel from "../component/Carousel/JobCarousel";
import { Tabs, NativeBaseProvider, Center, Image } from "native-base";
import JobTabs from "../component/Tab/JobTabs";

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
});
class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      dummyData: [],
    };
  }
  render() {
    return (
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
          <JobTabs/>
        </Box>
      </ScrollView>
    );
  }
}
export default Homepage;
