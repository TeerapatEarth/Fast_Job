import React from "react";
import {
  Card,
  Title,
  Paragraph,
  Avatar,
  TouchableRipple,
} from "react-native-paper";
import { Input, TextArea, Text, Divider, Modal, Spinner } from "native-base";
import {
  Button,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import AuthService from "../../service/AuthService";
import PostService from "../../service/PostService";

class DescModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      toggle: props.hide,
      sessionUser: "",
      cancleRequest: false,
      renderItem: false,
      userOwner: false,
      renderAccept: false,
      renderhire: true,
    };
    this.session();
  }
  checkRequestPost = async () => {
    try {
      const result = await PostService.getOnePost(this.props.data._id);
      const resultCheck = result.data.requestUser.some(
        (item) => item._id === this.state.sessionUser._id
      );
      if (resultCheck) {
        this.setState({
          cancleRequest: true,
          renderhire: false,
        });
      }
      if (this.state.sessionUser._id == this.props.data.ownerId) {
        this.setState({ userOwner: true });
      }
      for (var i = 0; i < result.data.requestUser.length; i++) {
        if (
          result.data.requestUser[i]._id == this.state.sessionUser._id &&
          result.data.requestUser[i].status == true
        ) {
          this.setState({
            renderAccept: true,
            renderhire: false,
            cancleRequest: false,
          });
        }
      }
      this.setState({ renderItem: true });
      console.log(this.state);
    } catch (err) {
      console.log(err);
    }
  };
  session = async () => {
    try {
      const result = await AuthService.session();
      this.setState({ sessionUser: result.data });
      this.checkRequestPost();
    } catch (err) {
      console.log(err);
    }
  };
  addUser = async () => {
    try {
      const obj = {
        _id: this.state.sessionUser._id,
        user_name: this.state.sessionUser.user_name,
        first_name: this.state.sessionUser.first_name,
        last_name: this.state.sessionUser.last_name,
        email: this.state.sessionUser.email,
        job: this.state.sessionUser.job,
        img: this.state.sessionUser.img,
        status: false,
      };
      await PostService.addUser(obj, this.state.data._id);
      this.props.data.requestUser.push(obj);
      this.setState({ cancleRequest: true, renderhire: false });
    } catch (err) {
      console.log(err);
    }
  };
  cancleUser = async () => {
    try {
      const obj = { _id: this.state.sessionUser._id, job: this.props.data.job };
      await PostService.cancleUser(obj, this.state.data._id);
      this.setState({ cancleRequest: false, renderhire: true });
    } catch (err) {
      console.log(err);
    }
  };
  closeModal = () => {
    this.props.setHide(false);
    this.props.navigation.navigate("anotherProfile", {
      id: this.state.data.ownerId,
    });
  };
  render() {
    const LeftContent = () => (
      <TouchableRipple onPress={() => this.closeModal()}>
        <Avatar.Image size={48} source={{ uri: this.state.data.imgOwner }} />
      </TouchableRipple>
    );
    return (
      <Modal isOpen={this.state.toggle}>
        {!this.state.renderItem && (
          <Spinner accessibilityLabel="Loading posts" />
        )}
        {this.state.renderItem && (
          <Modal.Content>
            <Modal.Body>
              <Modal.Header>{this.state.data.title}</Modal.Header>
              <ScrollView>
                <Card>
                  <Card.Cover source={{ uri: this.state.data.img }} />
                  <Card.Title
                    title={
                      this.state.data.first_name +
                      " " +
                      this.state.data.last_name
                    }
                    subtitle={
                      "created : " +
                      this.state.data.createDate.slice(0, 10) +
                      " " +
                      this.state.data.createTime
                    }
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
              {this.state.data.type == "findJob" &&
                this.state.cancleRequest == false &&
                this.state.userOwner == false &&
                this.state.renderAccept == false &&
                this.state.renderhire == true && (
                  <TouchableOpacity
                    style={{
                      marginRight: 10,
                      marginBottom: 10,
                      paddingVertical: 12,
                      paddingHorizontal: 20,
                      backgroundColor: "#26c5de",
                      borderRadius: 10,
                    }}
                    onPress={() => this.addUser()}
                  >
                    <Text style={{ color: "white" }}>Hire</Text>
                  </TouchableOpacity>
                )}
              {this.state.data.type == "hire" &&
                this.state.cancleRequest == false &&
                this.state.userOwner == false &&
                this.state.renderAccept == false &&
                this.state.renderhire == true && (
                  <TouchableOpacity
                    style={{
                      marginRight: 10,
                      marginBottom: 10,
                      paddingVertical: 12,
                      paddingHorizontal: 20,
                      backgroundColor: "#26c5de",
                      borderRadius: 10,
                    }}
                    onPress={() => this.addUser()}
                  >
                    <Text style={{ color: "white" }}>Apply for work</Text>
                  </TouchableOpacity>
                )}
              {this.state.cancleRequest &&
                this.state.userOwner == false &&
                this.state.renderAccept == false &&
                this.state.renderhire == false && (
                  <TouchableOpacity
                    style={{
                      marginRight: 10,
                      marginBottom: 10,
                      paddingVertical: 12,
                      paddingHorizontal: 20,
                      backgroundColor: "red",
                      borderRadius: 10,
                    }}
                    onPress={() => this.cancleUser()}
                  >
                    <Text style={{ color: "white" }}>Cancle</Text>
                  </TouchableOpacity>
                )}
              {this.state.cancleRequest == false &&
                this.state.userOwner == false &&
                this.state.renderhire == false &&
                this.state.renderAccept == true && (
                  <TouchableOpacity
                    style={{
                      marginRight: 10,
                      marginBottom: 10,
                      paddingVertical: 12,
                      paddingHorizontal: 20,
                      backgroundColor: "green",
                      borderRadius: 10,
                    }}
                    onPress={() => {}}
                  >
                    <Text style={{ color: "white" }}>Accepted</Text>
                  </TouchableOpacity>
                )}
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
            </Modal.Footer>
          </Modal.Content>
        )}
      </Modal>
    );
  }
}

export default DescModal;
