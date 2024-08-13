import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const RoomJoinPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
  };

  const roomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${roomCode}`);
        } else {
          setError("Room not found.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container spacing={2} /* Increased spacing for cleaner layout */>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h1" className="gradient-text" sx={{ fontSize: '3rem', fontWeight: 'bold' }} // Bigger and bolded header
        >
          Join Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={Boolean(error)}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={error}
          variant="outlined"
          onChange={handleTextFieldChange}
          sx={{
            input: { color: 'white' }, // Ensures text is white
            label: { color: 'white' }, // Ensures label text is white
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' }, // Changes the border color to white
              '&:hover fieldset': {
                borderColor: 'white', // Maintain white border on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white', // White border on focus
              },
            },
            '& .MuiInputLabel-root': { // Label color when not focused
              color: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiInputLabel-root.Mui-focused': { // Label color when focused
              color: 'white',
            },
            '& .Mui-error': { // Styles for error state
              '& fieldset': {
                borderColor: 'red', // Red border when there's an error
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={roomButtonPressed}
          sx={{ textTransform: 'none', fontWeight: 'bold', color: 'black' }} // Black text, lowercase, bold
        >
          enter room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/"
          sx={{ textTransform: 'none', fontWeight: 'bold', color: 'black' }} // Black text, lowercase, bold
        >
          back
        </Button>
      </Grid>
    </Grid>
  );
};

export default RoomJoinPage;

