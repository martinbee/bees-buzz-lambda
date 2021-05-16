const getRSSItems = require('./getRSSItems');

const Sources = require('./Sources');

const url = 'http://feeds.bbci.co.uk/news/world/rss.xml';

async function getBbcArticles() {
  const articles = await getRSSItems(url);
  const articlesWithSource = articles.map((article) => ({
    ...article,
    source: Sources.BBC,
  }));

  return articlesWithSource;
}

module.exports = getBbcArticles;
