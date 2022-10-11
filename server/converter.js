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
    let html = "";

    const lines = markdown.split("\n");
    let continuousText = false;
    for (let i = 0; i < lines.length; i++) {
      let line = StringUtil.removeBlanksAndTrim(lines[i]);
      if (line.length === 0) {
        if (continuousText) {
          html = StringUtil.removeLastChars(html, 1); //removing new line
          html += "</p>\n";
          continuousText = false;
        }
        continue;
      }

      if (Header.isHeading(line)) {
        if (continuousText) {
          html = StringUtil.removeLastChars(html, 1); //removing new line
          html += "</p>\n";
          continuousText = false;
        }
        html += Header.buildHeadingTag(line);
      } else {
        html += Unformatted.buildUnformattedText(line, continuousText);
        if (!continuousText) continuousText = true;
      }

      if (i !== lines.length - 1) html += "\n";
    }
    if (continuousText) {
      html += "</p>";
    }

    return html;
  }
}
class Link {
  /**
   *
   * @param {string} text
   * @param {string} url
   * @returns
   */
  static buildLink(text, url) {
    return `<a href="${url}">${text}</a>`;
  }

  static convertPossibleLinks(line) {
    //quick check to see if it has a a possible link
    let first = line.indexOf("[");
    let second = line.indexOf("](", first + 1);
    let third = line.indexOf(")", second + 1);
    while (first !== -1 && second !== -1 && third !== -1) {
      let text = line.substring(first + 1, second);
      let url = line.substring(second + 2, third);
      line = line.replace(
        line.substring(first, third + 1),
        Link.buildLink(text, url)
      );

      first = line.indexOf("[");
      second = line.indexOf("](", first + 1);
      third = line.indexOf(")", second + 1);
    }
    return line;
  }
}

class Unformatted {
  /**
   * Builds an unformatted string
   * @param {string} line
   * @param {boolean} continuous
   * @returns  {string}
   */
  static buildUnformattedText(line, continuous) {
    let tag = continuous ? "" : "<p>";
    //check if line has link
    line = Link.convertPossibleLinks(line);

    return `${tag}${line}`;
  }
}

class Header {
  static MAX_HEADING_SIZE = 6;

  /**
   * checks if line is a heading
   * @param {string} line
   * @returns {boolean}
   */
  static isHeading(line) {
    //Only want to check the first 6 characters of the string
    let firstSubStr = line.substring(0, line.indexOf(" "));
    if (
      firstSubStr.length > this.MAX_HEADING_SIZE ||
      firstSubStr.length === 0
    ) {
      return false;
    }
    //If any one of the characters aren't equal to # return false
    return ![...firstSubStr].some((c) => c !== "#");
  }

  static buildHeadingTag(line) {
    //Need to determine the number of # to find the size of heading
    let count = 1;
    for (; count < this.MAX_HEADING_SIZE; count++) {
      if (line[count] !== "#") break;
    }
    // add 1 to count to account for the space
    line = line.substring(count + 1);
    line = Link.convertPossibleLinks(line);
    return `<h${count}>${line}</h${count}>`;
  }
}

class StringUtil {
  /**
   * removes redundant spaces and trims the string
   * @param {string} str
   * @returns {string}
   */
  static removeBlanksAndTrim(str) {
    return str.replace(/\s\s+/g, " ").trim();
  }

  /**
   *
   * @param {string} str
   * @param {number} num
   * @returns
   */
  static removeLastChars(str, num) {
    return str.substring(0, str.length - num);
  }
}

export default Converter;
