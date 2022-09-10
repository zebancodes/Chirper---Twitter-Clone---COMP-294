import React, { useState } from "react";

import {
  FormControl,
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Alert,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { login } from "../../api/auth";

import splash from "../../assets/splash.jpg";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [hasFormError, setHasFormError] = useState(false);

  const [loginErrorMessage, setLoginErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setHasFormError(true);
    } else {
      login(username, password)
        .then((data) => {
          sessionStorage.setItem("username", data.data.username);
          sessionStorage.setItem("fullname", data.data.fullname);
          navigate("/feed", { replace: true });
        })
        .catch((error) => {
          setLoginErrorMessage(error?.response?.data?.error);
        });
    }
  };

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
          <Typography sx={{ mb: 2 }} variant="h5">
            Login
          </Typography>

          <FormControl sx={{ width: "40vw" }}>
            <TextField
              sx={{ mb: 2 }}
              type="email"
              placeholder="Username"
              required
              value={username}
              onChange={handleUsernameChange}
              error={hasFormError && username === ""}
              helperText={
                hasFormError && username === "" ? "Username is required" : ""
              }
            />
            <TextField
              sx={{ mb: 2 }}
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={handlePasswordChange}
              error={hasFormError && password === ""}
              helperText={
                hasFormError && password === "" ? "Password is required" : ""
              }
            />

            {loginErrorMessage ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {loginErrorMessage}
              </Alert>
            ) : null}

            <Button variant="contained" onClick={handleSubmit}>
              Log In
            </Button>

            <Typography sx={{ mt: 3 }}>Need an account?</Typography>
            <Link to="/signup">Sign Up</Link>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
