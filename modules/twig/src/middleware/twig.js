import twig from 'twig'
import path from 'node:path'

export default async (req, res, next) => {

    res.virtual = async (tpl, data) => {
        return await twig.renderFile(path.join(process.env.MODULE_PATH, req.mod, 'src', 'virtual', tpl + '.twig'), data, (err, html) => {
            if(err) throw err
            res.end(html)
        })
    }

    next()
}
