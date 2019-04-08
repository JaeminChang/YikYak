import React from "react";
import swal from "sweetalert";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  resetPassword = () => {
    this.setState({
      password: "",
      confirmPassword: ""
    });
  };

  submit = e => {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      swal("Your Passwords must match");
      this.resetPassword();
    } else {
      const userName = this.state.userName;
      const password = this.state.password;
      const payload = { userName, password };
      this.props
        .updatePassword(payload)
        .then(this.onSubmitSuccess)
        .catch(this.onSubmitFail);
    }
  };

  onSubmitSuccess = success => {
    this.props.history.push("/");
  };

  onSubmitFail = err => {
    swal("Your New Password Cannot Be The Same As Your Old Password");
  };

  render() {
    return (
      <div className="card p-4">
        <h1 className="text-center">Forgot Password?</h1>
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
            <label>New Password</label>
            <input
              id="password"
              className="form-control"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              id="confirmPassword"
              className="form-control"
              type="password"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.submit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
