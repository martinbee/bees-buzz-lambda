function logKeysOfArticleGroups(articleGroups) {
  articleGroups.forEach((group) => {
    const keys = group.reduce((acc, article) => {
      const articleKeys = Object.keys(article);
      const keysToInclude = articleKeys.reduce((includeKeys, key) => {
        if (acc[key]) return includeKeys;

        return {
          ...includeKeys,
          [key]: key,
        };
      }, {});

      return {
        ...acc,
        ...keysToInclude,
      };
    }, {});
    console.log(keys);
  });
}

module.exports = logKeysOfArticleGroups;
