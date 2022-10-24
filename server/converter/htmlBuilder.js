import LinkBuilder from "./LinkBuilder.js";

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
    str = LinkBuilder.convertMarkupLinksToHtml(str);

    return `<h${headingSize}>${str}</h${headingSize}>`;
  }

  #buildUnformattedText(str) {
    let tag = this.#paragraphTagOpen ? "" : "<p>";
    str = LinkBuilder.convertMarkupLinksToHtml(str);
    return `${tag}${str}`;
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
    this.#html = this.#html.slice(0, -1);
  }

  toString() {
    return this.#html;
  }
}

export default HTMLBuilder;
