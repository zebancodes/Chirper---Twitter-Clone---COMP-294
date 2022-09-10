import { render, screen } from "@testing-library/react";
import Chirp from "../components/chirp/chirp";

import { BrowserRouter } from "react-router-dom";

test("renders name and username", () => {
  sessionStorage.setItem("fullname", "Evan Horsley");

  render(
    <BrowserRouter>
      <Chirp name={"Evan Horsley"} username={"@evanhorsley"} />
    </BrowserRouter>
  );

  const text = screen.getByText("Evan Horsley • @evanhorsley");
  expect(text).toBeInTheDocument();
});

test("renders date", () => {
  sessionStorage.setItem("fullname", "Evan Horsley");
  render(
    <BrowserRouter>
      <Chirp date={"June 22, 2022"} />
    </BrowserRouter>
  );

  const text = screen.getByText("Wednesday, June 22, 2022, 12:00 AM"); //Testing that the date formatter works
  expect(text).toBeInTheDocument();
});

test("renders text", () => {
  sessionStorage.setItem("fullname", "Evan Horsley");
  render(
    <BrowserRouter>
      <Chirp text={"This is a React test!"} />
    </BrowserRouter>
  );

  const text = screen.getByText("This is a React test!");
  expect(text).toBeInTheDocument();
});
