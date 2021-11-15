import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Touchable,
  TouchableOpacity,
  Text,
  AppRegistry,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Card, Paragraph, Avatar } from "react-native-paper";
import { borderRadius, style, width } from "styled-system";
import DescModal from "../Modal/DescModal";
import EditModal from "../Modal/EditModal";
import { Picker } from "@react-native-picker/picker";

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
      editToggle: false,
      itemEditSelected: "",
      itemSelected: "",
      type: props.type,
      modalEditSwitch: false,
      checkImage: true,
      keepData: [],
      defaultData: [],
      typeOfJob: [
        {
          id: "1000",
          jobName: "All",
        },
        {
          id: "1001",
          jobName: "Front-end Developer",
        },
        {
          id: "1002",
          jobName: "Back-end Developer",
        },
        {
          id: "1003",
          jobName: "Software Tester",
        },
        {
          id: "1004",
          jobName: "Network Engineer",
        },
        {
          id: "1005",
          jobName: "Database Designer",
        },
        {
          id: "1006",
          jobName: "Online/Digital Marketing",
        },
        {
          id: "1007",
          jobName: "Content Manager/Specialist",
        },
        {
          id: "1008",
          jobName: "Software Analyst",
        },
        {
          id: "1009",
          jobName: "UX/UI designer",
        },
        {
          id: "1010",
          jobName: "Full Stack Developer",
        },
      ],
    };
  }

  hide = (value) => {
    this.setState({ modalSwitch: value });
  };
  editHide = (value) => {
    this.setState({ modalEditSwitch: value });
  };
  openModal = (value) => {
    // console.log(value)
    this.setState({ modalSwitch: true, toggle: true, itemSelected: value });
  };
  openEditModal = (value) => {
    this.setState({
      modalEditSwitch: true,
      editToggle: true,
      itemEditSelected: value,
    });
  };

  componentDidMount() {
    if (this.state.type == "all") {
      this.setState({ allData: this.props.data, keepData: this.props.data,defaultData: this.props.data });
    } else if (this.state.type == "findJob") {
      const result = this.props.data.filter((data) => data.type == "findJob");
      this.setState({ allData: result, keepData: result, defaultData: result });
    } else if (this.state.type == "hire") {
      const result = this.props.data.filter((data) => data.type == "hire");
      this.setState({ allData: result, keepData: result, defaultData: result });
    }
  }
  change = (value) => {
    var keep = this.state.allData;
    for (var item of keep) {
      if (item._id == value.id) {
        console.log(item.img);
        item.title = value.title;
        item.description = value.description;
        item.img = value.image;
      }
    }
    this.setState({ allData: keep });
  };
  changeByDel = (value) => {
    var keep = this.state.allData;
    var list = [];
    for (var item of keep) {
      if (item._id != value) {
        list.push(item);
      }
    }
    this.setState({ allData: list });
  };
  onValueChange = (value) => {
    this.setState({
      selected: value,
    });
  };
  changeValue = (value) => {
    this.setState({checkImage: false})
    if (value == "All") {
      this.setState({allData : this.state.defaultData})
    } else {
      var filter = this.state.keepData.filter((data) => data.job == value);
      console.log(filter)
      this.setState({ allData: filter, checkImage: true });
    }
  };
  render() {
    return (
      <View>
        <View style={{margin: 5, padding: 15, backgroundColor: "rgb(20,78,99)", borderRadius: 5, marginBottom: 20}}>
        <Picker
          selectedValue={this.state.selectedWorker}
          onValueChange={(itemValue, itemIndex) => this.changeValue(itemValue)}
          style={{color: "white"}}
        >
          {this.state.typeOfJob.map((job) => (
            <Picker.Item key={job.id} label={job.jobName} value={job.jobName} />
          ))}
        </Picker>
        </View>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          {this.state.allData && (
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
                        <Card.Content
                          style={{ margin: 15, paddingVertical: 15 }}
                        >
                          <TouchableOpacity
                            style={styles.detailBtn}
                            onPress={() => this.openModal(item)}
                          >
                            <Text style={{ color: "white", fontSize: 18 }}>
                              See more detail
                            </Text>
                          </TouchableOpacity>
                          {this.props.user._id == item.ownerId && (
                            <TouchableOpacity
                              style={styles.editBtn}
                              onPress={() => this.openEditModal(item)}
                            >
                              <Text style={{ color: "white", fontSize: 18 }}>
                                Edit Post
                              </Text>
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
          )}
        </View>
        {this.state.modalSwitch && (
          <DescModal
            data={this.state.itemSelected}
            setHide={this.hide}
            hide={this.state.toggle}
          />
        )}
        {this.state.modalEditSwitch && (
          <EditModal
            changeData={this.change}
            changeDatabyDel={this.changeByDel}
            data={this.state.itemEditSelected}
            setHide={this.editHide}
            hide={this.state.editToggle}
            allData={this.state.allData}
          />
        )}
      </View>
    );
  }
}

export default JobCarousel;
