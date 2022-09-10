import { render, screen } from "@testing-library/react";
import Profile from "../pages/profile/profile";

import { BrowserRouter } from "react-router-dom";

//create test for showing the profile page
test("renders profile component", () => {
  render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>
  );

  const following = screen.getByText("Following");
  expect(following).toBeInTheDocument();

  const followers = screen.getByText("Followers");
  expect(followers).toBeInTheDocument();

  const noChirps = screen.getByText("You haven't made any Chirps!");
  expect(noChirps).toBeInTheDocument();
});
