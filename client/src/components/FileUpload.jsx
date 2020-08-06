import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Nav from "./Nav";

const FileUpload = ({ currentUser }) => {
  const history = useHistory();

  const [file, setFile] = useState({
    preview: "",
    img: "",
  });
  console.log(currentUser);

  const onChangeHandler = (e) => {
    setFile({
      preview: URL.createObjectURL(e.target.files[0]),
      img: e.target.files[0],
    });
  };
  console.log(file.img);

  const onFileSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file.img);
      await fetch(`http://localhost:3003/uploads/${currentUser.user_id}`, {
        // headers: {
        //   Accept: "application/json",
        //   "Content-Type": "multipart/form-data",
        // },
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      history.push("/dashboard");
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className="profileImg">
    //   <img src={image.data} alt="" />

    //   <input
    //     type="file"
    //     className="custom-file-input"
    //     onChange={onChangeHandler}
    //   />
    //   <label className="custom-file-label">Choose file</label>
    //   <button onClick={onFileSubmit}>Submit</button>
    // </div>
    <>
      <Nav img={file.preview} />
      <div id="uploadDiv" className="container">
        <div>
          <h1>click Icon to upload profile image</h1>
        </div>
        <label htmlFor="upload-button">
          {file.preview ? (
            <img src={file.preview} alt="dummy" width="200" height="200" />
          ) : (
            <>
              <span className="fa-stack fa-2x mt-3 mb-2">
                <i className="fas fa-circle fa-stack-2x" />
                <i className="fas fa-user fa-stack-1x fa-inverse" />
              </span>
              <h5 className="text-center">Upload your photo</h5>
            </>
          )}
        </label>
        <input
          type="file"
          id="upload-button"
          style={{ display: "none" }}
          onChange={onChangeHandler}
        />
        <br />
        <button
          id="uploadButton"
          className="btn btn-success"
          onClick={onFileSubmit}
        >
          Upload
        </button>
      </div>
    </>
  );
};
export default FileUpload;
