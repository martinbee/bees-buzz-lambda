const fetch = require('node-fetch');

const topStoriesPath = 'https://api.nytimes.com/svc/topstories/v2/home.json';

function setUpNYTApi(nytAPIKey) {
  return {
    async getTopStories() {
      const url = `${topStoriesPath}?api-key=${nytAPIKey}`;
      const response = await fetch(url);
      const results = await response.json();

      return results;
    },
  };
}

module.exports = setUpNYTApi;
