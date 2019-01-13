const express = require('express')
const controller = require('../../app/controller/rootController')

const router = express.Router()

router.get('/api', controller.get)
router.get('/api/getGenres', controller.getGenres)

module.exports = router
