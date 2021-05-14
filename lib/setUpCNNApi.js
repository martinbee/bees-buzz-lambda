const getRSSItems = require('./getRSSItems');

function setUpCNNApi() {
  return {
    async getStories() {
      const url = 'http://rss.cnn.com/rss/cnn_world.rss';

      return await getRSSItems(url);
    },
  };
}

module.exports = setUpCNNApi;
