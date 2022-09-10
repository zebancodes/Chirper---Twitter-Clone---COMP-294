import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "auth",
});

export async function login(username, password) {
  return axiosClient.post("/login", { username, password });
}

export async function signup(fullname, username, email, password, biography) {
  return await axiosClient.post("/signup", {
    fullname,
    username,
    email,
    password,
    biography,
  });
}
