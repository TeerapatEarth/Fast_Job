import React from "react";
import { Card, Title, Paragraph, Avatar } from "react-native-paper";
import { Input, TextArea, Text, Divider, Modal } from "native-base";
import {
  Button,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

class DescModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      toggle: props.hide,
    };
  }
  componentDidMount() {
    console.log(this.state.data);
  }

  render() {
    const LeftContent = () => (
      <Avatar.Image size={48} source={{ uri: this.state.data.imgOwner }} />
    );
    return (
      <Modal isOpen={this.state.toggle}>
        <Modal.Content>
          <Modal.Body >
            <Modal.Header>{this.state.data.title}</Modal.Header>
            <ScrollView>
              <Card>
                <Card.Cover source={{ uri: this.state.data.img }} />
                <Card.Title
                  title={this.state.data.first_name + " " + this.state.data.last_name}
                  subtitle={"created : " + this.state.data.createDate.slice(0,10) + " " +this.state.data.createTime}
                  left={LeftContent}
                />
                <Card.Content style={{ marginTop: 10 }}>
                  <Paragraph>{this.state.data.description}</Paragraph>
                  {this.state.data.type == "findJob" && (
                    <Paragraph>Want to find Job</Paragraph>
                  )}
                  {this.state.data.type != "findJob" && (
                    <Paragraph>Want to hire worker</Paragraph>
                  )}
                  <Paragraph>Job Type: {this.state.data.job}</Paragraph>
                </Card.Content>
              </Card>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <TouchableOpacity style={{marginRight: 10, marginBottom:10, paddingVertical: 12, paddingHorizontal: 20,backgroundColor:"rgb(20,78,99)", borderRadius: 10 }} onPress={() => this.props.setHide(false)}><Text style={{color: "white"}}>Back</Text></TouchableOpacity>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  }
}

export default DescModal;
