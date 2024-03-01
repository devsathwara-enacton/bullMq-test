import { myQueue } from "./queue";

async function addJob(jobId: string, data: any, options?: any) {
  await myQueue.add(jobId, data, options);
  console.log(`Job ${jobId} added to the queue.`);
}

// Example of adding a job
addJob("task1", { task: "do something" }, { delay: 5000 }); // delays job for 5 seconds
addJob("task2", { task: "do 2 something" }, { delay: 10000 }); // delays job for 5 seconds
