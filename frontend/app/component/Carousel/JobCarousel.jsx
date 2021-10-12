import * as React from "react";
import {View, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {Text} from "native-base"

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
class JobCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyData: [],
      activeIndex: 0,
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
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red'}}>
                <Text fontSize='4xl'>{item.company}</Text>
            </View>
          
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <Carousel
            loop
            ref={(c) => { this._carousel = c;}}
            layout={'stack'}
            data={this.state.dummyData}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
          />
        </View>
      </View>
    );
  }
}

export default JobCarousel;
