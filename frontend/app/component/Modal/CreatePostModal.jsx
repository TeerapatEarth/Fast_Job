import React from "react";
import {
  Button,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Input, TextArea, Text, Divider, Modal } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Card, Title, Paragraph, Avatar } from "react-native-paper";
import PostService from "../../service/PostService";

class CreatePostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      user: props.user._id,
      image: null,
      description: "",
      selectedJob: "Front-end Developer",
      selectedType: "findJob",
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
  changeDes = (value) => {
    this.setState({ description: value });
  };
  pickImage = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          this.setState({ image: result.uri });
          console.log(this.state.image);
        }
      }
    }
  };
  changeValueJob = (value) => {
    this.setState({ selectedJob: value });
  };
  changeValueType = (value) => {
    this.setState({ selectedType: value });
  };
  createPost = async () => {
    try {
      const form = new FormData();
      form.append("title", this.state.title);
      form.append("type", this.state.selectedType);
      form.append("ownerId", this.state.user);
      form.append("first_name", this.props.user.first_name)
      form.append("last_name", this.props.user.last_name)
      form.append("imgOwner", this.props.user.img)
      form.append("description", this.state.description);
      form.append("job", this.state.selectedJob);

      let localUri = this.state.image;
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      form.append("myImage", { uri: localUri, name: filename, type });

      const result = await PostService.create(form);

      Alert.alert("Complete", "สร้างโพสต์เรียบร้อย", [
        {
          text: "OK",
          onPress: () => this.props.setHide(false),
        },
      ]);
    } catch (er) {
      Alert.alert("Error", "กรอกข้อมูลไม่ถูกต้อง", [{ text: "OK" }]);
      console.log(er);
    }
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
        isOpen={true}
        onBackdropPress={() => this.props.setHide(false)}
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
                value={this.state.title}
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
                onChangeText={(text) => this.changeDes(text)}
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
                    this.changeValueJob(itemValue)
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
                  selectedValue={this.state.selectedType}
                  onValueChange={(itemValue, itemIndex) =>
                    this.changeValueType(itemValue)
                  }
                >
                    <Picker.Item
                      label="Find Job"
                      value="find"
                    />
                    <Picker.Item
                      label="Find Worker"
                      value="hire"
                    />
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
