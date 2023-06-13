import {
    getEnabledModules,
    getAllModules,
    enableModule,
    getAllThemes,
    enableTheme,
    getAllContentTypes,
    createContentType,
    deleteContentType,
    createContent
} from '../../../../core/orm.js'

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
        await createContent(req.body)
        return res.redirect('/content/types')
    }

    return res.render('content.add.html')
}
