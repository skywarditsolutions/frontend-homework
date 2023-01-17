import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders weather", () => {
  render(<App />);
  const headerElement = screen.getByText(/Weather/i);
  console.log("Header ", headerElement);
  expect(headerElement).toBeInTheDocument();
});
