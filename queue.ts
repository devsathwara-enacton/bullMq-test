import { Queue } from "bullmq";

const connection = {
  host: "127.0.0.1",
  port: 6379,
  password: "dev",
  redisVersion: "7.2.4",
};
export const myQueue = new Queue("myQueue", { connection });
