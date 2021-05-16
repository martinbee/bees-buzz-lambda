const getSSMSecret = require('./lib/getSSMSecret');
const getNytArticles = require('./lib/getNytArticles');
const getBbcArticles = require('./lib/getBbcArticles');
const getCnnArticles = require('./lib/getCnnArticles');
const getEspnArticles = require('./lib/getEspnArticles');
const standardizeArticle = require('./lib/standardizeArticle');

exports.handler = async () => {
  const nytAPIKey = await getSSMSecret('nyt-key');

  const articleGroups = await Promise.all([
    await getNytArticles(nytAPIKey),
    await getBbcArticles(),
    await getCnnArticles(),
    await getEspnArticles(),
  ]);

  const articles = articleGroups.reduce((allArticles, group) => {
    const groupArticles = group.map((article) => standardizeArticle(article));

    return [...allArticles, ...groupArticles];
  }, []);

  console.log(articles);
};

exports.handler();
