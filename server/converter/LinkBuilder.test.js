import { isURL } from "./LinkBuilder.js";

describe("Link Builder", () => {
  describe("Is Url third Party Test", () => {
    describe("Correct urls", () => {
      test("http url", () => {
        let url = "http://www.google.com";
        expect(isURL(url)).toEqual(true);
      });
      test("https url", () => {
        let url = "https://www.google.com";
        expect(isURL(url)).toEqual(true);
      });
      test("no http url", () => {
        let url = "www.google.com";
        expect(isURL(url)).toEqual(true);
      });
      test("not .com website ", () => {
        let url = "www.faa.gov";
        expect(isURL(url)).toEqual(true);
      });
    });
    describe("Bad urls", () => {
      test("url with spaces ", () => {
        let url = "this is not a url";
        expect(isURL(url)).toEqual(false);
      });
      test("just a word ", () => {
        let url = "word";
        expect(isURL(url)).toEqual(false);
      });
    });
  });
});
