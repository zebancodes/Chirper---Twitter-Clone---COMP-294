import * as React from "react";
import { Routes, Route, useMatch } from "react-router-dom";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";

import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import Feed from "./pages/feed/feed";
import Search from "./pages/search/search";

import { Box } from "@mui/material";

const App = () => {
  const isHome = useMatch("/");
  const isLogin = useMatch("/login");
  const isSignup = useMatch("/signup");

  return (
    <>
      {/* Hide header on home, login and signup pages */}
      {isHome || isLogin || isSignup ? null : <Header />}

      {/* Wrap all routes in a Box so we can set a bottom margin for the footer */}
      <Box sx={{ mb: 8 }}>
        <Routes>
          {/* Unauthenticated routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Authenticated routes */}
          {sessionStorage.getItem("username") !== null &&
          sessionStorage.getItem("username") !== "" ? (
            <>
              <Route path="/@:username" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/search" element={<Search />} />
            </>
          ) : null}
        </Routes>
      </Box>

      <Footer />
    </>
  );
};

export default App;
