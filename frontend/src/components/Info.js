import React, { useState, useEffect } from "react";
import { Grid, Typography, IconButton, Button } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

const pages = {
  JOIN: "pages.join",
  CREATE: "pages.create",
};

export default function Info() {
  const [page, setPage] = useState(pages.JOIN);

  const joinInfo = () =>
    "You can join a room by entering the code provided by the host. You have the ability to 'vote' skip for a song if the host allows it.";
  const createInfo = () =>
    "Create a group music room and configure the settings of your guest. The music is connected to the host's Spotify account after authentication.";

  useEffect(() => {
    console.log("Component mounted");
    return () => console.log("Component unmounted");
  }, []);

  return (
    <Grid container spacing={3}> {/* Adjusted spacing for better layout */}
      <Grid item xs={12} align="center">
        <Typography
          component="h1"
          variant="h3"
          className="gradient-text"
          sx={{ fontSize: '3rem', fontWeight: 'bold' }} // Larger, bold, gradient text
        >
          What is House Party?
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="body1" sx={{ color: 'white' }}> {/* Ensure text color is visible */}
          {page === pages.JOIN ? joinInfo() : createInfo()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <IconButton
          onClick={() => {
            setPage((prevPage) =>
              prevPage === pages.CREATE ? pages.JOIN : pages.CREATE
            );
          }}
          sx={{ color: 'white' }} // Ensure icon color is visible
        >
          {page === pages.CREATE ? (
            <NavigateBeforeIcon />
          ) : (
            <NavigateNextIcon />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          color="secondary"
          variant="contained"
          component={Link}
          to="/"
          sx={{ textTransform: 'none', fontWeight: 'bold', color: 'black' }} // Lowercase, bold, black text
        >
          back
        </Button>
      </Grid>
    </Grid>
  );
}
