import React from "react";
import * as yikYakService from "../services/yikYakService";
import faker from "faker";

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      show: false
    };
  }

  toggle = e => {
    this.setState({
      show: !this.state.show
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  createPost = body => {
    if (body.userName === "") {
      this.setState({
        title: faker.random.words()
      });
    }
    if (body.password === "") {
      this.setState(
        {
          content: faker.random.words()
        },
        this.submit
      );
    } else {
      this.submit();
    }
  };

  submit = () => {
    const title = this.state.title;
    const content = this.state.content;
    const payload = { title, content };
    yikYakService
      .insert(payload)
      .then(this.onInsertSuccess)
      .catch(this.onInsertError);
  };

  submitPost = e => {
    const userName = this.state.title;
    const password = this.state.content;
    const payload = { userName, password };
    e.preventDefault();
    this.createPost(payload);
  };

  onInsertSuccess = success => {
    console.log(success);
    this.setState({
      title: "",
      content: "",
      show: false
    });
    this.props.getAllPosts();
  };

  onInsertError = err => {
    console.log(err);
  };

  render() {
    return (
      <div>
        {!this.state.show ? (
          <button onClick={this.toggle}>Create a Post!</button>
        ) : (
          ""
        )}
        {this.state.show ? (
          <div className="card p-4">
            <form>
              <div className="form-group">
                <label>Title</label>
                <input
                  id="title"
                  className="form-control"
                  type="string"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <input
                  id="content"
                  className="form-control"
                  type="string"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </div>
              <button onClick={this.submitPost}>Submit</button>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default CreatePost;
