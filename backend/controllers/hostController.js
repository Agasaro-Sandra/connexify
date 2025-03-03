const { EventHost } = require('../models');  // Correct import

exports.getHosts = async (req, res) => {
    try {
        const hosts = await EventHost.findAll();  // Add await here
        res.json(hosts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createHost = async (req, res) => {
    try {
        const newHost = await EventHost.create(req.body);  // Use create method
        res.status(201).json(newHost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getHostById = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid host ID" });
        }
        const host = await EventHost.findByPk(id);  // Use findByPk to get host
        if (!host) return res.status(404).json({ message: "Host not found" });
        res.status(200).json(host);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateHost = async (req, res) => {
    try {
        const host = await EventHost.findByPk(req.params.id);
        if (!host) return res.status(404).json({ message: "Host not found" });
        const updatedHost = await host.update(req.body);  // Call update on the instance
        res.json(updatedHost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteHost = async (req, res) => {
    try {
        const deletedHost = await EventHost.destroy({
            where: { id: req.params.id }
        });  // Use destroy instead of findByIdAndDelete
        if (!deletedHost) return res.status(404).json({ message: "Host not found" });
        res.json({ message: "Host deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
