import {
    getEnabledModules,
    getAllModules,
    enableModule,
} from '../../../../core/modules.js'

import {
    getAllThemes,
    enableTheme
} from '../../../../core/themes.js'

export const contentTypes = async (req, res) => {
    return res.render('content.types.html', {

    })
}

export const contentTypesAdd = async (req, res) => {
    return res.render('content.types.add.html', {

    })
}
