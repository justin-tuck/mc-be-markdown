import { StringUtil } from "../utilities/stringUtil.js";
class HTMLBuilder {
  #html;
  #paragraphTagOpen;
  constructor() {
    this.#html = "";
    this.#paragraphTagOpen = false;
  }

  /**
   *
   * @param {MarkupLine} markupLine
   * @returns
   */
  buildHTMLfromMarkupLine(markupLine) {
    let str = "";
    if (markupLine.isHeading()) {
      if (this.paragraphTagIsOpen()) this.addParagraphCloseTag();
      str = this.#buildHeadingTag(markupLine);
    } else {
      str = this.#buildUnformattedText(markupLine.toString());
      if (!this.#paragraphTagOpen) this.#paragraphTagOpen = true;
    }
    return str;
  }

  paragraphTagIsOpen() {
    return this.#paragraphTagOpen;
  }

  addParagraphCloseTag() {
    this.removeNewLineCharacter();
    this.addLine("</p>\n");
    this.#paragraphTagOpen = false;
  }

  #buildHeadingTag(markupLine) {
    const headingSize = markupLine.getHeadingSize();

    let str = markupLine.toString();
    str = str.substring(headingSize + 1); // add 1 to account for the space
    str = this.#convertPossibleLinks(str);

    return `<h${headingSize}>${str}</h${headingSize}>`;
  }

  #buildUnformattedText(str) {
    let tag = this.#paragraphTagOpen ? "" : "<p>";
    str = this.#convertPossibleLinks(str);
    return `${tag}${str}`;
  }

  #convertPossibleLinks(line) {
    //quick check to see if it has a a possible link
    let position = 0;
    let [first, second, third] = this.#findAllThreePartsOfLink(line, position);

    while (first !== -1 && second !== -1 && third !== -1) {
      let text = line.substring(first + 1, second);
      let url = line.substring(second + 2, third);
      if (text.length !== 0 && StringUtil.isURL(url)) {
        line = line.replace(
          line.substring(first, third + 1),
          this.#buildHTMLLink(text, url)
        );
      }
      position = third + 1;
      [first, second, third] = this.#findAllThreePartsOfLink(line, position);
    }

    return line;
  }

  #findAllThreePartsOfLink(line, start) {
    let first = line.indexOf("[", start);
    let second = line.indexOf("](", first + 1);
    let third = line.indexOf(")", second + 1);
    return [first, second, third];
  }

  #buildHTMLLink(text, url) {
    return `<a href="${url}">${text}</a>`;
  }

  addLine(line) {
    this.#html += line;
  }

  addNewLine() {
    this.addLine("\n");
  }

  addEndOfFile() {
    if (this.#paragraphTagOpen) {
      this.addLine("</p>");
    }
  }

  removeNewLineCharacter() {
    this.#html = StringUtil.removeLastChars(this.#html, 1);
  }

  toString() {
    return this.#html;
  }
}

export default HTMLBuilder;
