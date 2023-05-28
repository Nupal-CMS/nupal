import * as dotenv from 'dotenv'
            dotenv.config()
export const index = (req, res) => {
    res.twig('index.html', {
        title: 'Administration'
    })
}

export const modules = (req, res) => {
    res.twig('modules.html', {
        title: 'Modules'
    })
}
