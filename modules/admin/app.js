import * as dotenv from 'dotenv'
            dotenv.config()

import cluster from '../../lib/redis.js'

import { Router } from 'express';
const router = Router()

router.get('/admin', (req, res) => {
    res.render('admin/index.html.twig')
})

router.get('/admin/modules', (req, res) => {
    res.end('getty')
})

router.post('/admin/modules', (req, res) => {
    res.end('posty')
})
export default router;
