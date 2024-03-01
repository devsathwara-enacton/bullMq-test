import { myQueue } from "./queue";
import { QueueEvents } from "bullmq";

const queueEvents = new QueueEvents("myQueue");

queueEvents.on("completed", (job) => {
  console.log(job.jobId);
  console.log(`Job ${job.jobId} completed`);
});

queueEvents.on("failed", (job, err) => {
  console.log(`Job ${job.jobId} failed with error ${err}`);
});

queueEvents.on("progress", (job, progress) => {
  console.log(`Job ${job.jobId} progress: ${progress}`);
});

console.log("Event listener started");
