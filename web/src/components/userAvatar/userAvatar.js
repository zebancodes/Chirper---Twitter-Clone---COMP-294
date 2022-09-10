import React, { useState, useEffect } from "react";

import { Avatar } from "@mui/material";

const UserAvatar = (props) => {
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const fullName = props.fullName
      ? props.fullName
      : sessionStorage.getItem("fullname");
    setInitials(fullName.split(" ").map((n) => n[0]));
  }, []);

  return (
    <>
      <Avatar>{initials}</Avatar>
    </>
  );
};

export default UserAvatar;
