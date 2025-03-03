import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Navigate} from 'react-router-dom'

const EventUpdate = () => {

    
    const { id } = useParams(); // Get the event ID from the URL
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // To redirect after submission

    useEffect(() => {
        // Fetch event data by ID
        fetch(`http://127.0.0.1:5000/api/events/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setFormData(data); // Set the form data once the API call is successful
            setLoading(false);
          })
          .catch((err) => {
            setError("Failed to fetch event data");
            setLoading(false);
          });
    }, [id]);

    const handleChange = (e) => {
        // Update form data when user changes input
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Send the updated data to the backend using PUT or PATCH request
        fetch(`http://127.0.0.1:5000/api/events/${id}`, {
          method: 'PUT', // Or use 'PATCH' if it's a partial update
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((updatedEvent) => {
            // Handle the success response after submitting data
            console.log('Event updated successfully:', updatedEvent);
            navigate(`/dashboard`); // Redirect to the event detail page
          })
          .catch((err) => {
            // Handle error while submitting
            console.error('Failed to update event:', err);
            setError('Failed to update event');
          });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="bg-gradient-to-b from-[#677572] to-[#ff9448] py-20 w-full text-white">
          <form onSubmit={handleSubmit} className='flex flex-col w-full items-center justify-center'>
            <div className=' flex w-1/2 flex-col'>
              <h1 className="text-center">Event Details</h1>
              <label className='m-4'>Event Name</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className='p-4 bg-white bg-opacity-30 text-white rounded-full outline-none'
              />
              <label className='m-4'>Description</label>
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                className='p-4 bg-white bg-opacity-30 text-white rounded-full outline-none'
              />
              <label className='m-4'>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className='p-4 bg-white bg-opacity-30 text-white rounded-full outline-none'
              />
              <label className='m-4'>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className='p-4 bg-white bg-opacity-30 text-white rounded-full outline-none'
              />
              <label className='m-4'>Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className='p-4 bg-white bg-opacity-30 text-white rounded-full outline-none'
              />
            </div>
            <div className=' flex w-1/2 flex-col'>
              <h1 className="text-center mt-20">Company & Payment</h1>
              <label className='m-4'>Company Name</label>
              <input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className='p-4 bg-white bg-opacity-30 text-white rounded-full outline-none'
              />
              <label className='m-4'>Company Address</label>
              <input
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                className='p-4 bg-white bg-opacity-30 text-white rounded-full outline-none'
              />
              <label className='m-4'>Contact</label>
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className='p-4 bg-white bg-opacity-30 text-white rounded-full outline-none'
              />
              <label className='m-4'>Standard Ticket Price</label>
              <input
                name="standardTicket"
                value={formData.standardTicket}
                onChange={handleChange}
                className='p-4 bg-white bg-opacity-30 text-white rounded-full outline-none'
              />
              <label className='m-4'>Premium Ticket Price</label>
              <input
                name="premiumTicket"
                value={formData.premiumTicket}
                onChange={handleChange}
                className='p-4 bg-white bg-opacity-30 text-white rounded-full outline-none'
              />
              <label className='m-4'>Mode of Payment</label>
              <input
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
                className='p-4 bg-white bg-opacity-30 text-white rounded-full outline-none'
              />
            </div>
            <button type="submit" className='mt-20 bg-black bg-opacity-50 p-6 rounded-lg '>Update Event</button>
          </form>
        </div>
    );
}

export default EventUpdate