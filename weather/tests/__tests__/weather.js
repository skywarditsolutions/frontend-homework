import * as weather from "../../components/Weather";
jest.mock("../request");

// The assertion for a promise must be returned.
it("works with promises", () => {
  expect.assertions(1);
  return weather.request().then((data) => expect(data).toContain("New_York"));
});
