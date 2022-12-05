import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Card, CardContent, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
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
    card: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }
}));

export default function Intro() {
    const styles = useStyles();
    const theme = createTheme({
        typography: {
            fontFamily: ["Euclid Circular A", "sans-serif"].join(",")
        }
    });
    return (
        <Paper className={styles.section}>
            <Container className={styles.container}>
                <Card sx={{mx:10}} style={{backgroundColor: "#f5f5f6"}}>
                    <ThemeProvider theme={theme}>
                        <Typography component="div">
                            <Box sx={{ fontWeight: 600, fontSize: 32, mx: 5, mt: 3}}>ALS Audio Editor - Fast, Easy & All Online</Box>
                            <Box sx={{ fontWeight: 300, fontSize: 24, mx: 5, mt: 3, mb: 3}}>Using our online audio editor, you can upload audios, remove background noises, detect target voices, boost voice levels, generate clean voice clips and so much more. Whether you are an ALS patient or a clinician, this editor is here to help you. No need to manually edit long audio files on your own. Our online editor has the capability to process audio files automatically. Just drag & drop from the computer and upload. It will save you all the trouble.</Box>                        </Typography>
                    </ThemeProvider>
                </Card>
            </Container>
        </Paper>
    )
}