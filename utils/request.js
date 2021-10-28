const axios = require('axios').default;
const { secrets } = require('../config/config');

async function makeRequest(path, method, token, data) {
  try {
    let res;
    if (data) {
      res = await axios({
        url: `http://localhost:5000/api/${path}`,
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          provider_token: secrets.DISCORD_TOKEN,
          access_token: token,
        },
        data,
      });
    } else {
      res = await axios({
        url: `http://localhost:5000/api/${path}`,
        method,
        headers: {
          Accept: 'application/json',
          provider_token: secrets.DISCORD_TOKEN,
          access_token: token,
        },
      });
    }

    return res.data;
  } catch (err) {
    if (err.response?.data) {
      return {
        err: err.response.data.error,
        errorMsg: err.response.data.message,
        statusCode: err.response.data.statusCode,
      };
    }

    return {
      err,
      errorMsg: 'There has been a server error',
      statusCode: 500,
    };
  }
}

module.exports = makeRequest;
