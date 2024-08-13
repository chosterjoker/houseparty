import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Collapse,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const CreateRoomPage = ({
  votesToSkip = 2,
  guestCanPause = true,
  update = false,
  roomCode = null,
  updateCallback = () => {},
}) => {
  const navigate = useNavigate();
  const [votes, setVotes] = useState(votesToSkip);
  const [canPause, setCanPause] = useState(guestCanPause);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleVotesChange = (e) => {
    setVotes(Number(e.target.value));
  };

  const handleGuestCanPauseChange = (e) => {
    setCanPause(e.target.value === "true");
  };

  const handleRoomButtonPressed = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votes,
        guest_can_pause: canPause,
      }),
    };
    try {
      const response = await fetch("/api/create-room", requestOptions);
      const data = await response.json();
      navigate("/room/" + data.code);
    } catch (error) {
      console.error("Error creating room:", error);
      setErrorMsg("Failed to create room.");
    }
  };

  const handleUpdateButtonPressed = async () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votes,
        guest_can_pause: canPause,
        code: roomCode,
      }),
    };
    try {
      const response = await fetch("/api/update-room", requestOptions);
      if (response.ok) {
        setSuccessMsg("Room updated successfully!");
        updateCallback();
      } else {
        setErrorMsg("Error updating room...");
      }
    } catch (error) {
      console.error("Error updating room:", error);
      setErrorMsg("Failed to update room.");
    }
  };

  const renderCreateButtons = () => (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{ mt: 4 }} // Add top margin to position the buttons lower
    >
      <Grid item align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
          sx={{ textTransform: 'none', fontWeight: 'bold', color: 'black' }}
        >
          create room
        </Button>
      </Grid>
      <Grid item align="center">
        <Button
          color="secondary"
          variant="contained"
          to="/"
          component={Link}
          sx={{ textTransform: 'none', fontWeight: 'bold', color: 'black' }}
        >
          back
        </Button>
      </Grid>
    </Grid>
  );
  
  const renderUpdateButtons = () => (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{ mt: 4}} // Add top margin for consistency with create buttons
    >
      <Grid item align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleUpdateButtonPressed}
          sx={{ textTransform: 'none', fontWeight: 'bold', color: 'black' }}
        >
          update room
        </Button>
      </Grid>
    </Grid>
  );
  

  const title = update ? "Update Room" : "Create A Room";

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Collapse in={errorMsg !== "" || successMsg !== ""}>
          {successMsg !== "" ? (
            <Alert severity="success" onClose={() => setSuccessMsg("")}>
              {successMsg}
            </Alert>
          ) : (
            <Alert severity="error" onClose={() => setErrorMsg("")}>
              {errorMsg}
            </Alert>
          )}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography
          component="h1"
          variant="h3"
          className="gradient-text"
          sx={{ fontSize: '3rem', fontWeight: 'bold' }}
        >
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset" sx={{ mt: 2, mb: 2 }}>
          <FormHelperText sx={{ color: 'white' }}>
            <div align="center">Change Guest Ability</div>
          </FormHelperText>
          <RadioGroup
            row
            value={canPause.toString()}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="end"
              sx={{ color: 'white' }} // Ensure label text is white
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="end"
              sx={{ color: 'white' }} // Ensure label text is white
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl sx={{ minWidth: 120 }}>
          <TextField
            required
            type="number"
            onChange={handleVotesChange}
            value={votes}
            inputProps={{
              min: 1,
              style: { textAlign: "center", color: 'white' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'white',
              },
            }}
          />
          <FormHelperText sx={{ color: 'white' }}>
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      {update ? renderUpdateButtons() : renderCreateButtons()}
    </Grid>
  );
};

export default CreateRoomPage;
