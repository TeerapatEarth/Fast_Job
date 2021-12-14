import React from "react";
import {
  Button,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Input, TextArea, Text, Modal } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Card, Title, Paragraph, Avatar, TextInput } from "react-native-paper";
import PostService from "../../service/PostService";

const styles = StyleSheet.create({
  sectionView: {
    marginTop: 5,
  },
});

class EditPostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: props.hide,
      data: props.data,
      id: props.data._id,
      title: props.data.title,
      description: props.data.description,
      image: props.data.img,
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

  changeValueJob = (value) => {
    this.setState({ selectedJob: value });
  };
  changeTitle = (value) => {
    this.setState({ title: value });
  };
  changeDescription = (value) => {
    this.setState({ description: value });
  };
  changeValueType = (value) => {
    this.setState({ selectedType: value });
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

  editPost = async () => {
    try {
      const form = new FormData();
      form.append("title", this.state.title);
      form.append("type", this.state.selectedType);
      form.append("description", this.state.description);
      form.append("job", this.state.selectedJob);

      let localUri = this.state.image;
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      form.append("myImage", { uri: localUri, name: filename, type });
      const result = await PostService.editPost(this.state.id, form);
      console.log(result.data);
      var obj = {
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        image: result.data.image,
      };
      this.props.changeData(obj);
      this.props.setHide(false);
    } catch (err) {
      console.log(err);
    }
  };

  deletePost = async() => {
    try {
      const result = await PostService.deletePost(this.state.id)
      this.props.changeDatabyDel(this.state.id)
      this.props.setHide(false)
    }
    catch (er){
      console.log(err)
      
    }
  }
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
      <Modal isOpen={this.state.toggle}>
        <Modal.Content>
          <Modal.Body>
            <Modal.Header>Edit Post</Modal.Header>
            <ScrollView>
              <View style={styles.sectionView}>
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
                  onChangeText={(text) => this.changeTitle(text)}
                  value={this.state.title}
                />
              </View>
              <View style={styles.sectionView}>
                <Text>Description</Text>
                <TextInput
                  value={this.state.description}
                  onChangeText={(word) => this.changeDescription(word)}
                />
              </View>

              <View style={styles.sectionView}>
                {this.state.image && (
                  <Image
                    source={{ uri: this.state.image }}
                    style={{ width: 250, height: 200, borderColor: "red" }}
                    resizeMode="contain"
                  />
                )}
                <TouchableOpacity
                  style={{ marginTop: 7 }}
                  onPress={() => this.pickImage()}
                >
                  <Avatar.Icon
                    style={{ backgroundColor: "rgb(20,78,99)" }}
                    icon="file-image"
                  />
                </TouchableOpacity>
              </View>
              <Modal.Footer>
                <TouchableOpacity
                  style={{
                    marginRight: 10,
                    marginBottom: 10,
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    backgroundColor: "rgb(20,78,99)",
                    borderRadius: 10,
                  }}
                  onPress={() => this.editPost()}
                >
                  <Text style={{ color: "white" }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginRight: 10,
                    marginBottom: 10,
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    backgroundColor: "rgb(20,78,99)",
                    borderRadius: 10,
                  }}
                  onPress={() => this.props.setHide(false)}
                >
                  <Text style={{ color: "white" }}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginRight: 10,
                    marginBottom: 10,
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    backgroundColor: "rgb(255,60,60)",
                    borderRadius: 10,
                  }}
                  onPress={() => this.deletePost()}
                >
                  <Text style={{ color: "white" }}>Delete</Text>
                </TouchableOpacity>
              </Modal.Footer>
            </ScrollView>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );
  }
}

export default EditPostModal;
