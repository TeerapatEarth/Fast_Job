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
class HeadCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,

      carouselItems: [
        {
          title: "Item 1",
          text: "Text 1",
        },
        {
          title: "Item 2",
          text: "Text 2",
        },
        {
          title: "Item 3",
          text: "Text 3",
        },
        {
          title: "Item 4",
          text: "Text 4",
        },
        {
          title: "Item 5",
          text: "Text 5",
        },
      ],
    };
  }

  componentDidMount(){
      this._carousel.startAutoplay();
  }
  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <View style={styles.slideInnerContainer}>
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <Text fontSize='4xl'>{item.title}</Text>
            </View>
          
        </View>
      </View>
    );
  }

  get pagination() {
    return (
      <Pagination
        dotsLength={this.state.carouselItems.length}
        activeDotIndex={this.state.activeIndex}
        containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "rgba(255, 255, 255, 0.92)",
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
            ref={(c) => { this._carousel = c;}}
            data={this.state.carouselItems}
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
export default HeadCarousel;
