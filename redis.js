const Redis = require("ioredis");
const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
  // password: 'yourpassword', // Uncomment if your Redis server requires authentication
});

redis.on("connect", () => {
  console.log("Connected to Redis");
  redis.info().then((info) => {
    const matches = info.match(/^redis_version:(\d+\.\d+\.\d+)/m);
    if (matches) {
      console.log(`Redis Version: ${matches[1]}`);
    } else {
      console.log("Cannot determine Redis version");
    }
    process.exit();
  });
});

redis.on("error", (err) => {
  console.error("Redis Error", err);
  process.exit(1);
});
