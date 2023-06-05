import Twig from 'twig'
import client from '../../../../core/redis.js'
import { getConfig } from '../../../../core/config.js'

export default async (req, res, next) => {

    req.client = client
    req.theme = await client.hGet('theme', 'active')
    req.config = await getConfig('core.system')
    res.render = async (tpl, data = {}) => {

        let path = `${process.env.MODULE_PATH}/${req.info.name}/src/templates`
            data = Object.assign({}, data, { env: process.env }, { req: req })

        await Twig.renderFile(`${path}/${tpl}.twig`, data, (err, html) => {
            if(err) console.error('controller template error: ', err)
            res.end(html)
        })
    }

    next()
}
