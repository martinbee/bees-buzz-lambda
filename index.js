const getSSMSecret = require('./lib/getSSMSecret');
const setUpNYTApi = require('./lib/setUpNYTApi');
const setUpBBCApi = require('./lib/setUpBBCApi');
const setUpCNNApi = require('./lib/setUpCNNApi');

exports.handler = async () => {
  const nytAPIKey = await getSSMSecret('nyt-key');
  const nytAPI = setUpNYTApi(nytAPIKey);
  const bbcAPI = setUpBBCApi();
  const cnnAPI = setUpCNNApi();

  const stories = await Promise.all(
    await nytAPI.getTopStories(),
    await bbcAPI.getStories(),
    await cnnAPI.getStories()
  );
  console.log(stories);
};

exports.handler();
