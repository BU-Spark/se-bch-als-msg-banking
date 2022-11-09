import { Form } from "react-bootstrap";
import { auth } from "../firebase";
import { useHistory } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Upload.css"
const url=require('../settings')

// Loading Wheel Functions are from: https://stackoverflow.com/questions/19315149/implementing-a-loading-spinning-wheel-in-javascript
// Author: Jared Goodwin, Haowei Li
// showLoading() - Display loading wheel.
// removeLoading() - Remove loading wheel.
// Requires ECMAScript 6 (any modern browser).
function showLoading() {
  if (document.getElementById("divLoadingFrame") != null) {
    return;
  }
  var style = document.createElement("style");
  style.id = "styleLoadingWindow";
  style.innerHTML = `
        .loading-frame {
            position: fixed;
            background-color: rgba(0, 0, 0, 0.8);
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 4;
        }

        .loading-track {
            height: 50px;
            display: inline-block;
            position: absolute;
            top: calc(50% - 50px);
            left: 50%;
        }

        .loading-dot {
            height: 5px;
            width: 5px;
            background-color: white;
            border-radius: 100%;
            opacity: 0;
        }

        .loading-dot-animated {
            animation-name: loading-dot-animated;
            animation-direction: alternate;
            animation-duration: .75s;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
        }

        @keyframes loading-dot-animated {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }
    `
  document.body.appendChild(style);
  var frame = document.createElement("div");
  frame.id = "divLoadingFrame";
  frame.classList.add("loading-frame");
  for (var i = 0; i < 10; i++) {
    var track = document.createElement("div");
    track.classList.add("loading-track");
    var dot = document.createElement("div");
    dot.classList.add("loading-dot");
    track.style.transform = "rotate(" + String(i * 36) + "deg)";
    track.appendChild(dot);
    frame.appendChild(track);
  }
  document.body.appendChild(frame);
  var wait = 0;
  var dots = document.getElementsByClassName("loading-dot");
  // There was a warning i is already defined, thus use j for index instead.
  for (var j = 0; j < dots.length; j++) {
    window.setTimeout(function(dot) {
      dot.classList.add("loading-dot-animated");
    }, wait, dots[j]);
    wait += 150;
  }
};

function removeLoading() {
  document.body.removeChild(document.getElementById("divLoadingFrame"));
  document.body.removeChild(document.getElementById("styleLoadingWindow"));
};

document.addEventListener('keydown', function(e) {
  if (e.keyCode === 27) {
    removeLoading();
  }
}, false);

function Upload() {
  const [user, loading] = useAuthState(auth);
  const [uploadedFiles, setUploadedFiles] = useState([]); // This is the array of files that have been uploaded.
  const [title] = React.useState();
  const history = useHistory();
  const [uploadedSuccessfully, setUploadedSuccessfully] = useState(false);
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) history.replace("/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  
  // Select audio file to upload.
  const submitAudios = async (files) => {
    //for each file in the array of files, asynchronously upload the file to the server.
    const token = await auth.currentUser.getIdToken();
    showLoading();
    let formData = new FormData();
    // wait till all files are appended to the form data before sending it to the server.
    files.forEach((f) => formData.append("file", f));
    // if multiple audios, else single audio file
    if (files.length == 1) {
      console.log('Uploaded One File');
    await axios({
      method: "post",
      url: url + "/upload_audio",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      }
    }).then((res) => {
      // if the upload was successful, set the uploadedFiles array to the response data.
      console.log(res.data);
      setUploadedSuccessfully(true);
      removeLoading();
    }).catch((err) => {
      console.log(err);
      removeLoading();
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
      removeLoading();
    }).catch((err) => {
      setUploadedSuccessfully(false);
      console.log(err);
      removeLoading();
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
