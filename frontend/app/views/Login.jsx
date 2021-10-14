import React, { Component } from "react";
import { NativeBaseProvider, PresenceTransition } from "native-base";
import FormLogin from "../component/LoginAndRegis/FormLogin";
import FormRegis from "../component/LoginAndRegis/FormRegis";
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginPage: true,
      regisPage: false,
    };
  }
  goToRegisForm = () => {
    this.setState({ loginPage: false, regisPage: true });
  };
  goToLoginForm = () => {
    this.setState({ loginPage: true, regisPage: false });
  };
  render() {
    return (
      <NativeBaseProvider>
        {this.state.loginPage && (
          <FormLogin regis={this.goToRegisForm} show={this.state.loginPage} />
        )}
        {!this.state.loginPage && <FormRegis login={this.goToLoginForm} />}
      </NativeBaseProvider>
    );
  }
}
