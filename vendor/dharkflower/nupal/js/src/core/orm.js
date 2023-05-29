import cluster from './redis.js'

export const getConfig = async config => {
    return cluster.hget('config', config)
}
