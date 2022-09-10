import { render, screen } from "@testing-library/react";
import MakeChirpModal from "../components/makeChirpModal/makeChirpModal";

test("renders make chirp modal with appropriate text", () => {
  sessionStorage.setItem("fullname", "Evan Horsley"); //To ensrue avatar renders correctly

  render(<MakeChirpModal open={true} />);

  const avatar = screen.getByText("EH");
  expect(avatar).toBeInTheDocument();

  const chirpTextPlaceholder = screen.getByPlaceholderText("What's happening?");
  expect(chirpTextPlaceholder).toBeInTheDocument();

  const count = screen.getByText("0 / 1000");
  expect(count).toBeInTheDocument();

  const chirpButton = screen.getByRole("button", {
    name: /Chirp/i,
  });
  expect(chirpButton).toBeInTheDocument();
});
