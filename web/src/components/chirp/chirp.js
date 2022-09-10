import React, { useEffect, useState } from "react";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Button,
  Box,
  Grid,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import UserAvatar from "../userAvatar/userAvatar";

import { editChirp, deleteChirp } from "../../api/chirp";
import { Link } from "react-router-dom";

const Dropdown = (props) => {
  useEffect(() => {
    setAnchorEl(props.anchor);
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    props.closeDropdown();
  };

  const handleEdit = () => {
    props.handleIsEditing();
    handleClose();
  };

  const handleDelete = () => {
    deleteChirp(props.id).then((data) => {
      // TODO: This is a super hacky way to refresh the feed. Fix this
      window.location.reload();
    });
    handleClose();
  };

  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleEdit}>
          {/* <EditIcon /> */}
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          {/* <DeleteIcon /> */}
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

const Chirp = (props) => {
  useEffect(() => {
    setEditedText(props.text);
  }, []);

  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownAnchor, setDropdownAnchor] = useState(null);

  const handleDropdown = (e) => {
    setShowDropdown(true);

    const anchor = e.currentTarget;
    setDropdownAnchor(anchor);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
    setDropdownAnchor(null);
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleIsEditing = () => {
    setIsEditing(true);
  };

  const handleIsNotEditing = () => {
    setIsEditing(false);
  };

  const [editedText, setEditedText] = useState("");

  const handleSaveEditedChirp = () => {
    editChirp(props.id, editedText).then((data) => {
      setIsEditing(false);

      // Currently, we dont need to reload the feed because the change has already been made on the backend,
      // and then we update the frontend to reflect the same change.
    });
  };

  return (
    <>
      {showDropdown ? (
        <Dropdown
          id={props.id}
          anchor={dropdownAnchor}
          closeDropdown={closeDropdown}
          handleIsEditing={handleIsEditing}
          handleIsNotEditing={handleIsNotEditing}
        />
      ) : null}
      <Card
        variant="outlined"
        sx={{
          mb: 2,
          boxShadow: 3,
          width: { sm: "80vw", md: "80vw", lg: "50vw" },
        }}
      >
        <CardHeader
          avatar={
            <Link to={`/@${props.username}`} style={{ textDecoration: "none" }}>
              <UserAvatar fullName={props.name} />
            </Link>
          }
          action={
            isEditing ? (
              <>
                <Button
                  color="secondary"
                  sx={{ mr: 1 }}
                  onClick={handleIsNotEditing}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleSaveEditedChirp}
                >
                  Save
                </Button>
              </>
            ) : sessionStorage.getItem("username") !== null &&
              sessionStorage.getItem("username") === props.username ? (
              <IconButton aria-label="settings" onClick={handleDropdown}>
                <MoreVertIcon />
              </IconButton>
            ) : null
          }
          title={
            <Link to={`/@${props.username}`} style={{ textDecoration: "none" }}>
              {props.name} • {props.username}
            </Link>
          }
          subheader={new Date(props.date).toLocaleString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        />

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {isEditing ? (
                <TextField
                  placeholder="What's happening?"
                  variant="outlined"
                  value={editedText}
                  fullWidth
                  multiline
                  maxRows={4}
                  onChange={(e) => {
                    setEditedText(e.target.value);
                  }}
                />
              ) : (
                <Typography
                  variant="subtitle1"
                  align="left"
                  sx={{
                    fontSize: 15,
                  }}
                >
                  {editedText}
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Chirp;
