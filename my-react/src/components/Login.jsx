import React from "react";
import swal from "sweetalert";
import { NavLink, withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
  }

  componentDidMount() {
    if (this.props.user.userName) {
      this.props.history.push("/feed");
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  submit = e => {
    e.preventDefault();
    const userName = this.state.userName;
    const password = this.state.password;
    const payload = { userName, password };
    this.props
      .getUser(payload)
      .then(this.onSubmitSuccess)
      .catch(this.onSubmitFail);
  };

  onSubmitSuccess = success => {
    this.props.history.push("/feed");
  };

  onSubmitFail = err => {
    swal("The Password does not match the UserName");
  };

  render() {
    return (
      <div className="card p-4">
        <h1 className="text-center">Login Page</h1>
        <form>
          <div className="form-group">
            <label>UserName</label>
            <input
              id="userName"
              className="form-control"
              type="string"
              value={this.state.userName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              id="password"
              className="form-control"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.submit}>Submit</button>
        </form>
        <div className="navButton">
          <NavLink to="./forgot">Forgot Your Password?</NavLink>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
