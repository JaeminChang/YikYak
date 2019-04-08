import React from "react";
import swal from "sweetalert";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  submit = e => {
    const userName = this.state.userName;
    const password = this.state.password;
    const payload = { userName, password };
    e.preventDefault();
    this.props
      .insertUser(payload)
      .then(this.onSubmitSuccess)
      .catch(this.onSubmitFail);
  };

  onSubmitSuccess = success => {
    swal(
      "You have been successfully registered, redirecting to the login page"
    );
    setTimeout(this.props.history.push("/"), 3000);
  };

  onSubmitFail = err => {
    swal("That UserName has already been registered");
  };

  render() {
    return (
      <div className="card p-4">
        <h1 className="text-center">Registration Page</h1>
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
            <label>Please Do Not Use Your Real Name</label>
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
      </div>
    );
  }
}

export default Register;
