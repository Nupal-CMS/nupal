import cluster from './core/redis.js'

await cluster.lpush('modules', 'nupal')

