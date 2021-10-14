import * as React from "react";
import { View, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import Carousel, {
  Pagination,
  ParallaxImage,
} from "react-native-snap-carousel";
import { Text, Image } from "native-base";
import { style } from "styled-system";

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin;
const itemHeight = 200;
const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  slide: {
    width: itemWidth,
    height: itemHeight,
    paddingHorizontal: horizontalMargin,
    marginBottom: 15
    // other styles for the item container
  },
  slideInnerContainer: {
    width: slideWidth,
    flex: 1,
    // other styles for the inner container
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
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
          text: "ง่าย",
          image: {
            uri: "../../assets/pane1.png",
          },
          number: 1,
        },
        {
          title: "Item 2",
          text: "สะดวก",
          image: {
            uri: "../../assets/pane2.png",
          },
          number: 2,
        },
        {
          title: "Item 3",
          text: "ตอบโจทย์",
          image: {
            uri: "../../assets/pane2.png",
          },
          number: 3,
        },
      ],
    };
  }

  componentDidMount() {
    this._carousel.startAutoplay();
  }
  _renderItem({ item, index }, parallaxProps) {
    return (
      <View style={styles.slide}>
        <View style={styles.slideInnerContainer}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              {item.number == 1 && (
                <View>
                  <Image
                    source={require("../../assets/pane1.png")}
                    resizeMode="contain"
                    alt="1"
                  />
                </View>
              )}
              {item.number == 2 && (
                <View>
                  <Image
                    source={require("../../assets/pane2.png")}
                    resizeMode="contain"
                    alt="2"
                  />
                </View>
              )}
              {item.number == 3 && (
                <View>
                  <Image
                    source={require("../../assets/pane3.png")}
                    resizeMode="contain"
                    alt="3"
                  />
                </View>
              )}
            </View>
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
        containerStyle={{ backgroundColor: "rgba(20,78,99,1)" }}
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
            loop
            ref={(c) => {
              this._carousel = c;
            }}
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
