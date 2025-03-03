const express = require('express')
const router = express.Router()
const {
    getHosts,
    createHost,
    getHostById,
    updateHost,
    deleteHost
} = require('../controllers/hostController')

router.get('/', getHosts)
router.post('/', createHost)
router.get('/:id', getHostById)
router.put('/:id', updateHost)
router.delete('/:id', deleteHost)

module.exports = router
