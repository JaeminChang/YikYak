import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

class FileUpload extends React.Component {
  componentDidMount = () => {
    console.log("FILES", this.props);
    this.openFileBrowser();
  };

  openFileBrowser = () => {
    this.fileRef.current.click();
  };

  fileRef = React.createRef();

  uploadFiles = evt => {
    evt.preventDefault();
    const files = this.fileRef.current.files;
    const userName = this.props.user.userName;
    const url = `http://localhost:8080/files/upload-image`;
    const formData = new FormData();

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append(userName, file, file.name);
      }
    }

    axios
      .post(url, formData)
      .then(res => {
        let urls = res.data.items;
        this.returnUploads(urls);
      })
      .catch(err => {
        console.log(`FAILED ON AXIOS POST OF FILES.`, err);
      });
  };

  returnUploads = urls => {
    this.props.imageUpload(urls);
  };

  render = () => {
    return (
      <>
        <input
          type="file"
          id="uploadInput"
          ref={this.fileRef}
          name="file"
          onChange={this.uploadFiles}
          multiple
          style={{ display: "hidden" }}
        />
      </>
    );
  };
}
FileUpload.propTypes = {
  uploadsReturn: PropTypes.func
};
export default FileUpload;
