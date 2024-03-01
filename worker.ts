import { Worker } from "bullmq";
import { myQueue } from "./queue";

const worker = new Worker(
  myQueue.name,
  async (job: any) => {
    console.log(`Processing job ${job.id}`);
    // Simulate job processing by waiting for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(`Completed job ${job.id}:`, job.data);
  },
  { connection: myQueue.opts.connection }
);

console.log("Worker started");
