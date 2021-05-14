const getSSMSecret = require('./lib/getSSMSecret');
const setUpNYTApi = require('./lib/setUpNYTApi');

exports.handler = async () => {
  const nytAPIKey = await getSSMSecret('nyt-key');
  console.log('key:', nytAPIKey);
  const nytAPI = setUpNYTApi(nytAPIKey);

  const topStories = await nytAPI.getTopStories();
  console.log(topStories);
};

exports.handler();
