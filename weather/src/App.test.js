import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders weather", () => {
  render(<App />);
  const headerElement = screen.getByText(/Current weather for New York/i);
  console.log("Header ", headerElement);
  expect(headerElement).toBeInTheDocument();
});
