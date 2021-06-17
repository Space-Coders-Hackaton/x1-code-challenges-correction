import QueueBull from 'bull';
import redisConfig from '../config/redis';

import * as jobs from '../jobs';

const queues = Object.values(jobs).map(job => ({
  bull: new QueueBull(job.key, { redis: redisConfig }),
  name: job.key,
  handle: job.handle,
  options: job.options
}));

const Queue = {
  queues,
  add(name: string, data: any) {
    const queue = queues.find(queue => queue.name === name);

    return queue.bull.add(data, queue.options);
  },
  process() {
    return queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job) => {
        console.log('Job failed', queue.name, job.data);
      });
    });
  }
}

export { Queue };