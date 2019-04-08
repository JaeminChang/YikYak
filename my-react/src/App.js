import React, { Component } from "react";
import { Route } from "react-router-dom";
import ShowOnePost from "./components/ShowOnePost";
import Everything from "./components/Everything";
import Register from "./components/Register";
import * as userActions from "./actions/userActions";
import { connect } from "react-redux";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Logout from "./components/Logout";
import ResetPassword from "./components/ResetPassword";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="help">
        <NavBar
          render={props => <NavBar {...props} user={this.props.user} />}
        />
        <Route
          path="/feed"
          exact
          render={props => <Everything {...props} user={this.props.user} />}
        />
        <Route
          path="/post"
          exact={false}
          render={props => <ShowOnePost {...props} />}
        />
        <Route path="/logout" exact render={props => <Logout {...props} />} />
        <Route
          path="/register"
          exact
          render={props => (
            <Register {...props} insertUser={this.props.insertUser} />
          )}
        />
        <Route
          path="/"
          exact
          render={props => (
            <Login
              {...props}
              getUser={this.props.getUser}
              user={this.props.user}
            />
          )}
        />
        <Route
          path="/forgot"
          exact
          render={props => (
            <ResetPassword
              {...props}
              updatePassword={this.props.updatePassword}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: {
      userName: state.user.userName,
      image: state.user.image
    }
  };
};

export default connect(
  mapStateToProps,
  userActions
)(App);
