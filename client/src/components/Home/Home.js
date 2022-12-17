import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth } from "../firebase";
import "./Home.css";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Hero from "./Hero";
import Intro from "./Intro";
import HowTo from "./HowTo";


function Home() {
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace(process.env.PUBLIC_URL + "/dashboard");
  }, [user, loading]);
  return (
    <>
      <Hero></Hero>
      <Intro></Intro>
      <HowTo></HowTo>
      {/* <h2 className="home-header text-center">FOOT SECTION</h2>
      <h3 className="home-header text-center">Rediscover Your Voice</h3>
      <h3 className="home-header text-center">ALS Voice Editing</h3> */}
    </>
  );
}

export default Home;
