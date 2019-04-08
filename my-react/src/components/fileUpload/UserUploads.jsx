import React from "react";
import { Row, Col, Card, Button, CardBody, CardHeader } from "reactstrap";
import FileUpload from "./FileUpload";

class UserUploads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filePromptOpen: false
    };
  }

  toggleFilePrompt = () => {
    this.setState({ filePromptOpen: !this.state.filePromptOpen });
  };

  imageUpload = image => {
    console.log(image);
    const imageUrl = image[0];
    this.setState(
      {
        imageUrlArray: image,
        imageUrl: imageUrl
      },
      this.toggleFilePrompt
    );
  };

  render = () => {
    const { filePromptOpen } = this.state;
    return (
      <div>
        <Row>
          <Col sm={{ size: 4, offset: 4 }}>
            <Card>
              <CardHeader>Upload an image</CardHeader>
              <CardBody>
                {filePromptOpen && (
                  <FileUpload
                    imageUpload={this.imageUpload}
                    user={this.props.user}
                  />
                )}
                {this.state.imageUrlArray ? (
                  <div className="img-wrap">
                    <img
                      width="100%"
                      src={this.state.imageUrlArray[0]}
                      alt="patrick"
                      title={this.state.imageUrlArray[0]}
                    />
                  </div>
                ) : null}
                <Button
                  type="button"
                  size="sm"
                  color="primary"
                  onClick={this.toggleFilePrompt}
                >
                  Upload images
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
}

export default UserUploads;
