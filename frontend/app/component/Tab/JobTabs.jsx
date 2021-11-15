import { Box, Tabs, View } from "native-base";
import React, { Component } from "react";
import AllCarousel from "../Carousel/AllCarousel";
import { Button, Provider } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import PostService from "../../service/PostService";
import { Text } from "react-native"

class JobTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      checkData: false,
      checkJob: false,
      checkWorkder: false,
      user: props.user,
      checkUpdate: 0,
      keepData: [],
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
      allLength: 0,
      jobLength: 0,
      workLength: 0,
    };
  }

  componentDidMount(){
    this.getAllPost();
    this.props.onRef(this)
  }
  componentWillUnmount(){
    this.props.onRef(null);
  }

  getAllPost = async () => {
    try {
      const result = await PostService.getAllPost();
      this.setState({
        allData: result.data,
        keepData: result.data,
        checkData: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Box>
        <Tabs align="center">
          <Tabs.Bar>
            <Tabs.Tab>All</Tabs.Tab>
            <Tabs.Tab>Find Job</Tabs.Tab>
            <Tabs.Tab>Find Worker</Tabs.Tab>
          </Tabs.Bar>
          <Tabs.Views>
            <Tabs.View>
              {this.state.checkData && (
                <AllCarousel
                  user={this.props.user}
                  data={this.state.allData}
                  type="all"
                />
              )}
            </Tabs.View>
            <Tabs.View>
              {this.state.checkData && (
                <View>
                  <AllCarousel
                    user={this.props.user}
                    data={this.state.allData}
                    type="findJob"
                  />
                </View>
              )}
            </Tabs.View>
            <Tabs.View>
              <Provider>
                <View
                  style={{
                    margin: 15,
                    padding: 15,
                    borderRadius: 10,
                    backgroundColor: "rgba(51,201,255, 0.2)",
                  }}
                >
                
                </View>
              </Provider>
              {this.state.checkData && (
                <View>
                  <Text> </Text>
                  <AllCarousel
                    user={this.props.user}
                    data={this.state.allData}
                    type="hire"
                  />
                </View>
              )}
            </Tabs.View>
          </Tabs.Views>
        </Tabs>
      </Box>
    );
  }
}
export default JobTabs;
