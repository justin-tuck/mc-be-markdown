import HTMLBuilder from "./htmlBuilder.js";
import MarkupLine from "./markupLine.js";

class Converter {
  /**
   * Converts markdown to html
   * | Markdown                               | HTML                                              |
   * | -------------------------------------- | ------------------------------------------------- |
   * | `# Heading 1`                          | `<h1>Heading 1</h1>`                              |
   * | `## Heading 2`                         | `<h2>Heading 2</h2>`                              |
   * | `...`                                  | `...`                                             |
   * | `###### Heading 6`                     | `<h6>Heading 6</h6>`                              |
   * | `Unformatted text`                     | `<p>Unformatted text</p>`                         |
   * | `[Link text](https://www.example.com)` | `<a href="https://www.example.com">Link text</a>` |
   * | `Blank line`                           | `Ignored`                                         |
   * @param {string} markdown
   * @returns {string} html
   */
  static markdownToHtml(markdown) {
    const htmlBuilder = new HTMLBuilder();
    const lines = markdown.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const markupLine = new MarkupLine(lines[i]);

      if (markupLine.isEmpty()) {
        if (htmlBuilder.paragraphTagIsOpen())
          htmlBuilder.addParagraphCloseTag();
        continue;
      }

      let htmlLine = htmlBuilder.buildHTMLfromMarkupLine(markupLine);
      htmlBuilder.addLine(htmlLine);

      const isNotLastLine = i !== lines.length - 1;
      if (isNotLastLine) htmlBuilder.addNewLine();
    }

    htmlBuilder.addEndOfFile();

    return htmlBuilder.toString();
  }
}

export default Converter;
