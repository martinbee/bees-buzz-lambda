const parser = require('fast-xml-parser');

function parseXML(xml) {
  return parser.parse(xml, null, true);
}

module.exports = parseXML;
