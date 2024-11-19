import React, { useState } from 'react';
import { FaArrowRightLong, FaCheck } from "react-icons/fa6";

const EventCreation = () => {
  const [currentStep, setCurrentStep] = useState(1); // Step state (1, 2, 3)
  const [completedSteps, setCompletedSteps] = useState([]); // Track completed steps
  const [errors, setErrors] = useState({}); // Validation errors

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    address: '',
    // keywords: [], // Event keywords array
    companyName: '',
    companyAddress: '',
    contact: '',
    standardTicket: '',
    premiumTicket: '',
    ticketNumber: '',
    paymentMode: '',
  });

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '', // Clear any existing error for this field when it changes
    });
  };

  // Validation function for each step
  const validateStep = () => {
    let newErrors = {};
    if (currentStep === 1) {
      if (!formData.companyName) newErrors.companyName = 'Company name is required';
      if (!formData.companyAddress) newErrors.companyAddress = 'Company address is required';
      if (!formData.contact) newErrors.contact = 'Contact is required';
    } else if (currentStep === 2) {
      if (!formData.title) newErrors.title = 'Event title is required';
      if (!formData.description) newErrors.description = 'Event description is required';
      if (!formData.date) newErrors.date = 'Event date is required';
      if (!formData.time) newErrors.time = 'Event time is required';
      if (!formData.address) newErrors.address = 'Event address is required';
      // if (formData.keywords.length === 0) newErrors.keywords = 'At least one keyword is required';
    } else if (currentStep === 3) {
      if (!formData.standardTicket) newErrors.standardTicket = 'Standard ticket price is required';
      if (!formData.premiumTicket) newErrors.premiumTicket = 'Premium ticket price is required';
      if (!formData.paymentMode) newErrors.paymentMode = 'Payment mode is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Function to move to the next step
  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < 3) {
        setCompletedSteps([...completedSteps, currentStep]); // Mark the step as completed
        setCurrentStep(currentStep + 1);
      }
    }
  };

  // Function to move to the previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setCompletedSteps(completedSteps.filter(step => step !== currentStep - 1)); // Remove completion of the previous step
    }
  };

  

  // Helper function to check if a step is completed
  const isStepCompleted = (step) => {
    return completedSteps.includes(step);
  };

  // In handleEventSubmit
  const handleEventSubmit = async (eventData) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create event');
      }
  
      // Parse the JSON response to get the event data, including the event ID
      const result = await response.json();
      console.log('Event created successfully:', result);
      return result.event.id; // Return the event ID to be used in subsequent requests
    } catch (error) {
      console.error('Error creating event:', error);
      throw error; // Re-throw to handle in main function
    }
  };
  


  // Submit Host Data
  const handleHostSubmit = async (hostData) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/hosts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hostData),
      });

      if (!response.ok) {
        throw new Error('Failed to create host');
      }

      const result = await response.json();
      console.log('Host created successfully:', result);
    } catch (error) {
      console.error('Error creating host:', error);
    }
  };

  // Submit Payment Data
  const handlePaymentSubmit = async (paymentData) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment');
      }

      const result = await response.json();
      console.log('Payment created successfully:', result);
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    if (validateStep()) {
      try {
        // 1. Submit event data and retrieve event ID
        const eventId = await handleEventSubmit({
          title: formData.title,
          description: formData.description,
          date: formData.date,
          time: formData.time,
          address: formData.address,
        });
  
        if (!eventId) throw new Error("Event ID not received");
  
        // 2. Use the retrieved eventId for host submission
        const hostResponse = await handleHostSubmit({
          companyName: formData.companyName,
          companyAddress: formData.companyAddress,
          contact: formData.contact,
          eventId: eventId, // Use the eventId here
        });
  
        if (!hostResponse) throw new Error("Host data submission failed");
  
        // 3. Use the retrieved eventId for payment submission
        const paymentResponse = await handlePaymentSubmit({
          standardTicket: formData.standardTicket,
          premiumTicket: formData.premiumTicket,
          paymentMode: formData.paymentMode,
          ticketNumber: formData.ticketNumber,
          eventId: eventId, // Use the eventId here
        });
  
        if (!paymentResponse) throw new Error("Payment data submission failed");
  
        console.log("All data submitted successfully");
  
      } catch (error) {
        console.error("Error in data submission:", error);
      }
    }
  };
  
 
  return (
    <div className='bg-gradient-to-b from-[#677572] to-[#ff9448] h-screen pt-20 w-full text-white'>
      <div className='w-full px-20 mb-20'>
        <h1 className='text-center text-7xl'>Craft Event</h1>
      </div>

      <div className='w-full bg-[#1a1a1a] pt-32 rounded-t-[8rem] flex flex-col items-center justify-center'>
        {/* Step indicators */}
        <div className='w-1/2 text-black flex justify-between items-center'>
          {/* Step 1 */}
          <div className="flex items-center justify-center">
            <button className={`rounded-full ${currentStep >= 1 ? 'border-[#ff9448] border-8 text-white text-6xl w-48 h-48 bg-transparent' : 'bg-[#ff9448] w-32 h-32 text-3xl' } font-semibold flex justify-center items-center`}>
              {isStepCompleted(1) ? <FaCheck /> : '1'}
            </button>
          </div>

          {/* Step 2 */}
          <div className="flex items-center justify-center">
            <button className={`rounded-full ${currentStep >= 2 ? 'border-[#ff9448] border-8 text-white text-6xl w-48 h-48 bg-transparent' : 'bg-[#ff9448] w-32 h-32 text-3xl' } font-semibold flex justify-center items-center`}>
              {isStepCompleted(2) ? <FaCheck /> : '2'}
            </button>
          </div>

          {/* Step 3 */}
          <div className="flex items-center justify-center">
            <button className={`rounded-full ${currentStep >= 3 ? 'border-[#ff9448] border-8 text-white text-6xl w-48 h-48 bg-transparent' : 'bg-[#ff9448] w-32 h-32 text-3xl' } font-semibold flex justify-center items-center`}>
              {isStepCompleted(3) ? <FaCheck /> : '3'}
            </button>
          </div>
        </div>

        {/* Step 1: Host Information */}
        {currentStep === 1 && (
          <div className='w-full py-10 px-20 flex mt-20'>
            <div className='w-1/2 h-[900px] gap-10 flex flex-col'>
              <h1 className='text-6xl font-semibold'>Intro</h1>
              <h2 className='text-4xl'>1. Event Host(s)</h2>
              <div className='w-11/12 h-[700px] rounded-[3rem] overflow-hidden'>
                <img src="https://images.pexels.com/photos/6883805/pexels-photo-6883805.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Host" className='w-full h-full object-cover' />
              </div>
            </div>
            <div className='w-1/2 flex flex-col justify-around'>

              <div className='w-full px-10 flex flex-col'>
                <label className='text-2xl opacity-50'>Company Name</label>
                <input className="border-collapse bg-transparent outline-none border-b-2 border-white border-opacity-50 mb-8 py-5" type='text' name="companyName" onChange={handleChange} />
                {errors.companyName && <span className="text-red-500">{errors.companyName}</span>}
                
                <label className='text-2xl opacity-50'>Company Address</label>
                <input className="border-collapse bg-transparent outline-none border-b-2 border-white border-opacity-50 mb-8 py-5" type='text' name="companyAddress" onChange={handleChange} />
                {errors.companyAddress && <span className="text-red-500">{errors.companyAddress}</span>}
                
                <label className='text-2xl opacity-50'>Contact</label>
                <input className="border-collapse bg-transparent outline-none border-b-2 border-white border-opacity-50 mb-8 py-5" type='text' name="contact" onChange={handleChange} />
                {errors.contact && <span className="text-red-500">{errors.contact}</span>}
              </div>

              <div className='w-full mt-5 flex items-end justify-end'>
              <button
                onClick={handleNext}
                className="bg-[#ff9448] w-40 h-20 flex items-center justify-center rounded-full"
              >
                <FaArrowRightLong className="text-black" size={40} />
              </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Event Details */}
        {currentStep === 2 && (
          <div className='w-full py-10 px-20 flex justify-between mt-20'>
            {/* Left side content */}
            <div className='w-1/2 h-[900px] gap-10 flex flex-col'>
              <h1 className='text-6xl font-semibold'>Event Information</h1>
              <h2 className='text-4xl'>2. Event Details</h2>
              <div className='w-11/12 h-[700px] rounded-[3rem] overflow-hidden'>
                <img src="https://images.pexels.com/photos/6883805/pexels-photo-6883805.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Event" className='w-full h-full object-cover' />
              </div>
            </div>

            {/* Right side form */}
            <div className='flex flex-col justify-evenly w-1/2'>
              <div className='w-full px-10 flex flex-col'>
                <label className='text-2xl opacity-50'>Title</label>
                <input name="title" value={formData.title} onChange={handleChange} className="border-collapse bg-transparent outline-none border-b-2 border-white border-opacity-50 mb-8 py-5 w-full" required />
                {errors.title && <span className="text-red-500">{errors.title}</span>}

                <label className='text-2xl opacity-50'>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="border-collapse bg-transparent outline-none border-b-2 border-white border-opacity-50 mb-8 py-5 w-full" required />
                {errors.description && <span className="text-red-500">{errors.description}</span>}

                <label className='text-2xl opacity-50'>Date</label>
                <input name="date" value={formData.date} onChange={handleChange} type='date' className="border-collapse bg-transparent outline-none border-b-2 border-white border-opacity-50 mb-8 py-5 w-full" required />
                {errors.date && <span className="text-red-500">{errors.date}</span>}

                <label className='text-2xl opacity-50'>Time</label>
                <input name="time" value={formData.time} onChange={handleChange} type='time' className="border-collapse bg-transparent outline-none border-b-2 border-white border-opacity-50 mb-8 py-5 w-full" required />
                {errors.time && <span className="text-red-500">{errors.time}</span>}

                <label className='text-2xl opacity-50'>Address</label>
                <input name="address" value={formData.address} onChange={handleChange} type='text' className="border-collapse bg-transparent outline-none border-b-2 border-white border-opacity-50 mb-8 py-5 w-full" required />
                {errors.address && <span className="text-red-500">{errors.address}</span>}

                {/*<label className='text-2xl opacity-50'>Keywords</label>
                  <input
                    name="keywords"
                    value={formData.keywords.join(', ')}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value.split(', ') })}
                    className="border-collapse bg-transparent outline-none border-b-2 border-white border-opacity-50 mb-8 py-5 w-full"
                  />
                  {errors.keywords && <span className="text-red-500">{errors.keywords}</span>}
                */}

              </div>

              <div className='w-full mb-5 flex items-end justify-between'>
                <button onClick={handlePrevious} className="bg-transparent border-2 border-white text-white w-40 h-20 flex items-center justify-center rounded-full">
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="bg-[#ff9448] w-40 h-20 flex items-center justify-center rounded-full"
                >
                  <FaArrowRightLong className="text-black" size={40} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment and Summary */}
        {currentStep === 3 && (
          <div className='w-full py-10 px-20 flex justify-between mt-20'>
            <div className='w-1/2 h-[900px] gap-10 flex flex-col'>
              <h1 className='text-6xl font-semibold'>Finalize Event</h1>
              <h2 className='text-4xl'>3. Payment</h2>
              <div className='w-11/12 h-[700px] rounded-[3rem] overflow-hidden'>
                <img src="https://images.pexels.com/photos/6883805/pexels-photo-6883805.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Payment" className='w-full h-full object-cover' />
              </div>
            </div>
            <div className='flex flex-col justify-evenly w-1/2'>

              <div className='w-full px-10 flex flex-col'>
                <label className='text-2xl opacity-50'>Standard Ticket Price</label>
                <input name="standardTicket" value={formData.standardTicket} onChange={handleChange} className="border-collapse bg-transparent outline-none border-b-2 border-white border-opacity-50 mb-8 py-5 w-full" required />
                {errors.standardTicket && <span className="text-red-500">{errors.standardTicket}</span>}

                <label className='text-2xl opacity-50'>Premium Ticket Price</label>
                <input name="premiumTicket" value={formData.premiumTicket} onChange={handleChange} className="border-collapse bg-transparent outline-none border-b-2 border-white border-opacity-50 mb-8 py-5 w-full" required />
                {errors.premiumTicket && <span className="text-red-500">{errors.premiumTicket}</span>}

                <label className='text-2xl opacity-50'>Number of Tickets </label>
                <input name="ticketNumber" value={formData.ticketNumber} onChange={handleChange} className="border-collapse bg-transparent outline-none border-b-2 border-white border-opacity-50 mb-8 py-5 w-full" required />
                {errors.ticketNumber && <span className="text-red-500">{errors.ticketNumber}</span>}

                <label className='text-2xl opacity-50'>Payment Mode</label>
                <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className="border-collapse bg-transparent outline-none border-b-2 border-white border-opacity-50 mb-8 py-5 w-full" required>
                  <option value="">Select Payment Mode</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
                {errors.paymentMode && <span className="text-red-500">{errors.paymentMode}</span>}
              </div>

              <div className='w-full mb-5 flex items-end justify-between'>
                <button onClick={handlePrevious} className="bg-transparent border-2 border-white text-white w-40 h-20 flex items-center justify-center rounded-full">
                  Back
                </button>
                <button onClick={handleSubmit} className="bg-[#ff9448] w-40 h-20 flex items-center justify-center rounded-full">
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCreation;
