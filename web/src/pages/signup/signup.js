import React, { useState } from "react";

import {
  FormControl,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "../../api/auth";

import splash from "../../assets/splash.jpg";

const SignUp = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [biography, setBiography] = useState("");

  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleBiographyChange = (e) => {
    setBiography(e.target.value);
  };

  const [hasFormError, setHasFormError] = useState(false);

  const [signupErrorMessage, setSignupErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      fullname === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm === "" ||
      password !== passwordConfirm
    ) {
      setHasFormError(true);
    } else {
      signup(fullname, username, email, password, biography)
        .then((data) => {
          navigate("/login", { replace: true }); //Redirect the user to the login page
        })
        .catch((error) => {
          setSignupErrorMessage(error?.response?.data?.error);
        });
    }
  };

  return (
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
          Sign Up
        </Typography>

        <FormControl sx={{ width: "40vw" }}>
          {/* autoComplete="new-password" is a super hacky way to disable autocomplete, but it works lol */}
          {/* https://stackoverflow.com/a/57279509/11261849 */}
          <TextField
            autoComplete="new-password"
            sx={{ mb: 2 }}
            placeholder="Full Name"
            required
            value={fullname}
            onChange={handleFullnameChange}
            error={hasFormError && fullname === ""}
            helperText={
              hasFormError && fullname === "" ? "Full name is required" : ""
            }
          />
          <TextField
            autoComplete="new-password"
            sx={{ mb: 2 }}
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
            autoComplete="new-password"
            sx={{ mb: 2 }}
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={handleEmailChange}
            error={hasFormError && email === ""}
            helperText={hasFormError && email === "" ? "Email is required" : ""}
          />
          <TextField
            autoComplete="new-password"
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
          <TextField
            autoComplete="new-password"
            sx={{ mb: 2 }}
            type="password"
            placeholder="Confirm Password"
            required
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            error={hasFormError && passwordConfirm === ""}
            helperText={
              hasFormError && password !== passwordConfirm
                ? "Passwords do not match"
                : ""
            }
          />

          <TextField
            autoComplete="new-password"
            sx={{ mb: 2 }}
            placeholder="Biography"
            value={biography}
            onChange={handleBiographyChange}
            multiline
            rows={2}
          />

          {signupErrorMessage ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {signupErrorMessage}
            </Alert>
          ) : null}

          <Button variant="contained" onClick={handleSubmit}>
            Sign Up
          </Button>

          <Typography sx={{ mt: 3 }}>Already registered?</Typography>
          <Link to="/login">Sign In</Link>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SignUp;
