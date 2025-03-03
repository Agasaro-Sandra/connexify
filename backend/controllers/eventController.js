const { Event } = require('../models');  // Correct import
const { Op } = require('sequelize');  // Import Op for operators

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);  // Use create method
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid event ID" });
        }
        const event = await Event.findByPk(id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getEventByKeyword = async (req, res) => {
    try {
        const { keyword } = req.params; // Extract keyword from req.params

        if (!keyword || typeof keyword !== "string") {
            return res.status(400).json({ message: "Invalid keyword" });
        }

        // Find events matching the keyword
        const events = await Event.findAll({
            where: {
                keywords: {
                    [Op.like]: `%${keyword}%`, // Use Sequelize operators for partial matching
                },
            },
        });

        if (events.length === 0) {
            return res.status(404).json({ message: "No events found with the given keyword" });
        }

        return res.status(200).json(events); // Return matching events
    } catch (error) {
        console.error("Error fetching events by keyword:", error);
        return res.status(500).json({ message: "An error occurred", error });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        const updatedEvent = await event.update(req.body);  // Call update on the instance
        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        await event.destroy();  // Call destroy on the instance
        res.json({ message: "Event deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
