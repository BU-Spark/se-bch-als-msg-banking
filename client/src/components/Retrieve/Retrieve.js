import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db } from "../firebase";
import axios from "axios";
import "./Retrieve.css";
import useCollapse from 'react-collapsed';

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


var unprocessedList = audio.map((value) => {
    return(
      <div>
        <div className="original-audio">
          <div>{Object.keys(value).map(inner=> {
            let db_name = value[inner];
            if ("processed" === inner) {
              return;
            }
            return (
              <div>
                <div>{inner}</div>            
                <button className="button" onClick={() => downloadClip(db_name)}>Download</button>
                <button className="button" onClick={() => deleteUnprocessedAudio(db_name)}>Delete</button>
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
  return(
    <div>
      <div className="processed-audio">
        <div>{value.processed.map(inner=>(
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

  const Collapsible = ({index}) =>{
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapsible">
            <div className="header" {...getToggleProps()}>
                {(isExpanded ? '▼':'▶')}
                {unprocessedList[index]}
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
      <h2 className="dashboard-header text-center">Click to Download!</h2>
      <br />
      {
        audio.map((_,index)=>{
          return <Collapsible index={index}/>
        })
      }     
    </>
  );
}

export default Retrieve;
