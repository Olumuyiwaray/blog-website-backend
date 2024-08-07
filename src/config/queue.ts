import { Queue } from 'bullmq';
import { Redis, RedisOptions } from 'ioredis';

const redisOptions: RedisOptions = {
  host: 'localhost',
  port: 6379,
};

const redis = new Redis(redisOptions);

const emailQueue = new Queue('email', {
  connection: redis,
});

const closeConnection = () => {
  redis.quit();
};



export { emailQueue, redis, Redis, closeConnection};
