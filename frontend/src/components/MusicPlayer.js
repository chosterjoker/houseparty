import React from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
  CardContent,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const MusicPlayer = ({
  title,
  artist,
  image_url,
  is_playing,
  time,
  duration,
  votes,
  votes_required,
  onSongAction,
}) => {
  const songProgress = (time / duration) * 100;

  const handleSongAction = (action) => {
    const requestOptions = {
      method: action === "skip" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`/spotify/${action}`, requestOptions)
      .then(() => {
        if (onSongAction) onSongAction(action);
      })
      .catch((error) => console.error(`Error performing ${action}:`, error));
  };

  return (
    <Card sx={{ display: 'flex', boxShadow: 3, borderRadius: 2, overflow: 'hidden', maxWidth: 600, mx: 'auto' }}>
      <Grid container>
        <Grid item xs={4} sx={{ overflow: 'hidden' }}>
          <img
            src={image_url}
            alt="Album cover"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Grid>
        <Grid item xs={8}>
          <CardContent sx={{ padding: 2 }}>
            <Typography component="h5" variant="h5" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1" sx={{ mb: 1 }}>
              {artist}
            </Typography>
            <div>
              <IconButton
                onClick={() => handleSongAction(is_playing ? "pause" : "play")}
                sx={{ color: 'primary.main' }} // Accent color
              >
                {is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton
                onClick={() => handleSongAction("skip")}
                sx={{ color: 'secondary.main', ml: 1 }} // Accent color with margin
              >
                {votes} / {votes_required}
                <SkipNextIcon />
              </IconButton>
            </div>
          </CardContent>
          <LinearProgress
            variant="determinate"
            value={songProgress}
            sx={{ height: 5, mt: 1, borderRadius: 5, backgroundColor: 'grey.300', '& .MuiLinearProgress-bar': { backgroundColor: 'primary.main' } }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default MusicPlayer;

