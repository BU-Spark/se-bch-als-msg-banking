import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { makeStyles } from "@mui/styles";
import hero_img from "../assets/hero_img.png";
import { Box, Button, IconButton } from "@mui/material";
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

export default function Hero() {
    const theme = createTheme({
        typography: {
            fontFamily: ["Euclid Circular A", "sans-serif"].join(",")
        }
      });
    const styles = useStyles();
    return (
        <Paper className={styles.section}>
            <Container className={styles.container}>
                <Grid container className={styles.gridRoot}>
                    <Grid item md={6} >
                        <ThemeProvider theme={theme}>
                            <Typography component="div">
                                <Box sx={{ fontWeight: 800, fontSize: 64, textAlign: 'center'}}>ALS Voice Editor</Box>
                                {/* <Box sx={{ fontWeight: 300, fontSize: 24, pt: 2, textAlign: 'center'}}>Rediscover your voice</Box> */}
                            </Typography>
                            <Typography variant="h4" sx={{textAlign: 'center', pt: 1}}>Rediscover your voice</Typography>
                        </ThemeProvider>
                    </Grid>
                    <Grid item md={6} >
                        <img src={hero_img} className={styles.heroImage}></img>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}