import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Button,
  Grid,
  Typography,
  CardHeader,
  TextField,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  ListItem,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";

import Chirp from "../../components/chirp/chirp";

import { useParams } from "react-router-dom";
import {
  getProfile,
  followUser,
  unFollowUser,
  editProfile,
  getFollowing,
  getFollowers,
} from "../../api/user";
import Edit from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Close from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  let urlParams = useParams();
  let usernameFromUrl = urlParams.username;

  const currentUser = sessionStorage.getItem("username");

  const [id, setId] = useState();
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const [followingCount, setFollowingCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [feed, setFeed] = useState(null);
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const [isValidUser, setIsValidUser] = useState(true);

  useEffect(() => {
    getProfile(usernameFromUrl)
      .then((data) => {
        setIsValidUser(true);
        setId(data.data.profile._id);
        setUsername(data.data.profile.username);
        setFullname(data.data.profile.fullname);
        setBio(data.data.profile.biography);
        setFollowingCount(data.data.followingCount || 0);
        setFollowerCount(data.data.followerCount || 0);

        const sorted = data.data.feed.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.created_at) - new Date(a.created_at);
        });

        setFeed(sorted);
        setIsFollowingUser(data.data.isFollowing);

        // Set editing fields
        setEditingFullname(data.data.profile.fullname);
        setEditingBio(data.data.profile.biography);
      })
      .catch((error) => {
        // The only error we should get here is a 404 not found
        setIsValidUser(false);
      });
  }, []);

  const handleFollow = (e) => {
    e.preventDefault();
    followUser(usernameFromUrl).then((data) => {
      setIsFollowingUser(true);
      window.location.reload();
    });
  };

  const handleUnfollow = (e) => {
    e.preventDefault();
    unFollowUser(usernameFromUrl).then((data) => {
      setIsFollowingUser(false);
      window.location.reload();
    });
  };

  const handleHovering = (e) => {
    if (e.type === "mouseover") {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  };

  // Profile editing stuff
  const [editingFullname, setEditingFullname] = useState("");
  const [editingBio, setEditingBio] = useState("");

  const handleFullname = (e) => {
    setEditingFullname(e.target.value);
  };

  const handleBio = (e) => {
    setEditingBio(e.target.value);
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingFullname(fullname);
    setEditingBio(bio);
  };

  const handleSave = () => {
    if (editingFullname !== "" && editingBio !== "") {
      const profile = {
        fullname: editingFullname,
        biography: editingBio,
      };

      editProfile(profile).then((data) => {
        sessionStorage.setItem("fullname", editingFullname);
        window.location.reload(); //Hacky way to reload profile
      });
    }
  };

  // Stuff for viewing followers and following list
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);

  const [following, setFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);

  const handleShowFollowing = () => {
    getFollowing(id).then((data) => {
      setFollowing(data.data);
      setShowFollowingModal(true);
    });
  };

  const handleShowFollowers = () => {
    getFollowers(id).then((data) => {
      setFollowers(data.data);
      setShowFollowersModal(true);
    });
    setShowFollowersModal(true);
  };

  const closeShowFollowModal = () => {
    setShowFollowingModal(false);
    setShowFollowersModal(false);
  };

  return (
    <>
      {isValidUser ? (
        <Grid
          container
          spacing={2}
          align="center"
          sx={{ flexGrow: 1, overflow: "hidden", mt: 2 }}
        >
          <Grid item xs={12}>
            <Card
              variant="outlined"
              sx={{
                boxShadow: 3,
                width: { sm: "80vw", md: "80vw", lg: "50vw" },
              }}
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    {isEditing ? (
                      <TextField
                        label="Full Name"
                        value={editingFullname}
                        onChange={handleFullname}
                        sx={{ mb: 2 }}
                        required
                        error={editingFullname === ""}
                        helperText={
                          editingFullname === "" ? "Full Name is required" : ""
                        }
                      ></TextField>
                    ) : (
                      <Typography
                        variant="h5"
                        align="left"
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {fullname}
                      </Typography>
                    )}
                    <Typography variant="subtitle1" align="left">
                      @{usernameFromUrl}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {isEditing ? (
                      <TextField
                        label="Biography"
                        value={editingBio}
                        onChange={handleBio}
                        sx={{ mb: 2 }}
                        multiline
                        rows={4}
                        fullWidth
                        required
                        error={editingBio === ""}
                        helperText={
                          editingBio === "" ? "Biography is required" : ""
                        }
                      ></TextField>
                    ) : (
                      <Typography variant="body1" align="center">
                        {bio}
                      </Typography>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={1.5}
                    onClick={handleShowFollowing}
                    sx={{ cursor: "pointer" }}
                  >
                    <Typography
                      variant="body1"
                      align="center"
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {followingCount}
                    </Typography>
                    <Typography variant="body1" align="center">
                      Following
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1.5}
                    onClick={handleShowFollowers}
                    sx={{ cursor: "pointer" }}
                  >
                    <Typography
                      variant="body1"
                      align="center"
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {followerCount}
                    </Typography>
                    <Typography variant="body1" align="center">
                      Followers
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container align="right" sx={{ mt: 1 }}>
                  <Grid item xs={9}>
                    {/* Empty grid item */}
                  </Grid>
                  <Grid item xs={3}>
                    {currentUser !== usernameFromUrl ? (
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={
                          isFollowingUser ? handleUnfollow : handleFollow
                        }
                        onMouseOver={handleHovering}
                        onMouseLeave={handleHovering}
                      >
                        {isFollowingUser
                          ? isHovering
                            ? "Unfollow"
                            : "Following"
                          : "Follow"}
                      </Button>
                    ) : isEditing ? (
                      <>
                        <Button
                          size="small"
                          color="secondary"
                          sx={{ mr: 1 }}
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="small"
                          sx={{ mr: 1 }}
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        sx={{ mr: 1 }}
                        startIcon={<Edit />}
                        onClick={handleEditing}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            {feed !== null && feed.length > 0 ? (
              feed.map(function (chirp) {
                return (
                  <Chirp
                    id={chirp._id}
                    name={chirp.user_id.fullname}
                    username={chirp.user_id.username}
                    date={chirp.created_at}
                    text={chirp.text}
                  />
                );
              })
            ) : (
              <Typography>You haven't made any Chirps!</Typography>
            )}
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid
            container
            spacing={2}
            align="center"
            sx={{ flexGrow: 1, overflow: "hidden", mt: 2 }}
          >
            <Grid item xs={12}>
              <Typography>Error: Invalid User</Typography>
            </Grid>
          </Grid>
        </>
      )}

      {showFollowingModal || showFollowersModal ? (
        <Dialog open={true}>
          <DialogTitle>
            {showFollowingModal ? `Following` : `Followers`}

            <IconButton
              aria-label="close"
              onClick={closeShowFollowModal}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ width: "15vw" }}>
            <List dividers>
              {showFollowingModal ? (
                following !== null && following.length > 0 ? (
                  following.map(function (user) {
                    return (
                      <ListItem>
                        <ListItemButton
                          onClick={() => {
                            navigate(`/@${user.user_id_following.username}`, {
                              replace: true,
                            });
                            window.location.reload();
                          }}
                        >
                          <ListItemText
                            primary={user.user_id_following.fullname}
                            secondary={user.user_id_following.username}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })
                ) : (
                  <Typography>This user is not following anyone.</Typography>
                )
              ) : followers !== null && followers.length > 0 ? (
                followers.map(function (user) {
                  return (
                    <ListItem>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/@${user.user_id.username}`, {
                            replace: true,
                          });
                          window.location.reload();
                        }}
                      >
                        <ListItemText
                          primary={user.user_id.fullname}
                          secondary={user.user_id.username}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })
              ) : (
                <Typography>This user does not have any followers.</Typography>
              )}
            </List>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
};
export default Profile;
