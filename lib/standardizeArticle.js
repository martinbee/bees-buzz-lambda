const Sources = require('./Sources');

// Article Model
// {
//   description: string,
//   imageCaption: string
//   imageHeight: integer,
//   imageUrl: string,
//   imageWidth integer,
//   link: string,
//   pubDate: string,
//   title: string,
//   source: Source,
// }

const standardizeBbcArticle = (article) => {
  const { description, link, pubDate, source, title } = article;

  return {
    description,
    link,
    pubDate,
    source,
    title,
  };
};

const standardizeCnnArticle = (article) => {
  const { description, guid, pubDate, source, title } = article;

  const sanitizedDescription = description ? description.split('&lt')[0] : null;

  return {
    description: sanitizedDescription || null,
    link: guid,
    pubDate,
    source,
    title,
  };
};

const standardizeEspnArticle = (article) => {
  const { description, image, link, pubDate, source, title } = article;

  return {
    description,
    imageUrl: image || null,
    link,
    pubDate,
    source,
    title,
  };
};

const getNytArticleImage = (multimedia) => {
  if (!multimedia?.length) return null;

  return multimedia.reduce((imageToUse, mediaItem) => {
    const isImage = mediaItem?.type === 'image';

    if (!isImage) return imageToUse;

    const isLargerThanCurrentImage = !imageToUse
      ? true
      : mediaItem.width > imageToUse.width;

    if (isLargerThanCurrentImage) {
      const { caption, height, url, width } = mediaItem;

      return {
        caption,
        height,
        url,
        width,
      };
    }

    return imageToUse;
  }, null);
};

// refactor this image stuff
const standardizeNytArticle = (article) => {
  const { abstract, multimedia, published_date, source, title, url } = article;

  const image = getNytArticleImage(multimedia);

  return {
    description: abstract,
    imageCaption: image?.caption || null,
    imageHeight: image?.height || null,
    imageUrl: image?.url || null,
    imageWidth: image?.width || null,
    link: url,
    pubDate: published_date,
    source,
    title,
  };
};

function standardizeArticle(article) {
  switch (article.source) {
    case Sources.BBC:
      return standardizeBbcArticle(article);

    case Sources.CNN:
      return standardizeCnnArticle(article);

    case Sources.ESPN:
      return standardizeEspnArticle(article);

    case Sources.NY_TIMES:
      return standardizeNytArticle(article);

    default:
      return null;
  }
}

module.exports = standardizeArticle;
