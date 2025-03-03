import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/booking'; // Update with your backend URL

export const getBookings = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const createBooking = async (bookingData) => {
    console.log('Booking Data:', bookingData); // Debugging: log the data
    try {
        const response = await axios.post(BASE_URL, bookingData);
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error.response.data); // Log the detailed error response
        throw error;
    }
};

export const getBookingById = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
};

export const updateBooking = async (id, bookingData) => {
    const response = await axios.put(`${BASE_URL}/${id}`, bookingData);
    return response.data;
};

export const deleteBooking = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
};
