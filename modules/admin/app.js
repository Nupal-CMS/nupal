import * as dotenv from 'dotenv'
            dotenv.config()

import cluster from '../../lib/redis.js'

import { Router } from 'express';
const router = Router()

router.get('/admin', (req, res) => {
    res.render('admin/index.html.twig')
})

router.get('/admin/modules', (req, res) => {
    res.render('admin/modules.get.html.twig')
})

router.post('/admin/modules', (req, res) => {
    res.render('admin/modules.post.html.twig')
})
export default router;
