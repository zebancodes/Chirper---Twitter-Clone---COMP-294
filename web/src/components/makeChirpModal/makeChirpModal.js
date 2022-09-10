import React, { useState } from "react";

import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";

import UserAvatar from "../userAvatar/userAvatar";

import CloseIcon from "@mui/icons-material/Close";

import { makeChirp } from "../../api/chirp";

export default function MakeChirpModal(props) {
  const [chirpText, setChirpText] = useState("");
  const [count, setCount] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleChirp = (e) => {
    e.preventDefault();

    if (chirpText == "") {
      setHasError(true);
    } else {
      makeChirp(chirpText).then((data) => {
        props.handleClose(false);

        // TODO: This is a super hacky way to refresh the feed. Fix this
        window.location.reload();
      });
    }
  };

  const handleChirpChange = (e) => {
    if (e.length <= 1000) {
      setChirpText(e);
      setCount(e.length);
    }

    if (e.length > 0) {
      setHasError(false);
    }
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose} fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} align="center" sx={{ flexGrow: 1 }}>
            <Grid item xs={1}>
              <UserAvatar />
            </Grid>
            <Grid item xs={11}>
              <TextField
                multiline
                rows={4}
                placeholder="What's happening?"
                variant="outlined"
                fullWidth
                onChange={(e) => handleChirpChange(e.target.value)}
                value={chirpText}
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} align="center" sx={{ flexGrow: 1 }}>
            <Grid item xs={12}>
              {hasError ? (
                <Typography
                  variant="subtitle1"
                  align="left"
                  sx={{
                    ml: 6,
                    fontSize: 15,
                    color: "red",
                    fontWeight: 400,
                  }}
                >
                  Chirp text cannot be empty!
                </Typography>
              ) : null}
              <Typography
                variant="subtitle1"
                align="right"
                sx={{
                  fontSize: 15,
                  color: count === 1000 ? "red" : null, //Only make text red if character limit is reached
                  fontWeight: count === 1000 ? 600 : 400, //Only make text bold if character limit is reached
                }}
              >
                {count} / 1000
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleChirp}>
            Chirp
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
