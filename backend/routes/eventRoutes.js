const express = require('express')
const router = express.Router()
const {
    getEvents,
    createEvent,
    getEventById, 
    updateEvent,
    deleteEvent,
    getEventByKeyword
} = require('../controllers/eventController')

router.get('/', getEvents)
router.post('/', createEvent)
router.get('/:id', getEventById)
router.get('/:keyword', getEventByKeyword)
router.put('/:id', updateEvent)
router.delete('/:id', deleteEvent)

module.exports = router
