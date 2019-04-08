import React from "react";
import { connect } from "react-redux";

class Logout extends React.Component {
  componentDidMount() {
    this.props.logout();
    setTimeout(this.props.history.push("/"), 4000);
  }

  render() {
    return <div>Logging out...</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: "LOGOUT_USER" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
