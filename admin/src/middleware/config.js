import cluster from '../../../../core/redis.js'

export default async (req, res, next) => {
    res.locals.config = Object.assign({}, await cluster.hgetall('config'))
    console.log(res.locals.config)
    next()
}
