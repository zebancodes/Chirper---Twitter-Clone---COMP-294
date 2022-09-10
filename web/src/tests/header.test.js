import { render, screen } from "@testing-library/react";
import Header from "../components/header/header";

import { BrowserRouter } from "react-router-dom";

test("renders header with correct avatar", () => {
  sessionStorage.setItem("fullname", "Evan Horsley"); //To ensrue avatar renders correctly

  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  const avatar = screen.getByText("EH");
  expect(avatar).toBeInTheDocument();

  const homeButton = screen.getByRole("link", {
    name: /Home/i,
  });
  expect(homeButton).toBeInTheDocument();

  const chirpButton = screen.getByRole("button", {
    name: /Chirp/i,
  });
  expect(chirpButton).toBeInTheDocument();
});
