const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
const REDIS_URL = `redis://${REDIS_HOST}:${REDIS_PORT}`;

export {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_URL
};