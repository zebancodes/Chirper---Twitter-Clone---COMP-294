import { render, screen } from "@testing-library/react";
import Search from "../pages/search/search";

test("renders feed", () => {
  render(<Search />);

  const text = screen.getByLabelText("Search for users");
  expect(text).toBeInTheDocument();

  const searchButton = screen.getByRole("button", {
    name: /Search/i,
  });
  expect(searchButton).toBeInTheDocument();
});
