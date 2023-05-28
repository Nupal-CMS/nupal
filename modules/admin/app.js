import * as dotenv from 'dotenv'
            dotenv.config()

import express from 'express'
const app = express()

app.get('/', (req, res) => {
    res.render('admin/index.html.twig')
})
export default app
