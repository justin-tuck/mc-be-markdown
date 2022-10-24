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

  /**
   *
   * @param {string} str
   * @returns
   */
  static isURL(str) {
    // Used regex from Stackoverflow to match URLS
    var expression =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    var regex = new RegExp(expression);
    return str.match(regex);
  }
}

export { StringUtil };
