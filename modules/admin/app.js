import * as dotenv from 'dotenv'
            dotenv.config()

import express from 'express';
const router = express.Router()

router.get('/admin', (req, res) => {
    res.render('admin/index.html.twig')
})
export default router;
