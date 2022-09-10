import React, { useState, useEffect } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/chirper-logo.png";

import MakeChirpModal from "../makeChirpModal/makeChirpModal";
import UserAvatar from "../userAvatar/userAvatar";

const Header = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  // State stuff for make chirp modal
  const [chirpModalOpen, setChirpModalOpen] = useState(false);

  const handleChirpModalOpen = () => {
    setChirpModalOpen(true);
  };

  const handleChirpModalClose = () => {
    setChirpModalOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component="img"
              sx={{
                height: 50,
                width: 50,
                display: { xs: "none", md: "flex" },
                mr: 1,
              }}
              src={logo}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Chirper
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem
                  key={"home"}
                  onClick={() => {
                    navigate("/feed", { replace: true });
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem
                  key={"search"}
                  onClick={() => {
                    navigate("/search", { replace: true });
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">Searcg</Typography>
                </MenuItem>
                <MenuItem
                  key={"chirp"}
                  onClick={() => {
                    handleChirpModalOpen();
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">Chirp</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box
              component="img"
              sx={{
                height: 50,
                width: 50,
                display: { xs: "flex", md: "none" },
                mr: 1,
              }}
              src={logo}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/feed"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Chirper
            </Typography>

            {/* Larger display */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key={"home"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                component={Link}
                to="/feed"
              >
                Home
              </Button>

              <Button
                key={"search"}
                sx={{ my: 2, color: "white", display: "block" }}
                component={Link}
                to="/search"
              >
                Search
              </Button>

              <Button
                key={"chirp"}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleChirpModalOpen}
              >
                Chirp
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <UserAvatar />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={"profile"} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => {
                      navigate(`/@${sessionStorage.getItem("username")}`, {
                        replace: true,
                      });
                      window.location.reload();
                    }}
                  >
                    View Profile
                  </Typography>
                </MenuItem>
                <MenuItem
                  key={"signout"}
                  onClick={() => {
                    handleCloseUserMenu();
                    handleSignOut();
                  }}
                >
                  <Typography textAlign="center">Sign Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <MakeChirpModal
        open={chirpModalOpen}
        handleOpen={handleChirpModalOpen}
        handleClose={handleChirpModalClose}
      />
    </>
  );
};
export default Header;
