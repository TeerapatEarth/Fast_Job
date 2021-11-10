import React, { Component } from "react";
import {
    Button,
    Modal,
    FormControl,
    Input,
  } from "native-base"

export default class SearchPost extends Component {
    closeModalAndSearch = async () => {
        this.props.hide()
        this.props.navigation.navigate("search")
    }
  render() {
    return (
      <Modal isOpen={this.props.show} onClose={() => this.props.hide()}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Search post</Modal.Header>
          <Modal.Body>
            <FormControl mt="3">
              <Input variant="underlined" placeholder="Post"/>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button onPress={() => this.closeModalAndSearch()}
              >
                Search
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  }
}
