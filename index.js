const getSSMSecret = require('./lib/getSSMSecret');
const getNytArticles = require('./lib/getNytArticles');
const getBbcArticles = require('./lib/getBbcArticles');
const getCnnArticles = require('./lib/getCnnArticles');

exports.handler = async () => {
  const nytAPIKey = await getSSMSecret('nyt-key');

  const articleGroups = await Promise.all([
    await getNytArticles(nytAPIKey),
    await getBbcArticles(),
    await getCnnArticles(),
  ]);

  articleGroups.forEach((group) =>
    group.forEach((article) => console.log(article.source))
  );
};

exports.handler();
