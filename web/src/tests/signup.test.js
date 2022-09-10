import { render, screen } from "@testing-library/react";
import SignUp from "../pages/signup/signup";

import { BrowserRouter } from "react-router-dom";

test("renders signup component", () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

  const nameInput = screen.getByPlaceholderText("Full Name");
  expect(nameInput).toBeInTheDocument();

  const usernameInput = screen.getByPlaceholderText("Username");
  expect(usernameInput).toBeInTheDocument();

  const emailAddressInput = screen.getByPlaceholderText("Email Address");
  expect(emailAddressInput).toBeInTheDocument();

  const passwordInput = screen.getByPlaceholderText("Password");
  expect(passwordInput).toBeInTheDocument();

  const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
  expect(confirmPasswordInput).toBeInTheDocument();

  const signUpButton = screen.getByRole("button", {
    name: /Sign Up/i,
  });
  expect(signUpButton).toBeInTheDocument();

  const signInLink = screen.getByText("Sign In");
  expect(signInLink).toBeInTheDocument();
});
