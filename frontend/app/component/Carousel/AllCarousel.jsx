import * as React from "react";
import { View, StyleSheet, Dimensions, Button } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Card, Paragraph } from "react-native-paper";

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = "auto"

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
      dummyData: props.data,
      activeIndex: 0,
      lengthData: 0,
    };
  }
  componentDidMount() {
    console.log(this.state.dummyData);
  }

  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <View style={styles.slideInnerContainer}>
        <Card>
          {item.Type == "FindJob" &&
              <Card.Cover
                source={require("../../assets/findjob.png")}
                resizeMode="cover"
                alt="job"
              />
            }
            {item.Type == "FindWorker" &&
              <Card.Cover
                source={require("../../assets/findworker.png")}
                resizeMode="cover"
                alt="job"
              />
            }
            <Card.Content>
              <Paragraph>{"Posted by:  " + item.OwnerName}</Paragraph>
              <Paragraph>{"Require:  "+item.position}</Paragraph>
            </Card.Content>
            
            
            <Card.Actions>
              <Button title="See Detail" />
            </Card.Actions>
          </Card>
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
            ref={(c) => {
              this._carousel = c;
            }}
            layout={"stack"}
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
