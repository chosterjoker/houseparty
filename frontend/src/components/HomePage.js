import React, { useState, useEffect } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Info from "./Info";

const HomePage = () => {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch("/api/user-in-room");
        const data = await response.json();
        if (data.code) {
          setRoomCode(data.code);
        }
      } catch (error) {
        console.error("Error fetching user room data:", error);
      }
    };

    fetchRoomData();
  }, []);

  const leaveRoomCallback = () => {
    setRoomCode(null); // Clear the room code when leaving the room
  };

  const renderHomePage = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography
          variant="h3"
          component="h1"
          className="gradient-text"
          sx={{ fontSize: '3rem', fontWeight: 'bold' }}
        >
          House Party
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup disableElevation variant="contained">
          <Button
            color="primary"
            to="/join"
            component={Link}
            sx={{ textTransform: 'none', fontWeight: 'bold', color: '#000' }} // Black text
          >
            join room
          </Button>
          <Button
            color="info"
            to="/info"
            component={Link}
            sx={{ textTransform: 'none', fontWeight: 'bold', color: '#fff' }} // Black text
          >
            info
          </Button>
          <Button
            color="secondary"
            to="/create"
            component={Link}
            sx={{ textTransform: 'none', fontWeight: 'bold', color: '#000' }} // Black text
          >
            create room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );

  return (
    <Routes>
      <Route
        path="/"
        element={roomCode ? <Navigate to={`/room/${roomCode}`} /> : renderHomePage()}
      />
      <Route path="/join" element={<RoomJoinPage />} />
      <Route path="/info" element={<Info />} />
      <Route path="/create" element={<CreateRoomPage />} />
      <Route
        path="/room/:roomCode"
        element={<Room leaveRoomCallback={leaveRoomCallback} />}
      />
    </Routes>
  );
};

export default HomePage;
