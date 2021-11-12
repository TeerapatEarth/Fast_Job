import React, { Component } from "react";
import { Button, Modal, FormControl, Input } from "native-base";

export default class SearchPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
    };
  }
  closeModalAndSearch = async () => {
    this.props.hide();
    this.setState({searchWord: ""})
    this.props.navigation.navigate("search", {word: this.state.searchWord});
  };
  render() {
    return (
      <Modal isOpen={this.props.show} onClose={() => this.props.hide()}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Search post</Modal.Header>
          <Modal.Body>
            <FormControl mt="3">
              <Input
                variant="underlined"
                placeholder="Post"
                value={this.state.searchWord}
                onChangeText={(text) => this.setState({ searchWord: text })}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button onPress={() => this.closeModalAndSearch()}>Search</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  }
}
