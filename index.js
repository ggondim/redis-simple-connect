const redis = require('redis');
const { promisify } = require('util');

module.exports = connectRedis;

function easyDefault(customOpts, prop, envPrefix, envVar, outputOpts) {
  outputOpts = outputOpts || {};
  const envValue = process.env[`${envPrefix}${envVar}`];
  if (customOpts && customOpts[prop]) {
    outputOpts[prop] = customOpts[prop];
  } else if (envValue) {
    outputOpts[prop] = envValue;
  }
  return outputOpts;
}

function getEnvClientOpts(opts, envPrefix = '') {
  const outputOpts = {};
  easyDefault(opts, 'host', envPrefix, 'REDIS_HOST', outputOpts);
  easyDefault(opts, 'port', envPrefix, 'REDIS_PORT', outputOpts);
  easyDefault(opts, 'db', envPrefix, 'REDIS_DB', outputOpts);
  easyDefault(opts, 'password', envPrefix, 'REDIS_PASSWORD', outputOpts);
  return outputOpts;
}

function getAsync(client) {
  return promisify(client.get).bind(client);
}
function setAsync(client) {
  return promisify(client.set).bind(client);
}

async function connectRedis(opts, envPrefix) {
  const clientOpts = getEnvClientOpts(opts, envPrefix);
  const client = redis.createClient(clientOpts);

  client.getAsync = getAsync(client);
  client.setAsync = setAsync(client);

  return new Promise((resolve, reject) => {
    client.on('ready', () => resolve(client));
    client.on('error', reject);
  });
}
