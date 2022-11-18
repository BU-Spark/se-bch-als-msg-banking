import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db } from "../firebase";
import axios from "axios";
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
  const deleteClip = async (fireStoreFilename, cloudStorageFileName) => {
    try {
      console.log('called deleteClip...')
      const token = await auth.currentUser.getIdToken();
      const response = await axios.delete(
        (url+"/delete_audio"),
        {
          'data': {
            'fireStoreFilename': fireStoreFilename,
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
    return (
      <div>
        <button
          className="align-center mt-2"
          key="{res}"
          onClick={() => downloadClip(res[0][1])}
        >
          {res[0][0]}
        </button>
        <br />
      </div>
    );
  });
  return (
    <>
      <h1 className="dashboard-header text-center">Rediscover Your Voice</h1>
      <h2 className="dashboard-header text-center">Click to Download!</h2>
      <br />
      <button onClick={() => deleteClip('testEditedchunk-0.WAV', 'Audiodbdd10e0-6088-11ed-b642-df8bb8090224.wav')}>test button</button>
      <div className="col-md-12 text-center">{audioList}</div>
    </>
  );
}

export default Retrieve;
