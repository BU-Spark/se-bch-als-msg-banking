import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db } from "../firebase";
import axios from "axios";
import "./Retrieve.css";
import useCollapse from 'react-collapsed';


const url = require('../settings')

function Retrieve() {
  const [user, loading] = useAuthState(auth);
  const [audio, setAudio] = useState([]);
  const history = useHistory();
  const fetchUserAudio = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      if ("audio" in data) {
        setAudio(audio.concat(data.audio));
      } else {
        setAudio([]);
      }
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace(process.env.PUBLIC_URL + "/");
    fetchUserAudio();
  }, [loading]);
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


  const downloadClip = async (name) => {
    try {
      const response = await axios.post(
        (url + "/retrieve_audio"),
        {
          fileName: name,
        }
      );
      window.open(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteUnprocessedAudio = async (cloudStorageFileName) => {
    try {
      showLoading();
      const token = await auth.currentUser.getIdToken();
      const response = await axios.delete(
        (url + "/delete_unprocessed_audio"),
        {
          'data': {
            'cloudStorageFileName': cloudStorageFileName,
            'Authorization': token
          }
        }
      ).then( response => {
        removeLoading();
        window.location.reload(false);
      }
      )

    } catch (err) {
      console.log(err);
      removeLoading();
    }
  };

  const deleteProcessedAudio = async (cloudStorageFileName) => {
    try {
      showLoading();
      const token = await auth.currentUser.getIdToken();
      const response = await axios.delete(
        (url + "/delete_processed_audio"),
        {
          'data': {
            'cloudStorageFileName': cloudStorageFileName,
            'Authorization': token
          }
        }
      ).then( response => {
        removeLoading();
        window.location.reload(false);
      }
      )
    } catch (err) {
      console.log(err);
      removeLoading();
    }
  };


  var unprocessedList = audio.map((value) => {
    return (
      <div>
        <div className="unprocessed-audio">
          <div>{Object.keys(value).map(inner => {
            let db_name = value[inner];
            if ("processed" === inner) {
              return;
            }
            return (
              <div>
                {inner}
              </div>
            )
          }
          )
          }
          </div>
        </div>
      </div>);
  }
  );

  var processedList = audio.map((value) => {
    return (
      <div>
        <div className="processed-audio">
          <div>{value.processed.map(inner => (
            <div>
              {inner}
              <button className="button" onClick={() => downloadClip(inner)}>Download</button>
              <button className="button" onClick={() => deleteProcessedAudio(inner)}>Delete</button>
            </div>
          )
          )
          }</div>
        </div>
      </div>);
  }
  );



  const Collapsible = ({ index }) => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
      <div className="collapsible">
        <div className="header" {...getToggleProps()}>
          <table>
            <tbody>
            <tr align="right">
              <td>{(isExpanded ? '▼' : '▶')} {unprocessedList[index]}</td>
            </tr>
            </tbody>
          </table>

        </div>
        <div {...getCollapseProps()}>
          <div className="content">
            {processedList[index]}
          </div>
        </div>
      </div>
    );
  }



  return (
    <>
      <h1 className="dashboard-header text-center">Rediscover Your Voice</h1>
      <table>
        <thead>
          <tr>
            <th align="center"> Name </th>
            <th> Files </th>
            <th> Date </th>
            <th colspan="2"> Actions </th>
          </tr>        
        </thead>

        {audio.map((value, index) => {
          var db_name = "";
          db_name = Object.keys(value).map(inner => {
            // let db = inner; //audio name
            let db = value[inner];  //database name
            if ("processed" === inner) {
              return false; // skip
            }         
            else {return db;}                     
          });
          
          db_name.forEach(element => {
            if (element !== false){
              db_name = element;  
            }
          });
   
          return (
            <tbody>
              <tr align="right">
                <td className = "table-first-col"><Collapsible index={index} /> </td>
                <td align="right">    {"-"}     </td>
                <td align="right"> {"-"}</td>
                <td align="right">  <button className="button" onClick={() => downloadClip(db_name)}>Download</button> </td>
                {/* <td aligb = "left"> <button className="button" onClick={() => deleteUnprocessedAudio(db_name)}>Delete</button> </td> */}
                <td > <button className="button" onClick={() => {deleteUnprocessedAudio(db_name);  }}>Delete</button> </td>
            </tr>
            </tbody>
          );
        })
        }

      </table>
    </>
  );
}

export default Retrieve;
