import React, { useEffect, useState } from "react";

import { Grid, Typography } from "@mui/material";

import Chirp from "../../components/chirp/chirp";

import { getFeed } from "../../api/user";

const Feed = () => {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    getFeed().then((data) => {
      // We sort the array here to ensure it is always in chronological order, with most recent at the top of the feed
      // In a later version, it could be possible to allow the user to change the sorting somehow
      const sorted = data.data.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.created_at) - new Date(a.created_at);
      });

      setFeed(sorted);
    });
  }, []);

  return (
    <>
      <Grid
        container
        spacing={2}
        align="center"
        sx={{ flexGrow: 1, overflow: "hidden", mt: 2 }}
      >
        <Grid item xs={12}>
          {/* If feed items, display them, if not, then display message */}
          {
            feed !== null && feed.length > 0 ? (
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
              <Typography>
                No Chirps found in feed. Try following some users or make a
                Chirp!
              </Typography>
            ) //TODO: Add in suggested users to follow?
          }
        </Grid>
      </Grid>
    </>
  );
};

export default Feed;
