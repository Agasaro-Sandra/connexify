const express = require('express')
const router = express.Router()
const {
    getBookings,
    createBooking,
    getBookingById, 
    updateBooking,
    deleteBooking
} = require('../controllers/bookingController')

router.get('/', getBookings)
router.post('/', createBooking)
router.get('/:id', getBookingById)
router.put('/:id', updateBooking)
router.delete('/:id', deleteBooking)

module.exports = router
