const fetch = require('node-fetch');

const parseXML = require('./parseXML');

async function getRSSItems(url) {
  const response = await fetch(url);
  const xmlResults = await response.text();

  const jsonResults = parseXML(xmlResults);
  const items = jsonResults.rss.channel.item;

  return items;
}

module.exports = getRSSItems;
