# redis-simple-connect
(ANOTHER) simple Node.js module to connect and send commands to Redis using promises with configurable environment variables, build on top of [Node Redis](https://github.com/NodeRedis/node_redis).

- [Features](#Features)
- [How to use](#How-to-use)
- [Reference](#Reference)
  - [Connecting to Redis](#Connecting-to-Redis) 
  - [getAsync and setAsync](#getAsync-and-setAsync)

## Features
- Connect easily to Redis using promises and async/await
- Use environment variables or an options object to set connection parameters
- Call async commands like `GET` and `SET` using `getAsync` and `setAsync` methods

## How to use

```
$ npm i -s redis-simple-connect
```

```javascript
const connectRedis = require('redis-simple-connect');

const client = await connectRedis();
```

## Reference

### Connecting to Redis

When calling the main exported method from module, you may use environment variables or an options object.

The method returns a `RedisClient` object from [Node Redis](https://github.com/NodeRedis/node_redis), so you can call this class methods and commands.

#### With environment variables

```javascript
const client = await connectRedis();
```

This way the module will try to obtain the main connection parameters (host, port, password and database number) from the following variables: `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD` and `REDIS_DB`.

* Note that port, password and database number are not required options.

If you want to add a prefix to the variables, you may use the `envPrefix` parameter:

```javascript
const client = await connectRedis(_, 'MYAPP_');

// This way the method will look for `MYAPP_REDIS_HOST`, `MYAPP_REDIS_PORT`, etc.
```

#### With an options object

```javascript
const client = await connectRedis({
  host: 'redis.domain.com',
  port: 8654,
  db: 7,
  password: 'abd132be1323115bd51afbfaba'
});
```

### getAsync and setAsync

This module injects two methods to the `RedisClient` class: `getAsync` and `setAsync`.

Both are promisifed versions of the respective methods `get` and `set`.

```javascript
const value = await client.getAsync('key');

await client.setAsync('key', value);
```
