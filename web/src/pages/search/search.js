import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Button,
  Grid,
  Typography,
  TextField,
} from "@mui/material";

import { searchForUsers } from "../../api/user";

import { Link } from "react-router-dom";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    searchForUsers(searchText).then((data) => {
      setHasSearched(true);
      setResults(data.data);
    });
  };

  return (
    <>
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
              mb: 2,
            }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <TextField
                    label="Search for users"
                    type="search"
                    fullWidth
                    onChange={handleSearchTextChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  {/* Button did not want to center itself, mt: 1 helped but not ideal */}
                  <Button
                    sx={{ mt: 1 }}
                    variant="contained"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          {results !== null && results.length > 0 ? (
            results.map(function (user) {
              return (
                <Grid item xs={12}>
                  <Card
                    variant="outlined"
                    sx={{
                      boxShadow: 3,
                      width: { sm: "80vw", md: "80vw", lg: "50vw" },
                      mb: 2,
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <Typography
                            variant="h5"
                            align="left"
                            sx={{
                              fontWeight: 700,
                            }}
                          >
                            <Link
                              to={`/@${user.username}`}
                              style={{ textDecoration: "none" }}
                            >
                              {user.fullname}
                            </Link>
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            align="left"
                            sx={
                              {
                                // fontWeight: 500
                              }
                            }
                          >
                            <Link
                              to={`/@${user.username}`}
                              style={{ textDecoration: "none" }}
                            >
                              @{user.username}
                            </Link>
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body1"
                            align="center"
                            sx={
                              {
                                // fontWeight: 500
                              }
                            }
                          >
                            {user.biography}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          ) : hasSearched ? (
            <Typography>No users found matching search criteria.</Typography>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};
export default Search;
