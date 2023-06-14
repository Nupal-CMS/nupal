import {
    getEnabledModules,
    getAllModules,
    enableModule,
    getAllThemes,
    enableTheme,
    getAllContentTypes,
    createContentType,
    deleteContentType,
    createContent,
    getAllNodes
} from '../../../../core/orm.js'

import { nodePrefix } from '../../.././../core/constants.js'

export const contentTypes = async (req, res) => {
    return res.render('content.types.html', {
        contentTypes: await getAllContentTypes()
    })
}

export const contentTypesAdd = async (req, res) => {

    if(req.method === 'POST') {
        await createContentType(req.body[Object.keys(req.body)[0]])
        return res.redirect('/content/types')
    }

    return res.render('content.types.add.html')
}

export const contentTypesDelete = async (req, res) => {

    if(req.method === 'POST') {
        console.log('req.body:', req.body)

        await deleteContentType(req.body[Object.keys(req.body)[0]])
        return res.redirect('/content/types')
    }

    else res.end('broken')
}

export const contentAdd = async (req, res) => {

    if(req.method === 'POST') {
        await createContent({
            type: req.params.contentType,
            data: Math.random(3)
        })
        return res.redirect('/content/types')
    }

    return res.render('content.add.html')
}

export const content = async (req, res) => {
    let nodes = await getAllNodes(req.params.contentType)
    console.log('nodes: ', nodes)
    return res.end('working')
    return res.render('content.html', { nodes })
}
