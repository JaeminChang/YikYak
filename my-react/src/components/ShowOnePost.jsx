import React from "react";
import * as yikService from "../services/yikYakService";
import MapComments from "./MapComments";

class ShowOnePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      postId: 0,
      content: "",
      comments: [],
      update: {
        postId: 0,
        postNumberOfLikes: 0
      }
    };
  }

  componentDidMount() {
    this.getPost();
  }

  getPost = () => {
    if (window.location.search) {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let query = params.get("id");
      this.setState(
        {
          postId: query
        },
        this.getYikPost
      );
    }
  };

  getYikPost = () => {
    yikService
      .selectById(this.state.postId)
      .then(this.getSuccess)
      .catch(this.getError);
  };

  getSuccess = success => {
    console.log(success);
    this.setState({
      post: success[0]
    });
    this.getComments();
  };

  getComments = () => {
    yikService
      .selectByPostId(this.state.postId)
      .then(this.getCommentsSuccess)
      .catch(this.getCommentsError);
  };

  getCommentsSuccess = success => {
    this.setState({
      comments: success
    });
  };

  getError = error => {
    console.log(error);
  };

  upVote = (id, numberOfLikes) => {
    this.setState(
      prevState => ({
        update: {
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
        update: {
          postId: id,
          postNumberOfLikes: numberOfLikes - 1
        }
      }),
      this.updateYik
    );
  };

  updateYik = () => {
    const { update } = this.state;
    yikService
      .update(update)
      .then(this.updateSuccess)
      .catch(this.updateError);
  };

  updateSuccess = success => {
    this.getPost();
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  submitPost = e => {
    e.preventDefault();
    this.insertComment();
  };

  insertComment = () => {
    const comment = {
      id: this.state.postId,
      content: this.state.content
    };
    yikService
      .insertComment(comment)
      .then(this.commentSuccess)
      .catch(this.commentError);
  };

  commentSuccess = success => {
    this.setState(
      {
        content: ""
      },
      this.getComments
    );
  };

  commentError = err => {
    console.log(err);
  };

  deleteComment = id => {
    yikService
      .deleteComment(id)
      .then(this.deleteSuccess)
      .catch(this.deleteError);
  };

  getDate = date => {
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return month + "-" + dt + "-" + year;
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1 mb-5">
            <div className="card mb-1">
              <h4 className="card-title yolo text-center pt-1 pb-2">
                {this.state.post.Title}
              </h4>
              <div className="row">
                <div className="col-md-2 ml-2 mt-2 mb-2">
                  <div className="btn-group-vertical">
                    <button
                      className="btn btn-outline-dark"
                      onClick={() =>
                        this.upVote(
                          this.state.post.Id,
                          this.state.post.NumberOfLikes
                        )
                      }
                    >
                      <i className="fas fa-chevron-up" />
                    </button>
                    <span className="btn btn-outline-dark">
                      {this.state.post.NumberOfLikes}
                    </span>
                    <button
                      className="btn btn-outline-dark"
                      onClick={() =>
                        this.downVote(
                          this.state.post.Id,
                          this.state.post.NumberOfLikes
                        )
                      }
                    >
                      <i className="fas fa-chevron-down" />
                    </button>
                  </div>
                </div>
                <div className="col-md-8">
                  <h4>{this.state.post.Content}</h4>
                </div>
              </div>
              <div className="card-title yolo text-center pt-1 pb-2">
                Comments
              </div>
              <MapComments
                deleteComment={this.deleteComment}
                feed={this.state.comments}
                getDate={this.getDate}
              />
            </div>
            <label>Comment</label>
            <div className="col-md-8 pl-0">
              <form className="form-inline">
                <input
                  className="form-control w-75"
                  id="content"
                  type="string"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
                <button
                  onClick={this.submitPost}
                  className="btn btn-yolo my-2 my-sm-0"
                >
                  <i className="fas fa-paper-plane" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowOnePost;
