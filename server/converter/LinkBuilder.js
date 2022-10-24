class LinkBuilder {
  static convertMarkupLinksToHtml(line) {
    //quick check to see if it has a a possible link
    let position = 0;
    let [first, second, third] = findAllThreePartsOfLink(line, position);

    while (first !== -1 && second !== -1 && third !== -1) {
      let text = line.substring(first + 1, second);
      let url = line.substring(second + 2, third);
      if (text.length !== 0 && isURL(url)) {
        line = line.replace(
          line.substring(first, third + 1),
          buildHTMLLink(text, url)
        );
      }
      position = third + 1;
      [first, second, third] = findAllThreePartsOfLink(line, position);
    }

    return line;
  }
}
function findAllThreePartsOfLink(line, start) {
  let first = line.indexOf("[", start);
  let second = line.indexOf("](", first + 1);
  let third = line.indexOf(")", second + 1);
  return [first, second, third];
}

function isURL(str) {
  // Used regex from Stackoverflow to match URLS
  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  return str.match(regex)?.length > 0;
}

function buildHTMLLink(text, url) {
  return `<a href="${url}">${text}</a>`;
}

export default LinkBuilder;
export { isURL };
