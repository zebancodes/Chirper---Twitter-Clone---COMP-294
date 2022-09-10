import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "chirp",
});

export async function makeChirp(chirpText) {
  try {
    const username = sessionStorage.getItem("username");

    return await axiosClient.post(
      "",
      { text: chirpText },
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

//Integrate Edit Chirp logic with API
export async function editChirp(chirpId, chirpText) {
  try {
    const username = sessionStorage.getItem("username");

    return await axiosClient.post(
      `/edit`,
      { text: chirpText, id: chirpId },
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

//Integrate Delete Chirp logic with API
export async function deleteChirp(chirpId) {
  try {
    const username = sessionStorage.getItem("username");

    // TODO: I know this is posting with no data, but need to refactor later
    return await axiosClient.post(
      `/${chirpId}`,
      {},
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

//Integrate Get Chirp Logic with API
export async function getChirp(id) {
  try {
    const username = sessionStorage.getItem("username");

    return await axiosClient.get(`/chirp/${id}`, {
      headers: {
        Authorization: username,
      },
    });
  } catch (ex) {
    console.log(ex);
  }
}
