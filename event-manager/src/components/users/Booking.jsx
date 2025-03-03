import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { createBooking } from '../../../../backend/services/bookingService'

const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
        names: formData.names,
        email: formData.email,
        ticket_type: formData.ticket_type,
        number_of_tickets: parseFloat(formData.number_of_tickets).toFixed(2),
        account_number: parseFloat(formData.account_number).toFixed(2),
    };

    console.log('Submitting booking data:', bookingData);

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/booking`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
            throw new Error('Failed to create booking');
        }

        navigate('/landing');
        alert('Booking created successfully, check your email for your QR code!');
    } catch (error) {
        console.error('Error creating booking:', error);
    }
};


const Booking = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState ({
        names: '',
        email: '', 
        ticket_type: 'Premium Ticket',
        number_of_tickets: 1,
        account_number: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const bookingData = {
            names: formData.names,
            email: formData.email,
            ticket_type: formData.ticket_type,
            number_of_tickets: parseFloat(formData.number_of_tickets).toFixed(2), // Convert to decimal with 2 places
            account_number: parseFloat(formData.account_number).toFixed(2), // Convert to decimal with 2 places
        };
    
        console.log('Submitting booking data:', bookingData); // Log before sending
    
        try {
            await createBooking(bookingData);
            navigate('/landing')
            alert('Booking created successfully, check your email for your QR code!');
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };
    

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gradient-to-b from-[#677572] to-[#ff9448]'>
        <div className='bg-[#1a1a1a] rounded-lg w-2/6 p-10 flex flex-col justify-center items-center text-white'>
            <h1 className='text-white text-4xl'>Get Your Ticket</h1>        
            <form onSubmit={handleSubmit} className='flex flex-col justify-around items-center w-5/6'>
                <label className='mt-8 text-lg mb-5 w-full text-start'>Your Names</label>
                <input name='names' type='text' onChange={handleChange} className='bg-transparent border-2 border-[#677572] rounded-lg p-3 w-full' />
                <label className='mt-8 text-lg mb-5 w-full text-start'>Email</label>
                <input name='email' type='email' onChange={handleChange} className='bg-transparent border-2 border-[#677572] rounded-lg p-3 w-full' />
                <label className='mt-8 text-lg mb-5 w-full text-start'>Select Ticket Type</label>
                <select name="ticket_type" onChange={handleChange} className='bg-transparent border-2 border-[#677572] rounded-lg p-3 w-full' >
                    <option value="Premium Ticket">Premium Ticket</option>
                    <option value="Standard Ticket">Standard Ticket</option>                
                </select>
                <label className='mt-8 text-lg mb-5 w-full text-start'>Number of Tickets</label>
                <input name='number_of_tickets' onChange={handleChange} type='number' min="1" max="10" placeholder="Enter tickets (1-10)"  className='bg-transparent border-2 border-[#677572] rounded-lg p-3 w-full' />
                <label className='mt-8 text-lg mb-5 w-full text-start'>Account Number</label>
                <input name='account_number' type='number' onChange={handleChange} className='bg-transparent border-2 border-[#677572] rounded-lg p-3 w-full' />
                <button type='submit' className='bg-[#ff9448] rounded-lg py-5 px-8 mt-8'> Book Ticket </button>
            </form>
        </div>
    </div>
  )
}

export default Booking
