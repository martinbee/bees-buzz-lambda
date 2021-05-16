const getRSSItems = require('./getRSSItems');

const Sources = require('./Sources');

const url = 'http://rss.cnn.com/rss/cnn_world.rss';

async function getCnnArticles() {
  const articles = await getRSSItems(url);
  const articlesWithSource = articles.map((article) => ({
    ...article,
    source: Sources.CNN,
  }));

  return articlesWithSource;
}

module.exports = getCnnArticles;
