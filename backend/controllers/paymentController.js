const { PaymentDetails } = require('../models');  // Correct import

exports.getPayments = async (req, res) => {
    try {
        const payments = await PaymentDetails.findAll();  // Add await here
        res.json(payments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPayment = async (req, res) => {
    try {
        const newPayment = await PaymentDetails.create(req.body);  // Use create method
        res.status(201).json(newPayment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid payment ID" });
        }
        const payment = await PaymentDetails.findByPk(id);  // Use findByPk to get payment
        if (!payment) return res.status(404).json({ message: "Payment not found" });
        res.status(200).json(payment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePayment = async (req, res) => {
    try {
        const payment = await PaymentDetails.findByPk(req.params.id);
        if (!payment) return res.status(404).json({ message: "Payment not found" });
        const updatedPayment = await payment.update(req.body);
        res.json(updatedPayment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePayment = async (req, res) => {
    try {
        const deletedPayment = await PaymentDetails.destroy({
            where: { id: req.params.id }
        });
        if (!deletedPayment) return res.status(404).json({ message: "Payment not found" });
        res.json({ message: "Payment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
