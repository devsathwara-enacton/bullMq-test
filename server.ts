import express from "express";
import { Queue, Worker, QueueEvents } from "bullmq";
import { BullMQAdapter } from "bull-board/bullMQAdapter";
import { createBullBoard } from "bull-board";

// Queue setup
const queueName = "myQueue";
const connectionOptions = { host: "localhost", port: 6379 };
const myQueue = new Queue(queueName, { connection: connectionOptions });

// Worker to process jobs
const worker = new Worker(
  queueName,
  async (job) => {
    console.log(`Processing job ${job.id}`);
    // Simulate job work with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { result: `Processed job ${job.id}` };
  },
  { connection: connectionOptions }
);

// Event listener for the queue
const queueEvents = new QueueEvents(queueName, {
  connection: connectionOptions,
});
queueEvents.on("completed", (event) =>
  console.log(`Job completed: ${event.jobId}`)
);
queueEvents.on("failed", (event) =>
  console.log(`Job failed: ${event.jobId} with error ${event.failedReason}`)
);

// Bull Board setup
const { setQueues, router: bullBoardRouter } = createBullBoard([
  new BullMQAdapter(myQueue),
]);

// Express app setup
const app = express();
const PORT = 3000;
app.use("/admin/queues", bullBoardRouter); // Serve Bull Board

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(
    `Bull Board UI available at http://localhost:${PORT}/admin/queues`
  );

  // Add a job to the queue
  await myQueue.add("myJob", { foo: "bar" });

  console.log(`Job added to ${queueName}`);
});
