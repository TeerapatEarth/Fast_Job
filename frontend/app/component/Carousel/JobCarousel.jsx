import * as React from "react";
import { Text, View, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import JobCard from "../Card/JobCard";

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
  },
  slideInnerContainer: {
    width: slideWidth,
    flex: 1,
  },
});

class JobCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      dummyData: []
    };
  }
  componentDidMount() {
    dataList = [
      {
        company: "Pepsi",
        position: "Front-end developer",
        description: "ABCDEF",
      },
      {
        company: "Coke",
        position: "Back-end developer",
        description: "12345",
      },
      {
        company: "Apple",
        position: "Network Security",
        description: "Iphone",
      },
    ];
    this.setState({ dummyData: dataList });
  }
  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <View style={styles.slideInnerContainer}>
          <JobCard data={item}/>
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
        containerStyle={{ backgroundColor: "rgba(255, 255, 255, 0.92)" }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        }}
        inactiveDotStyle={{}}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    return (
      <View>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <Carousel
            data={this.state.dummyData}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
          />
        </View>
        {this.pagination}
      </View>
    );
  }
}

export default JobCarousel;