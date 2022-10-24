import Converter from "./converter";

describe("Converter convert Markdown to HTML", () => {
  describe("Heading Tags", () => {
    describe("Successful headings", () => {
      test(" # Heading 1 | <h1>Heading 1</h1>", () => {
        const result = Converter.markdownToHtml("# Heading 1");
        expect(result).toEqual("<h1>Heading 1</h1>");
      });
      test(" ## Heading 2 | <h2>Heading 2</h2>", () => {
        const result = Converter.markdownToHtml("## Heading 2");
        expect(result).toEqual("<h2>Heading 2</h2>");
      });
      test(" ### Heading 3 | <h3>Heading 3</h3>", () => {
        const result = Converter.markdownToHtml("### Heading 3");
        expect(result).toEqual("<h3>Heading 3</h3>");
      });
      test(" #### Heading 4 | <h4>Heading 4</h4>", () => {
        const result = Converter.markdownToHtml("#### Heading 4");
        expect(result).toEqual("<h4>Heading 4</h4>");
      });
      test(" ##### Heading 5 | <h5>Heading 5</h5>", () => {
        const result = Converter.markdownToHtml("##### Heading 5");
        expect(result).toEqual("<h5>Heading 5</h5>");
      });
      test(" ###### Heading 6 | <h6>Heading 6</h6>", () => {
        const result = Converter.markdownToHtml("###### Heading 6");
        expect(result).toEqual("<h6>Heading 6</h6>");
      });
    });
    describe("Almost headings", () => {
      test("####### Heading 7 | should not be <h7>Heading</h7> ", () => {
        const result = Converter.markdownToHtml("####### Heading 7");
        expect(result).toEqual("<p>####### Heading 7</p>");
      });
      test("####a | should not be a heading ", () => {
        const result = Converter.markdownToHtml("####a ");
        expect(result).toEqual("<p>####a</p>");
      });
    });
  });

  describe("Unformatted Text", () => {
    test("single line ", () => {
      const result = Converter.markdownToHtml("abcd ");
      expect(result).toEqual("<p>abcd</p>");
    });
    test("two lines of unformatted text ", () => {
      const result = Converter.markdownToHtml("abcd\nefgh");
      expect(result).toEqual(`<p>abcd\nefgh</p>`);
    });
    test("two lines of unformatted text separated by a space", () => {
      const result = Converter.markdownToHtml("abcd\n\nefgh");
      expect(result).toEqual(`<p>abcd</p>\n<p>efgh</p>`);
    });
    test("two lines of unformatted text separated by a Heading", () => {
      const result = Converter.markdownToHtml("abcd\n# heading \nefgh");
      expect(result).toEqual(`<p>abcd</p>\n<h1>heading</h1>\n<p>efgh</p>`);
    });
    test("three lines of unformatted text", () => {
      const result = Converter.markdownToHtml("abcd\n#test\nefgh");
      expect(result).toEqual(`<p>abcd\n#test\nefgh</p>`);
    });
  });

  describe("Links", function () {
    test("just a link", () => {
      const result = Converter.markdownToHtml(
        "[with a link](http://yahoo.com)"
      );
      expect(result).toEqual(
        `<p><a href="http://yahoo.com">with a link</a></p>`
      );
    });

    test("a link in text", () => {
      const result = Converter.markdownToHtml(
        "This is sample markdown for the [Mailchimp](https://www.mailchimp.com) homework assignment."
      );
      expect(result).toEqual(
        `<p>This is sample markdown for the <a href="https://www.mailchimp.com">Mailchimp</a> homework assignment.</p>`
      );
    });

    test("two links in text", () => {
      const result = Converter.markdownToHtml(
        "This is [Mailchimp](https://www.mailchimp.com) sample markdown for the [Mailchimp](https://www.mailchimp.com) homework assignment."
      );
      expect(result).toEqual(
        `<p>This is <a href="https://www.mailchimp.com">Mailchimp</a> sample markdown for the <a href="https://www.mailchimp.com">Mailchimp</a> homework assignment.</p>`
      );
    });

    test("a link in a header", () => {
      const result = Converter.markdownToHtml(
        "## This is a header [with a link](http://yahoo.com)"
      );
      expect(result).toEqual(
        `<h2>This is a header <a href="http://yahoo.com">with a link</a></h2>`
      );
    });

    test("an empty link in a header", () => {
      const result = Converter.markdownToHtml("## This is a header []()");
      expect(result).toEqual(`<h2>This is a header []()</h2>`);
    });

    test("a bad link in a header", () => {
      const result = Converter.markdownToHtml(
        "## This is a header [abc](not a url)"
      );
      expect(result).toEqual(`<h2>This is a header [abc](not a url)</h2>`);
    });

    test("an empty link in a in text", () => {
      const result = Converter.markdownToHtml("This is text []()");
      expect(result).toEqual(`<p>This is text []()</p>`);
    });

    test("a bad link in a text", () => {
      const result = Converter.markdownToHtml("This is text [abc](not a url)");
      expect(result).toEqual(`<p>This is text [abc](not a url)</p>`);
    });

    test("an empty link in a in text then good link", () => {
      const result = Converter.markdownToHtml(
        "This is text []() [with a link](http://yahoo.com)"
      );
      expect(result).toEqual(
        `<p>This is text []() <a href="http://yahoo.com">with a link</a></p>`
      );
    });
  });

  describe("Blank lines", function () {
    test("just a blank line", () => {
      const result = Converter.markdownToHtml("       ");
      expect(result).toEqual("");
    });

    test("multiple blank lines", () => {
      const result = Converter.markdownToHtml(
        "       \n              \n           \n"
      );
      expect(result).toEqual("");
    });
  });
});
