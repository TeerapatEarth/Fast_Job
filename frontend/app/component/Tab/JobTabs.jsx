import { Tabs, NativeBaseProvider, Center, Image } from "native-base";
import { Text, ScrollView, Box } from "native-base";
import React, { Component } from "react";
import JobCarousel from "../Carousel/JobCarousel";

class JobTabs extends React.Component {
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
              <JobCarousel />
            </Tabs.View>
            <Tabs.View>
              <Text>Test</Text>
            </Tabs.View>
            <Tabs.View>
              <Text>Test2</Text>
            </Tabs.View>
          </Tabs.Views>
        </Tabs>
      </Box>
    );
  }
}
export default JobTabs;

