import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Sign from "../components/Sign.jsx";
import Redirect from "../components/Redirect.jsx";
import NoteComponent from "../components/NoteComponent.jsx";

import { createUser, verifyUser } from "../modules/App";

const mapActionCreators = {
  createUser,
  verifyUser
};

const mapStateToProps = state => ({
  label: state.app.toJS().label,
  loggedIn: state.app.toJS().loggedIn
});

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // if (this.props.loggedIn) return this.props.router.push("note");
    const labels = [];
    this.props.label.map((element, index) => {
      labels.push(
        <Sign
          label={element}
          createUser={this.props.createUser}
          verifyUser={this.props.verifyUser}
          history={this.props.history}
        />
      );
    });
    return (
      <div id="login-page">
      <Redirect />
        <img
          class="background-image"
          src="http://fondosmovil.net/images/img8/fondos-de-navidad-de-hello-kitty-para-fondo-de-pantalla-en-hd-1.gif"
        />
        {labels}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapActionCreators)(Login));
