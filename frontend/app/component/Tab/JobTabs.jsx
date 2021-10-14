import { Box, Tabs, View } from "native-base";
import React, { Component } from "react";
import JobCarousel from "../Carousel/JobCarousel";
import AllCarousel from "../Carousel/AllCarousel";
import WorkerCarousel from "../Carousel/WorkerCarousel";
import { Button, Provider } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

class JobTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyData: props.data,
      allData: [],
      jobData: [
        {
          id: "0007",
          OwnerName: "Nattawat Samsee",
          Type: "FindJob",
          position: "Network Security",
          Status: "Available",
          description: "ABCDEF",
        },
      ],
      workerData: [
        {
          id: "0006",
          OwnerName: "Nattawat Samsee",
          Type: "FindWorker",
          position: "Front-end developer",
          Status: "Available",
          description: "ABCDEF",
        },
      ],
      typeOfJob: [
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
      selectedAll: "All",
      selectedJob: "All",
      selectedWorker: "All",
    };
  }
  changeValue = (value, type) => {
    if (type === "All"){
      this.filterValueAll(value)
      this.setState({ selectedAll: value });
    }
    else if (type === "Job"){
      this.filterValueJob(value)
      this.setState({ selectedJob: value })
    }
    else if (type === "Worker"){
      this.filterValueWorker(value)
      this.setState({ selectedWorker: value})
    }
  };

  // Query from database
  filterValueAll = (value) => {
    console.log(value + " All");
  }
  filterValueJob = (value) => {
    console.log(value + " Job");
  }
  filterValueWorker = (value) => {
    console.log(value + " Worker");
  }

  componentDidMount() {
    console.log(this.state.workerData);
  }
  onValueChange = (value) => {
    this.setState({
      selected: value,
    });
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
              <Provider>
                <View
                  style={{
                    margin: 15,
                    padding: 15,
                    borderRadius: 10,
                    backgroundColor: "rgba(51,201,255, 0.2)",
                  }}
                >
                  <Picker
                    selectedValue={this.state.selectedAll}
                    onValueChange={(itemValue, itemIndex) =>
                      this.changeValue(itemValue, "All")
                    }
                  >
                    <Picker.Item label="All" value="All" />
                    {this.state.typeOfJob.map((job) => (
                      <Picker.Item
                        key={job.id}
                        label={job.jobName}
                        value={job.jobName}
                      />
                    ))}
                  </Picker>
                </View>
              </Provider>
              <AllCarousel data={this.state.dummyData} />
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
                  <Picker
                    selectedValue={this.state.selectedJob}
                    onValueChange={(itemValue, itemIndex) =>
                      this.changeValue(itemValue, "Job")
                    }
                  >
                    <Picker.Item label="All" value="All" />
                    {this.state.typeOfJob.map((job) => (
                      <Picker.Item
                        key={job.id}
                        label={job.jobName}
                        value={job.jobName}
                      />
                    ))}
                  </Picker>
                </View>
              </Provider>
              <JobCarousel data={this.state.jobData} />
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
                  <Picker
                    selectedValue={this.state.selectedWorker}
                    onValueChange={(itemValue, itemIndex) =>
                      this.changeValue(itemValue, "Worker")
                    }
                  >
                    <Picker.Item label="All" value="All" />
                    {this.state.typeOfJob.map((job) => (
                      <Picker.Item
                        key={job.id}
                        label={job.jobName}
                        value={job.jobName}
                      />
                    ))}
                  </Picker>
                </View>
              </Provider>
              <WorkerCarousel data={this.state.workerData} />
            </Tabs.View>
          </Tabs.Views>
        </Tabs>
      </Box>
    );
  }
}
export default JobTabs;
