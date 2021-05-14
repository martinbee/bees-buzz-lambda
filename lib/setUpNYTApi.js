const fetch = require('node-fetch');

const topStoriesPath = 'https://api.nytimes.com/svc/topstories/v2/home.json';

function setUpNYTApi(nytAPIKey) {
  return {
    async getTopStories() {
      const url = `${topStoriesPath}?api-key=${nytAPIKey}`;
      const response = await fetch(url);
      const data = await response.json();

      return data.results;
    },
  };
}

module.exports = setUpNYTApi;
