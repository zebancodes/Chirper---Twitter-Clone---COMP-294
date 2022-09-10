import { render, screen } from "@testing-library/react";
import Login from "../pages/login/login";

import { BrowserRouter } from "react-router-dom";

test("renders username and password", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const username = screen.getByPlaceholderText("Username");
  const password = screen.getByPlaceholderText("Password");

  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});

test("renders login button", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const loginButton = screen.getByText("Login");
  expect(loginButton).toBeInTheDocument();
});
