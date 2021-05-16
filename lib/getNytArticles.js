const fetch = require('node-fetch');

const Sources = require('./Sources');

const topStoriesPath = 'https://api.nytimes.com/svc/topstories/v2/home.json';

async function getNytArticles(nytAPIKey) {
  const url = `${topStoriesPath}?api-key=${nytAPIKey}`;
  const response = await fetch(url);
  const data = await response.json();

  const articlesWithSource = data.results.map((article) => ({
    ...article,
    source: Sources.NY_TIMES,
  }));

  return articlesWithSource;
}

module.exports = getNytArticles;
