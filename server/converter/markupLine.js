class MarkupLine {
  static MAX_HEADING_SIZE = 6;
  #line = "";
  #isHeading = false;
  #headingSize = 0;

  /**
   *
   * @param {string} line
   */
  constructor(line) {
    this.#line = this.#removeBlanksAndTrim(line);
    [this.#isHeading, this.#headingSize] = this.#checkIfLineIsHeading();
  }

  #removeBlanksAndTrim(str) {
    return str.replace(/\s\s+/g, " ").trim();
  }

  /**
   *
   * @returns tuple of [is Heading, and size of heading]
   */
  #checkIfLineIsHeading() {
    let firstSubStr = this.#line.substring(0, this.#line.indexOf(" "));
    if (
      firstSubStr.length > MarkupLine.MAX_HEADING_SIZE ||
      firstSubStr.length === 0
    ) {
      return [false, 0];
    }
    //If any one of the characters aren't equal to # return false
    return [![...firstSubStr].some((c) => c !== "#"), firstSubStr.length];
  }

  isEmpty() {
    return this.#line.length === 0;
  }

  isHeading() {
    return this.#isHeading;
  }

  getHeadingSize() {
    return this.#headingSize;
  }

  toString() {
    return this.#line;
  }
}

export default MarkupLine;
