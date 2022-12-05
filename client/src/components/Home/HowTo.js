import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import howto1 from "../assets/howto1.png";
import howto2 from "../assets/howto2.png";
import howto3 from "../assets/howto3.png";
import { createTheme, ThemeProvider } from "@mui/system";


const useStyles = makeStyles((theme) => ({
    section: {
        height: "70vh",
        position: "relative",  
    },
    container: {
        height: "100%",
        maxWidth: "xl",
    },
    gridRoot: {
      height: "100%",
      width: "100%",
      direction: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
    //   height: "100%",
      width: "80%",
    },
}));

export default function HowTo() {
    const styles = useStyles();
    const theme = createTheme({
        typography: {
            fontFamily: ["Euclid Circular A", "sans-serif"].join(",")
        }
    });
    return (
        <Paper className={styles.section}>
            <Container className={styles.container}>
                <ThemeProvider theme={theme}>
                    <Typography component="div">
                        <Box sx={{ fontWeight: 600, fontSize: 32, textAlign: 'center', mb: 5}}>How to get your customized voice:</Box>
                    </Typography>
                    <Grid container>
                        <Grid item lg={4} align="center">
                            <img src={howto1} className={styles.image}></img>
                            <Typography component="div">
                                <Box sx={{ fontWeight: 600, fontSize: 24, textAlign: 'center'}}>Upload</Box>
                                {/* <Box sx={{ fontWeight: 300, fontSize: 18, textAlign: 'center'}}>Upload your .wav audio files to the platform.</Box> */}
                            </Typography>
                            <Typography variant="h7">Upload your .wav audio files to the platform.</Typography>
                        </Grid>
                        <Grid item lg={4} align="center">
                            <img src={howto2} className={styles.image}></img>
                            <Typography component="div">
                                <Box sx={{ fontWeight: 600, fontSize: 24, textAlign: 'center'}}>Edit</Box>
                            </Typography>
                            {/* <Typography variant="h6">Edit</Typography> */}
                            <Typography variant="h7">The audio processing system will automatically split the uploaded audio into noise-reduced short pieces.</Typography>
                        </Grid>
                        <Grid item lg={4} align="center">
                            <img src={howto3} className={styles.image}></img>
                            <Typography component="div">
                                <Box sx={{ fontWeight: 600, fontSize: 24, textAlign: 'center'}}>Save</Box>
                            </Typography>
                            <Typography variant="h7">View your audio bank and download your voices to your device.</Typography>
                        </Grid>
                    </Grid>
                </ThemeProvider>
                
            </Container>
        </Paper>
    )
}