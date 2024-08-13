import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

const Room = ({ leaveRoomCallback }) => {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [song, setSong] = useState({});
  const { roomCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        const response = await fetch(`/api/get-room?code=${roomCode}`);
        if (!response.ok) {
          leaveRoomCallback();
          navigate("/");
        } else {
          const data = await response.json();
          setVotesToSkip(data.votes_to_skip);
          setGuestCanPause(data.guest_can_pause);
          setIsHost(data.is_host);
          if (data.is_host) {
            authenticateSpotify();
          }
        }
      } catch (error) {
        console.error("Failed to fetch room details:", error);
        leaveRoomCallback();
        navigate("/");
      }
    };

    getRoomDetails();
    const interval = setInterval(getCurrentSong, 1000);

    return () => clearInterval(interval);
  }, [roomCode, leaveRoomCallback, navigate]);

  const authenticateSpotify = async () => {
    try {
      const response = await fetch("/spotify/is-authenticated");
      const data = await response.json();
      setSpotifyAuthenticated(data.status);
      if (!data.status) {
        const authResponse = await fetch("/spotify/get-auth-url");
        const authData = await authResponse.json();
        window.location.replace(authData.url);
      }
    } catch (error) {
      console.error("Spotify authentication failed:", error);
    }
  };

  const getCurrentSong = async () => {
    try {
      const response = await fetch("/spotify/current-song");
      if (!response.ok) {
        setSong({});
      } else {
        const data = await response.json();
        setSong(data);
      }
    } catch (error) {
      console.error("Failed to fetch current song:", error);
    }
  };

  const leaveButtonPressed = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    try {
      await fetch("/api/leave-room", requestOptions);
      leaveRoomCallback();
      navigate("/");
    } catch (error) {
      console.error("Failed to leave room:", error);
    }
  };

  const renderSettings = () => (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <CreateRoomPage
          update={true}
          votesToSkip={votesToSkip}
          guestCanPause={guestCanPause}
          roomCode={roomCode}
          updateCallback={() => {
            getRoomDetails();
            setShowSettings(false);
          }}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowSettings(false)}
          sx={{ textTransform: 'none', fontWeight: 'bold', color: 'black' }} // Lowercase, bold, black text
        >
          close
        </Button>
      </Grid>
    </Grid>
  );

  const renderSettingsButton = () => (
    <Grid item xs={12} align="center">
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowSettings(true)}
        sx={{ textTransform: 'none', fontWeight: 'bold', color: 'black' }} // Lowercase, bold, black text
      >
        settings
      </Button>
    </Grid>
  );

  return showSettings ? (
    renderSettings()
  ) : (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center" sx={{ mb: 4 }}> {/* Add margin bottom */}
        <Typography
          variant="h3"
          component="h1"
          className="gradient-text"
          sx={{ fontSize: '3rem', fontWeight: 'bold' }} // Larger, bold, gradient text
        >
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12}> {/* Add Grid item for MusicPlayer to manage spacing */}
        <MusicPlayer {...song} />
      </Grid>
      {isHost && renderSettingsButton()}
      <Grid item xs={12} align="center" sx={{ mt: 2 }}> {/* Add margin top */}
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
          sx={{ textTransform: 'none', fontWeight: 'bold', color: 'black' }} // Lowercase, bold, black text
        >
          leave room
        </Button>
      </Grid>
    </Grid>
  );
};

export default Room;
