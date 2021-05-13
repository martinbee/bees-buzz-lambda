const fetch = require('node-fetch')

exports.handler = async (event) => {
  const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
  const results = await response.json()

  console.log(results)
};

exports.handler()
