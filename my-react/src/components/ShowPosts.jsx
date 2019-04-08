import React from "react";
import * as yikYakService from "../services/yikYakService";
import MapPosts from "./MapPosts";

class ShowPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      object: {
        postId: 0,
        postNumberOfLikes: 0
      }
    };
  }

  componentDidMount() {
    this.getAllPosts();
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
    //user response
  };

  upVote = (id, numberOfLikes) => {
    this.setState(
      prevState => ({
        object: {
          postId: id,
          postNumberOfLikes: numberOfLikes + 1
        }
      }),
      this.updateYik
    );
  };

  downVote = (id, numberOfLikes) => {
    this.setState(
      prevState => ({
        object: {
          postId: id,
          postNumberOfLikes: numberOfLikes - 1
        }
      }),
      this.updateYik
    );
  };

  updateYik = () => {
    const { object } = this.state;
    yikYakService
      .update(object)
      .then(this.updateSuccess)
      .catch(this.updateError);
  };

  updateSuccess = success => {
    console.log(success);
    this.getAllPosts();
  };

  push = id => {
    window.location.assign("/post?id=" + id);
  };

  render() {
    return (
      <React.Fragment>
        <MapPosts
          feed={this.props.posts}
          upVote={this.upVote}
          downVote={this.downVote}
          push={this.push}
        />
      </React.Fragment>
    );
  }
}

export default ShowPosts;
