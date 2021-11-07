import { Box, Tabs, View } from "native-base";
import React, { Component } from "react";
import JobCarousel from "../Carousel/JobCarousel";
import AllCarousel from "../Carousel/AllCarousel";
import WorkerCarousel from "../Carousel/WorkerCarousel";
import { Button, Provider } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import PostService from "../../service/PostService";

class JobTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      jobData: [],
      workerData: [],
      checkData: false,
      checkJob: false,
      user: props.user,
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
    this.getAllPost();
  }

  getAllPost = async () => {
    try{
      const result = await PostService.getAllPost();
      const resultJob =  result.data.filter((data) => data.type == "findJob")
      console.log(resultJob)
      const resultWorker =  result.data.filter((data) => data.type == "hire")
      this.setState({allData: result.data, jobData: resultJob, workerData: resultWorker, checkData: true})
    }
    catch(err){
      console.log(err)
    }
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
              {this.state.checkData && (
                <AllCarousel user={this.props.user} data={this.state.allData} />
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
              {this.state.checkData && (
                <JobCarousel user={this.props.user} data={this.state.jobData} />
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
              <WorkerCarousel user={this.props.user} data={this.state.workerData} />
            </Tabs.View>
          </Tabs.Views>
        </Tabs>
      </Box>
    );
  }
}
export default JobTabs;
