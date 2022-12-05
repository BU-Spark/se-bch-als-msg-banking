import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db, logout } from "../firebase";

import { Button } from "react-bootstrap";
import "./Dashboard.css";

import { Card, CardActionArea, CardContent, Grid, Typography, Paper, Container, Box } from "@mui/material"
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/system";
import icon_upload from "../assets/icon_upload.png";
import icon_download from "../assets/icon_download.png";

const useStyles = makeStyles((theme) => ({
  section: {
      height: "78vh",
      // height: "500px",
      // position: "relative",  
  },
  container: {
      height: "50%",
      // maxWidth: "xl",
  },
  gridRoot: {
    height: "100%",
    width: "100%",
    direction: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}));


function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (!user){
      return history.replace(process.env.PUBLIC_URL + "/");
    }

    const fetchUserName = async () => {
      try {
        const query = await db
          .collection("users")
          .where("uid", "==", user?.uid)
          .get();
        if (query.docs.length > 0) {
          const data = await query.docs[0].data();
          setName(data.name);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const theme = createTheme({
    typography: {
        fontFamily: ["Euclid Circular A", "sans-serif"].join(",")
    }
  });
  const styles = useStyles();

  return (
    <>
      {/* <h1 className="dashboard-header text-center">Rediscover Your Voice</h1>
      <h2 className="dashboard-header text-center">ALS Voice Editing</h2>
      <br />
      <div class="col-md-12 text-center">
        <Button
          className="align-center"
          href={process.env.PUBLIC_URL + "/Upload"}
        >
          Upload your audio
        </Button>
        <br />
        <Button
          className="align-center mt-2"
          href={process.env.PUBLIC_URL + "/retrieve"}
        >
          Retrieve your audio
        </Button>
        <br />
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <Button onClick={logout}>Logout</Button>
      </div> */}


      {/* <Typography variant="h7">logged in as:</Typography>
      <br/> */}
      <Typography variant="h7" color="#79797a">{name}</Typography>
      <br/>
      <Typography variant="h7" color="#79797a">{user?.email}</Typography>   
      <Paper className={styles.section}>
            <Container className={styles.container}>
                <Typography variant="h2" textAlign="center" pt={5} color="#0C3282" fontWeight={700}>Dashboard</Typography>
                <Grid container className={styles.gridRoot}>
                    <Grid item md={5.5}>
                      <Card style={{backgroundColor: "#F5F5F6"}}>
                        <CardActionArea href={process.env.PUBLIC_URL + "/Upload"}>
                          <CardContent>
                            {/* <Grid container alignItems= "center"> */}
                            <Grid container>
                              <Grid item xs={4} border={0} pt={5} align="center">
                                <img src={icon_upload} width="50%"></img>
                              </Grid>
                              <Grid item xs={8} border={0} pt={5} pb={5}>
                                <Typography variant="h5" pb={1}>UPLOAD</Typography>
                                <Typography variant="h7">- Upload your .wav audio files</Typography>
                                <br/>
                                <Typography variant="h7">- Wait for audio processing</Typography>
                                <br/>
                                <Typography variant="h7">- And it's done</Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                    <Grid item md={0.5}></Grid>
                    <Grid item md={5.5}>
                      <Card style={{backgroundColor: "#F5F5F6"}}>
                        <CardActionArea href={process.env.PUBLIC_URL + "/retrieve"}>
                          <CardContent>
                            <Grid container>
                              <Grid item xs={4} border={0} pt={5} align="center">
                                <img src={icon_download} width="50%"></img>
                              </Grid>
                              <Grid item xs={8} border={0} pt={5} pb={5}>
                                <Typography variant="h5" pb={1}>RETRIEVE</Typography>
                                <Typography variant="h7">- View your your audio banking</Typography>
                                <br/>
                                <Typography variant="h7">- See your processed audios</Typography>
                                <br/>
                                <Typography variant="h7">- Click to download your voice clips</Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                </Grid>
            </Container>
      </Paper>
    </>
  );
}

export default Dashboard;
