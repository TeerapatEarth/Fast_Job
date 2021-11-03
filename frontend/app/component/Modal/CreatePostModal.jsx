import React, { Component } from "react";
import { NativeBaseProvider, Modal, FormControl, Button, Input } from "native-base";

export default class CreatePostModal extends Component {
  render() {
    return (
      <Modal isOpen={this.props.show}>
        <Modal.Content maxWidth="400px">
          <Modal.Header>Reset Password</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Enter your password</FormControl.Label>
              <Input
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => this.props.hide()}
              >
                Cancel
              </Button>
              <Button >Ok</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  }
}
