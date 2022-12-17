import { Form } from "react-bootstrap";
import { auth } from "../firebase";
import { useHistory } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Upload.css";
import LoadingScreen from "react-loading-screen";

const url=require('../settings')

function Upload() {
  const [user, loading] = useAuthState(auth);
  const [uploadedFiles, setUploadedFiles] = useState([]); // This is the array of files that have been uploaded.
  const [title] = React.useState();
  const history = useHistory();
  const [uploadedSuccessfully, setUploadedSuccessfully] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) history.replace("/home");
  }, [user, loading]);
  
  // Select audio file to upload.
  const submitAudios = async (files) => {
    //for each file in the array of files, asynchronously upload the file to the server.
    const token = await auth.currentUser.getIdToken();
    setLoading(true);
    let formData = new FormData();
    // wait till all files are appended to the form data before sending it to the server.
    files.forEach((f) => formData.append("file", f));
    // if multiple audios, else single audio file
    if (files.length == 1) {
      console.log('Uploaded One File');
    await axios({
      method: "post",
      url: url + "/upload_audios",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      }
    }).then((res) => {
      // if the upload was successful, set the uploadedFiles array to the response data.
      console.log(res.data);
      setUploadedSuccessfully(true);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  } else {
    console.log('Uploaded Multiple Files');
    await axios({
      method: "post",
      url: url + "/upload_audios",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      }
    }).then((res) => {
      // if the upload was successful, set the uploadedFiles array to the response data.
      console.log(res.data);
      setUploadedSuccessfully(true);
      setLoading(false);
    }).catch((err) => {
      setUploadedSuccessfully(false);
      console.log(err);
      setLoading(false);
    });
  }


  };
  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files); // This is the array of files that have been chosen.
    handleUploadFiles(chosenFiles);
  };
  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
    });
    setUploadedFiles(uploaded);
    //upload all files through axios
    //submitAudios(uploaded);
  };

  return (
    <div>
      {isLoading && <LoadingScreen
        loading={true}
        bgColor="rgba(255,255,255,0.8)"
        spinnerColor="#a8b1bf"
        textColor="#676767"
        logoSrc=""
        text="Uploading.."
      > upload
      </LoadingScreen>}
      <Form encType="multipart/form-data">
        <Form.Group controlId="formFile" className="col-lg-6 offset-lg-3">
          <div className="row justify-content-center">
          <h5>Upload your WAV File</h5>
            <input id="fileUpload"
                   multiple
                   type="file"   
                   onChange={handleFileEvent} />
          </div>
          {uploadedFiles.length > 0
          ?
          <>
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>File Size</th>
                <th>Last Modified</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {uploadedSuccessfully ?
              <>
              {uploadedFiles.map((file, index) => (
                <tr key={index} className='submittedItem'>
                  <td>{file.name}</td>
                  <td>{file.size}</td>
                  <td>{file.lastModifiedDate.toLocaleDateString()}</td>
                  <td>{file.type}</td>
                </tr>
              ))}
              </>
              :
              <>
              {uploadedFiles.map((file, index) => (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{file.size}</td>
                  <td>{file.lastModifiedDate.toLocaleDateString()}</td>
                  <td>{file.type}</td>
                </tr>
              ))}
              </>
              }
            </tbody>
          </table>
          <button id='submitButton' onClick={(e) => {e.preventDefault(); submitAudios(uploadedFiles); return false;}}>Upload</button>
          </>
          :
          <>
          </>
        }
        </Form.Group>
      </Form>
    </div>
  );
}

export default Upload;
