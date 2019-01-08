const express = require('express')
const controller = require('../../app/controller/rootController')

const router = express.Router()
router.get('/', controller.get)
router.post('/', controller.post)

module.exports = router
