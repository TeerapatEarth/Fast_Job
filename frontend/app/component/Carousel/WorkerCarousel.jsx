import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Touchable,
  TouchableOpacity,
  Text,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Card, Paragraph, Avatar } from "react-native-paper";
import { borderRadius, style, width } from "styled-system";
import DescModal from "../Modal/DescModal";

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = "auto";

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
  clickBtn: {
    backgroundColor: "rgba(51,201,255, 0.5)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    elevation: 5,
    marginBottom: 5,
  },
  detailBtn: {
    backgroundColor: "rgba(51,201,255, 0.5)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    elevation: 10,
  },
  editBtn: {
    backgroundColor: "rgba(51,201,255, 0.5)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
    elevation: 10,
  },
});
class JobCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: props.data,
      activeIndex: 0,
      lengthData: 0,
      modalSwitch: false,
      toggle: false,
      itemSelected : ""
    };
  }

  hide = (value) => {
    this.setState({ modalSwitch: value });
  };
  openModal = (value) => {
    // console.log(value)
    this.setState({ modalSwitch: true, toggle: true, itemSelected: value })
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
            data={this.state.allData}
            renderItem={({ item, index }) => {
              const LeftContent = (props) => (
                <Avatar.Image size={48} source={{ uri: item.imgOwner }} />
              );
              return (
                <View style={styles.slide}>
                  <View style={styles.slideInnerContainer}>
                    <Card>
                      <Card.Cover
                        source={{ uri: item.img }}
                        resizeMode="cover"
                        alt="job"
                      />
                      <Card.Title
                        title={item.title}
                        subtitle={item.first_name + " " + item.last_name}
                        left={LeftContent}
                      />
                      <Card.Content style={{ margin: 15, paddingVertical: 15 }}>
                        <TouchableOpacity
                          style={styles.detailBtn}
                          onPress={() =>
                            this.openModal(item)
                          }
                        >
                          <Text style={{ color: "white", fontSize: 18 }}>
                            See more detail
                          </Text>
                        </TouchableOpacity>
                        {this.props.user._id == item.ownerId && (
                          <TouchableOpacity style={styles.detailBtn}
                            onPress={() => console.log(this.props.user)}
                          >
                            <Text style={{ color: "white", fontSize: 18 }}>Edit Post</Text>
                          </TouchableOpacity>
                        )}
                      </Card.Content>
                    </Card>
                  </View>
                </View>
              );
            }}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
          />
        </View>
        {this.state.modalSwitch && (
          <DescModal data={this.state.itemSelected} setHide={this.hide} hide={this.state.toggle} />
        )}
      </View>
    );
  }
}

export default JobCarousel;
