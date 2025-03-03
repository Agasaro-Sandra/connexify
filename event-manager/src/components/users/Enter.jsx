import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Enter = () => {
  const [client_email, setEmail] = useState('');
  const [client_password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/enter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ client_email, client_password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Logged in successfully!');
        setError(null);
        
        // After successful login, navigate to the dashboard
        navigate('/landing'); // Redirect to dashboard
      } else {
        setError(data.message || 'Login failed');
        setSuccess(null);
      }
    } catch (err) {
      setError('Something went wrong, please try again');
      setSuccess(null);
    }
  };

  return (
    <div className='flex flex-col w-full h-screen bg-[rgb(26,26,26)] justify-evenly items-center text-white'>
      <h1 className='text-4xl font-bold'>Welcome to <span className='text-[#FF9448] inline-block'>Connexity.</span></h1>
      <div className='flex flex-col py-10 px-14 w-full justify-between h-3/6 items-center'>
        <div className='w-1/4 h-14 flex justify-between px-2 items-center bg-[#373636] rounded-full'>
          <Link className='w-1/2 h-12 rounded-full flex justify-center items-center' to='/register'>REGISTER</Link>
          <Link className='w-1/2 h-12 bg-[#ff9448] rounded-full flex justify-center items-center' to='/enter'>ENTER</Link>
        </div>
        
        {/* Display success or error messages */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <form onSubmit={handleSubmit} className='flex flex-col items-center w-full h-4/6 justify-around'>
          <input 
            className="bg-[#373636] px-5 rounded-full w-1/3 h-14 justify-between" 
            type="email" 
            placeholder="Enter Your Email" 
            value={client_email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <input 
            className="bg-[#373636] px-5 rounded-full w-1/3 h-14" 
            type="password" 
            placeholder='Enter Your Password' 
            value={client_password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          {/* Changed from Link to button for form submission */}
          <button 
            type='submit' 
            className='bg-[#ff9448] w-1/3 h-14 rounded-full text-white'
          >
            ENTER 
          </button>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default Enter;
