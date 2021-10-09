import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  NativeBaseProvider,
} from "react-native-paper";

import { Box } from "native-base";
import Carousel from 'react-native-snap-carousel';
import { SafeAreaView, View, Text } from "react-native";

class JobCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: props.data
        }
    }
  render() {
    return (
      <Box>
        <Card>
            
          <Card.Title
            title={this.state.data.company}
            subtitle={this.state.data.position}
          />
          <Card.Content>
            <Title>Card title</Title>
            <Paragraph>Card content</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
      </Box>
    );
  }
}

export default JobCard;
