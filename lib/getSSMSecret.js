const aws = require('aws-sdk');

// create new Systems Manager
const ssm = new aws.SSM();

async function getSSMSecret(path) {
  const params = {
    Name: `/bees-buzz/${path}`,
    WithDecryption: true,
  };

  const result = await ssm.getParameter(params).promise();

  return result.Parameter.Value;
}

module.exports = getSSMSecret;
