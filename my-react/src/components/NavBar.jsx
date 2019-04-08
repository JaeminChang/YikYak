import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("i am from navbar", this.props);
  }

  goHome = e => {
    window.location.assign("/feed");
  };

  render() {
    return (
      <header>
        <div className="nav">
          {!this.props.user.userName ? (
            <div>
              <div className="navButton">
                <NavLink to="./register">
                  Not a user yet? Register here!
                </NavLink>
              </div>
              <div className="navButton">
                <NavLink to="./">Already a user? Login here!</NavLink>
              </div>
            </div>
          ) : (
            <div>
              <div className="navButton">
                <NavLink to="./feed">
                  <button onClick={this.goHome}>
                    <i className="fas fa-igloo" />
                  </button>
                </NavLink>
              </div>
              <div className="card yolo">
                <span className="user-img">
                  <img
                    src={
                      this.props.user.image
                        ? `https://sabio-s3.s3.us-west-2.amazonaws.com/` +
                          this.props.user.image
                        : "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                    }
                    className="rounded-circle"
                    alt="User"
                    style={{ width: "150px", height: "100px" }}
                  />
                </span>
                Hello! {this.props.user.userName}
              </div>
              <div className="navButton">
                <NavLink to="./logout">Logout!</NavLink>
              </div>
            </div>
          )}
        </div>
      </header>
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

export default connect(mapStateToProps)(NavBar);
