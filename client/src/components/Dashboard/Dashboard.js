import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db, logout } from "../firebase";

import { Button } from "react-bootstrap";
import "./Dashboard.css";

import { Card, CardActionArea, CardContent, Grid, Typography, Paper, Container, Box } from "@mui/material"
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  section: {
      height: "80vh",
      // height: "500px",
      // position: "relative",  
  },
  container: {
      height: "100%",
      // maxWidth: "xl",
  },
  gridRoot: {
    height: "100%",
    width: "100%",
    direction: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  heroImage: {
  //   height: "100%",
    width: "100%",
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
      <h1 className="dashboard-header text-center">Rediscover Your Voice</h1>
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
      </div>


      {/* <Paper className={styles.section}>
            <Container className={styles.container}>
                <Grid container className={styles.gridRoot}>
                    <Grid item md={6} >
                      <Card>
                        <CardActionArea href={process.env.PUBLIC_URL + "/Upload"}>
                          <CardContent>
                            <Typography variant="h5" textAlign="center">UPLOAD</Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                    <Grid item md={6} >
                      <Card>
                        <CardActionArea href={process.env.PUBLIC_URL + "/retrieve"}>
                          <CardContent>
                            <Typography variant="h5" textAlign="center">RETRIEVE</Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                </Grid>
                <Typography variant="h7" textAlign="center">logged in as:</Typography>
                <br/>
                <Typography variant="h7" textAlign="center">{name}</Typography>
                <br/>
                <Typography variant="h7" textAlign="center">{user?.email}</Typography>
            </Container>
      </Paper> */}
    </>
  );
}

export default Dashboard;
