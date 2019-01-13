const express = require('express')
const controller = require('../../app/controller/rootController')

const router = express.Router()

router.get('/api', controller.get)
router.get('/api/getGenres', controller.getGenres)

router.post('/api', controller.post)

module.exports = router
