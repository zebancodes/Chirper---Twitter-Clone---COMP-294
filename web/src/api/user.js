import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Get Feed
export async function getFeed() {
  try {
    const username = sessionStorage.getItem("username");

    return axiosClient.get("/feed", {
      headers: {
        Authorization: username,
      },
    });
  } catch (ex) {
    console.log(ex);
  }
}

//Integrate get following logic with API
export async function getFollowing(userIdToGet) {
  try {
    const username = sessionStorage.getItem("username");

    return axiosClient.get(`/following/${userIdToGet}`, {
      headers: {
        Authorization: username,
      },
    });
  } catch (ex) {
    console.log(ex);
  }
}

//Get Followers API Integration
export async function getFollowers(userIdToGet) {
  const username = sessionStorage.getItem("username");

  return axiosClient.get(`/followers/${userIdToGet}`, {
    headers: {
      Authorization: username,
    },
  });
}

// Follower user
export async function followUser(usernameToFollow) {
  try {
    const username = sessionStorage.getItem("username");

    return axiosClient.post(
      "/follow",
      { usernameToFollow },
      {
        headers: {
          Authorization: username,
        },
      }
    );
  } catch (ex) {
    console.log(ex);
  }
}

// Unfollow user
export async function unFollowUser(usernameToUnfollow) {
  try {
    const username = sessionStorage.getItem("username");

    return axiosClient.post(
      "/unfollow",
      { usernameToUnfollow },
      {
        headers: {
          Authorization: username,
        },
      }
    );
  } catch (ex) {
    console.log(ex);
  }
}

//Integrate get profile logic w/ API
export async function getProfile(usernameForProfile) {
  try {
    const username = sessionStorage.getItem("username");

    return axiosClient.get(`/${usernameForProfile}`, {
      headers: {
        Authorization: username,
      },
    });
  } catch (ex) {
    console.log(ex);
  }
}

//Integrate Edit Profile Logic with API
export async function editProfile(profile) {
  try {
    const username = sessionStorage.getItem("username");

    return axiosClient.post(
      "/profile/save",
      { profile: profile },
      {
        headers: {
          Authorization: username,
        },
      }
    );
  } catch (ex) {
    console.log(ex);
  }
}

export async function searchForUsers(searchText) {
  try {
    const username = sessionStorage.getItem("username");

    return axiosClient.get(`/search/${searchText}`, {
      headers: {
        Authorization: username,
      },
    });
  } catch (ex) {
    console.log(ex);
  }
}
