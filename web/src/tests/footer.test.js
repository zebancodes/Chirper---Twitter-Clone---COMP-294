import { render, screen } from "@testing-library/react";
import Footer from "../components/footer/footer";

test("renders footer", () => {
  render(<Footer />);

  const footer = screen.getByText("© 2022 Chirper. All rights reserved.");
  expect(footer).toBeInTheDocument();
});
