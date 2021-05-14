const getRSSItems = require('./getRSSItems');

function setUpBBCApi() {
  return {
    async getStories() {
      const url = 'http://feeds.bbci.co.uk/news/world/rss.xml';

      return await getRSSItems(url);
    },
  };
}

module.exports = setUpBBCApi;
