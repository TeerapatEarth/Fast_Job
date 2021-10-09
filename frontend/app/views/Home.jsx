import {
  Text,
  ScrollView,
  Box,
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import JobCard from "../component/Card/JobCard";
import HeadCarousel from "../component/Carousel/HeadCarousel";
// import Carousel, { Pagination } from "react-native-snap-carousel";
import JobCarousel from "../component/Carousel/JobCarousel";

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;

const styles = StyleSheet.create({
  slide: {
    width: itemWidth,
    height: itemHeight,
    paddingHorizontal: horizontalMargin,
    // other styles for the item container
  },
  slideInnerContainer: {
    width: slideWidth,
    flex: 1,
    // other styles for the inner container
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

  // View of data
  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <View style={styles.slideInnerContainer}>
          <JobCard data={item} />
        </View>
      </View>
    );
  }

  get pagination() {
    const { entries, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={this.state.dummyData.length}
        activeDotIndex={this.state.activeIndex}
        containerStyle={{ backgroundColor: "rgba(255,255,255,1)" }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
        inactiveDotStyle={{}}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  render() {
    const styles = StyleSheet.create({
      Header: {
        backgroundColor: "rgba(0,0,0,0.75)",
      },
      TextHearder: {
        color: "white",
      },
    });
    return (
      <ScrollView>
        <Box p={5} mb={3} style={styles.Header}>
          <Text style={styles.TextHearder} fontSize="4xl">
            Fast Job
          </Text>
        </Box>
        <HeadCarousel />

        <Box mt={6}>
          <JobCarousel/>
        </Box>
        
      </ScrollView>
    );
  }
}
export default Homepage;
