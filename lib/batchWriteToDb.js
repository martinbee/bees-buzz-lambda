const {
  BatchWriteItemCommand,
  DynamoDBClient,
} = require('@aws-sdk/client-dynamodb');

const generateUUID = require('./generateUUID');

const REGION = 'us-east-1';

const transformArticlesIntoPutRequests = (articles) =>
  articles.map((article) => {
    const {
      description,
      imageCaption,
      imageHeight,
      imageUrl,
      imageWidth,
      link,
      pubDate,
      source,
      title,
    } = article;

    return {
      PutRequest: {
        Item: {
          id: { S: generateUUID() },
          description: { S: description },
          imageCaption: { S: imageCaption },
          imageHeight: { N: String(imageHeight) },
          imageUrl: { S: imageUrl },
          imageWidth: { N: String(imageWidth) },
          link: { S: link },
          pubDate: { S: pubDate },
          source: { S: source },
          title: { S: title },
        },
      },
    };
  });

const BATCH_MAX = 25;

// can we do this without recursion or the mutation?
const getBatchedWriteRequests = (putRequests) => {
  const batchedWriteRequests = [];

  function getBatch(requests, lastSliceIndex) {
    if (lastSliceIndex < requests.length) {
      const nextSliceIndex = lastSliceIndex + BATCH_MAX;
      const nextBatchOfRequests = requests.slice(
        lastSliceIndex,
        nextSliceIndex
      );
      const writeRequest = {
        RequestItems: {
          articles: nextBatchOfRequests,
        },
      };

      batchedWriteRequests.push(writeRequest);

      getBatch(requests, nextSliceIndex);
    }
  }

  getBatch(putRequests, 0);

  return batchedWriteRequests;
};

const dynamoDbClient = new DynamoDBClient({ region: REGION });

async function batchWriteToDb(articlesToWrite) {
  const putRequests = transformArticlesIntoPutRequests(articlesToWrite);
  const writeRequests = getBatchedWriteRequests(putRequests);
  const writeRequestPromises = writeRequests.map((request) =>
    dynamoDbClient.send(new BatchWriteItemCommand(request))
  );

  try {
    const data = await Promise.all(writeRequestPromises);

    console.log('Success, items inserted', data);
  } catch (err) {
    console.log('Error', err);
  }
}

module.exports = batchWriteToDb;
