const getRSSItems = require('./getRSSItems');

const Sources = require('./Sources');

const url = 'https://www.espn.com/espn/rss/news';

async function getEspnArticles() {
  const articles = await getRSSItems(url);
  const articlesWithSource = articles.map((article) => ({
    ...article,
    source: Sources.ESPN,
  }));

  return articlesWithSource;
}

module.exports = getEspnArticles;
