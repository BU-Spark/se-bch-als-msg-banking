import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db } from "../firebase";
import axios from "axios";
import "./Retrieve.css";
import useCollapse from 'react-collapsed';
import LoadingScreen from "react-loading-screen";


const url = require('../settings')

function Retrieve() {
  const [user, loading] = useAuthState(auth);
  const [audio, setAudio] = useState([]);
  const history = useHistory();
  const [isLoading, setLoading] = useState(false)

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
      setLoading(true);
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
        setLoading(false);
        window.location.reload(false);
      }
      )

    } catch (err) {
      console.log(err);
      setLoading(false);

    }
  };

  const deleteProcessedAudio = async (cloudStorageFileName) => {
    try {
      setLoading(true);
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
        setLoading(false);
        window.location.reload(false);
      }
      )
    } catch (err) {
      console.log(err);
      setLoading(false);
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
    {isLoading && <LoadingScreen
        loading={true}
        bgColor="rgba(255,255,255,0.8)"
        spinnerColor="#a8b1bf"
        textColor="#676767"
        logoSrc=""
        text="Deleting.."
      > delete
      </LoadingScreen>}
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
