import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db } from "../firebase";
import axios from "axios";
import "./Retrieve.css";
const url=require('../settings')

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
  const downloadClip = async (name) => {
    try {
      const response = await axios.post(
        (url+"/retrieve_audio"),
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
      const token = await auth.currentUser.getIdToken();
      const response = await axios.delete(
        (url+"/delete_unprocessed_audio"),
        {
          'data': {
            'cloudStorageFileName': cloudStorageFileName,
            'Authorization': token
          }
        }
      );
      console.log('Response from delete audio:');
      console.log(response)
    } catch (err) {
      console.log(err);
    }
  };
  const deleteProcessedAudio = async (cloudStorageFileName) => {
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.delete(
        (url+"/delete_processed_audio"),
        {
          'data': {
            'cloudStorageFileName': cloudStorageFileName,
            'Authorization': token
          }
        }
      );
      console.log('Response from delete audio:');
      console.log(response)
    } catch (err) {
      console.log(err);
    }
  };
  var audioList = audio.map((value) => {
    const res = Object.entries(value);
    console.log(`res: ${res}`);
    console.log(res);
    if(res[1][0] === "processed"){
      return (
        <div>
          <div className="original-audio">
            <div>{res[0][0]}</div>
            <div>{res[0][1]}</div>
            <button onClick={() => downloadClip(res[0][1])}>Download</button>
            <button onClick={() => deleteUnprocessedAudio(res[0][0])}>Delete</button>
          </div>
          <div className="processed-audio">
            <div>{res[1][0]}</div>
            <div>{showList(res[1][1])}</div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          <div className="original-audio">
            <div>{res[1][0]}</div>
            <div>{res[1][1]}</div>
            <button onClick={() => downloadClip(res[1][1])}>Download</button>
            <button onClick={() => deleteUnprocessedAudio(res[1][0])}>Delete</button>
          </div>
          <div className="processed-audio">
            <div><p>{res[0][0]}</p></div>
            <div className="processed-audio-list">{showList(res[0][1])}</div>
          </div>
        </div>
      );
    }
    
  //   <div className="download-btn">
  //   <button onClick={() => downloadClip(res[0][1])}>Download</button>
  // </div>
  });
  function showList(list) {
    // return a list of divs, that contain the processed audio files
    if (list.length === 0) {
      return <div>No processed audio files</div>;
    }
    var list = list.map((value) => {
      return (
        <div className="processed-clip-div">
          <div className="processed-clip">{value}</div>
          <button onClick={() => downloadClip(value)}>Download</button>
          <button onClick={() => deleteProcessedAudio(value)}>Delete</button>
        </div>
      );
    });
    return list;
  }
  //<button onClick={() => deleteProcessedAudio('Audiob4858236-67ac-11ed-b1c9-0242ac110002.wav')}>test button</button>
  return (
    <>
      <h1 className="dashboard-header text-center">Rediscover Your Voice</h1>
      <h2 className="dashboard-header text-center">Click to Download!</h2>
      <br />
      <div className="col-md-12 text-center">{audioList}</div>
    </>
  );
}

export default Retrieve;
