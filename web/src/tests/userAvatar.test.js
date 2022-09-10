import { render, screen } from "@testing-library/react";
import UserAvatar from "../components/userAvatar/userAvatar";

test("renders avatar", () => {
  render(<UserAvatar fullName={"Michael Koons"} />);

  const text = screen.getByText("MK");
  expect(text).toBeInTheDocument();
});
