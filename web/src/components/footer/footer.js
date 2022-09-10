import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BottomNavigation from "@mui/material/BottomNavigation";
import CopyrightIcon from "@mui/icons-material/Copyright";
import logo from "../../assets/chirper-logo.png";
import Typography from "@mui/material/Typography";
import { fontStyle } from "@mui/system";

const style = {
  backgroundColor: "#f86c1c",
  borderTop: "1px solid #e0e0e0",
  textAlign: "center",
  padding: "10px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "30px",
  width: "100%",
};

//Returns Footer with copyright and logo, and monospace
const Footer = () => {
  return (
    <>
      <Box style={style}>© 2022 Chirper. All rights reserved.</Box>
    </>
  );
};

export default Footer;
