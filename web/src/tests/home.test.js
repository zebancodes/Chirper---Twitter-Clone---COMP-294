import { render, screen } from "@testing-library/react";
import Home from "../pages/home/home";

import { BrowserRouter } from "react-router-dom";

test("", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const text = screen.getByText("Happening now");
  expect(text).toBeInTheDocument();
});

test("", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const text = screen.getByText("Time to be social, time to Chirp.");
  expect(text).toBeInTheDocument();
});

test("", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const signUpButton = screen.getByText("Sign up with email");
  expect(signUpButton).toBeInTheDocument();
});

test("", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const text = screen.getByText("Already have an account?");
  expect(text).toBeInTheDocument();
});

test("", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const signInButton = screen.getByText("Sign in");
  expect(signInButton).toBeInTheDocument();
});
