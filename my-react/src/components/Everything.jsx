import React from "react";
import CreatePost from "./CreatePost";
import ShowPosts from "./ShowPosts";
import * as yikYakService from "../services/yikYakService";
import UserUploads from "./fileUpload/UserUploads";

class Everything extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      insertPost: {
        title: "",
        content: ""
      },
      posts: [],
      object: {
        postId: 0,
        postNumberOfLikes: 0
      }
    };
  }

  componentDidMount() {
    if (!this.props.user.userName) {
      this.props.history.push("/");
    } else {
      this.getAllPosts();
    }
  }

  getAllPosts = () => {
    yikYakService
      .selectAll()
      .then(this.getAllSuccess)
      .catch(this.getAllError);
  };

  getAllSuccess = success => {
    this.setState({
      posts: success
    });
  };

  getAllError = err => {
    console.log(err);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2 mb-5">
            {!this.props.user.image ? (
              <UserUploads user={this.props.user} />
            ) : (
              <div />
            )}
            {!this.props.user.image ? (
              <label className="text-centered offset-md-4">
                Do not upload an image of yourself
              </label>
            ) : (
              ""
            )}
            <CreatePost getAllPosts={this.getAllPosts} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <ShowPosts posts={this.state.posts} />
          </div>
        </div>
      </div>
    );
  }
}

export default Everything;
