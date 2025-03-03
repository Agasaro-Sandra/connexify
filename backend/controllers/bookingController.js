const { Booking } = require('../models'); 
const QRCode = require('qrcode')
const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')

const sendEmail = async (email, qrData) => {
    const qrCodePath = path.join(__dirname, 'qr-code.png')
    await QRCode.toFile(qrCodePath, qrData, (err) => {
        if (err) {
            console.error('Error generating QR code:', err)
            throw new Error('Failed to generate QR Code.')
        }
    })

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sandraihirwe007@gmail.com',
            pass: 'aroa zfyn xvlt tgha'
        }
    })

    const mailOptions = {
        from: 'sandraihirwe007@gmail.com', 
        to: email,
        subject: 'Your Event QR Code',
        html: `<p> Thank you for booking with us! Please find your QR code attached below. </p>
                <p><img src="cid:qrCode" alt="QR Code" /></p>` ,
        attachments: [
            {
                filename: 'qr-code.png',
                path: qrCodePath,
                cid: 'qrCode'
            }
        ]
    }

    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending email:', err)
            throw new Error('Failed to send email.')
        } else {
            console.log('Email sent: ', info.response)
        }
    })

    fs.unlink(qrCodePath, (err) => {
        if (err) console.error('Error deleting QR code file: ', err)
        else console.log('QR code file deleted')
    })
}

exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.json(bookings);
    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.createBooking = async (req, res) => {
    try {
        const { names, email, ticket_type, number_of_tickets, account_number } = req.body;

        // Convert and validate input fields
        const formattedNumberOfTickets = parseFloat(number_of_tickets); // No need for .toFixed if working with raw numbers
        const formattedAccountNumber = parseFloat(account_number);

        const newBooking = await Booking.create({
            names,
            email,
            ticket_type,
            number_of_tickets: formattedNumberOfTickets,
            account_number: formattedAccountNumber,
        });

        const qrCodeData = `Booking ID: ${newBooking.id}\nName: ${names}\nTickets: ${number_of_tickets}`
        const qrCodeUrl = await QRCode.toDataURL(qrCodeData)

        await sendEmail(email, qrCodeUrl)

        res.status(200).json({ message: 'Booking created and email sent successfully!' });
    } catch (err) {
        console.error('Error creating booking:', err);
        res.status(400).json({ message: err.message });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid booking ID" });
        }
        const booking = await Booking.findByPk(id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });
        res.status(200).json(booking);
    } catch (err) {
        console.error('Error fetching booking by ID:', err);
        res.status(500).json({ message: err.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });
        const updatedBooking = await booking.update(req.body);  // Call update on the instance
        res.json(updatedBooking);
    } catch (err) {
        console.error('Error updating booking:', err);
        res.status(400).json({ message: err.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });
        await booking.destroy();  // Call destroy on the instance
        res.json({ message: "Booking deleted successfully" });
    } catch (err) {
        console.error('Error deleting booking:', err);
        res.status(500).json({ message: err.message });
    }
};
