import React, { useState } from "react";
import {
  Button,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { Input, TextArea, Text, Divider } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Card, Title, Paragraph, Avatar } from "react-native-paper";

class CreatePostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      image: null,
      selectedJob: "Front-end Developer",
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
    };
  }
  changeTitle = (value) => {
    this.setState({ title: value });
  };
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  changeValue = (value) => {
    this.setState({ selectedJob: value });
    console.log(this.state.selectedJob)
  };
  createPost = () => {
      console.log(this.state)
    // this.props.setHide(false);
  };
  render() {
    const LeftContent = (props) => (
      <TouchableOpacity onPress={() => this.props.setHide(false)}>
        <Avatar.Icon
          style={{ backgroundColor: "rgb(20,78,99)" }}
          {...props}
          icon="arrow-left-circle"
        />
      </TouchableOpacity>
    );
    return (
      <Modal
        isVisible={true}
        onBackdropPress={() => this.props.setHide(false)}
        style={{ backgroundColor: "white"}}
      >
        <ScrollView>
          <Card>
            <Card.Title
              style={{ backgroundColor: "lightgray" }}
              title="Create Post"
              left={LeftContent}
            />
            <Card.Content style={{ marginTop: 10 }}>
              <Text>Title</Text>
              <Input
                variant="outline"
                style={{
                  width: 300,
                  height: 40,
                  marginBottom: 20,
                  marginTop: 5,
                  padding: 10,
                }}
                placeholder="Your Post's title"
                onChangeText={(text) => this.changeTitle(text)}
              />
            </Card.Content>
            <Card.Content>
              <Text>Description</Text>
              <TextInput
                placeholder={" Your Post's description"}
                multiline
                numberOfLines={4}
                maxLength={100}
                style={{
                  width: 300,
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 10,
                  borderColor: "#b2b2b2",
                  marginTop: 5,
                }}
              />
            </Card.Content>
            <Card.Content>
              {this.state.image && (
                <Image
                  source={{ uri: this.state.image }}
                  style={{ width: 250, height: 200, borderColor: "red" }}
                  resizeMode="contain"
                />
              )}
            </Card.Content>
            <Card.Content>
              <TouchableOpacity
                style={{ marginTop: 7 }}
                onPress={() => this.pickImage()}
              >
                <Avatar.Icon
                  style={{ backgroundColor: "rgb(20,78,99)" }}
                  icon="file-image"
                />
              </TouchableOpacity>
            </Card.Content>
            <Card.Content>
              <View
                style={{
                  width: 300,
                  marginTop: 20,
                  padding: 20,
                  borderWidth: 1,
                  borderRadius: 5,
                }}
              >
                <Picker
                  selectedValue={this.state.selectedJob}
                  onValueChange={(itemValue, itemIndex) =>
                    this.changeValue(itemValue)
                  }
                >
                  {this.state.typeOfJob.map((job) => (
                    <Picker.Item
                      key={job.id}
                      label={job.jobName}
                      value={job.jobName}
                    />
                  ))}
                </Picker>
              </View>
            </Card.Content>
            <Card.Content style={{marginTop: 10}}>
              <Card.Actions>
                <TouchableOpacity onPress={() => this.createPost()} style={{ marginTop: 7, backgroundColor:"rgb(20,78,99)", padding: 15, borderRadius: 40}}>
                  <Text style={{color: "white"}}>Create Post</Text>
                </TouchableOpacity>
              </Card.Actions>
            </Card.Content>
          </Card>
        </ScrollView>
      </Modal>
    );
  }
}

export default CreatePostModal;
