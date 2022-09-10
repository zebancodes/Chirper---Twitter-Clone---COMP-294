import * as React from "react";

import { Button, Box, Grid, Typography } from "@mui/material";

import { Link } from "react-router-dom";

import logo from "../../assets/chirper-logo.png";
import splash from "../../assets/splash.jpg";

const Home = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Grid item xs={7} sx={{ height: "98vh" }}>
          <Box
            component="img"
            sx={{
              height: "98vh",
              width: "auto",
            }}
            alt="People on phones"
            src={splash}
          />
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            height: "98vh",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              height: 70,
              width: 70,
              mb: 12,
            }}
            alt="Chirper Logo"
            src={logo}
          />

          <Typography variant="h3" sx={{ mb: 5 }}>
            Happening now
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Time to be social, time to Chirp.
          </Typography>

          {/* Sign up section */}
          <Box>
            <Button
              variant="contained"
              sx={{ width: "30vw" }}
              component={Link}
              to="/signup"
            >
              Sign up with email
            </Button>
          </Box>

          {/* Sign in section */}
          <Box sx={{ mt: 8 }}>
            <Typography sx={{ mb: 1 }}>Already have an account?</Typography>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ width: "30vw" }}
              component={Link}
              to="/login"
            >
              Sign in
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
