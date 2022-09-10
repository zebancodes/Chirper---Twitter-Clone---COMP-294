import { render, screen } from "@testing-library/react";
import Feed from "../pages/feed/feed";

test("renders feed", () => {
  render(<Feed />);

  const text = screen.getByText(
    "No Chirps found in feed. Try following some users or make a Chirp!"
  );
  expect(text).toBeInTheDocument();
});
