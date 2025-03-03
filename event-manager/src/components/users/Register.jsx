import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [client_name, setClientName] = useState('');
  const [client_email, setClientEmail] = useState('');
  const [client_password, setClientPassword] = useState('');
  const [error, setError] = useState('');  // For handling error messages
  const [success, setSuccess] = useState('');  // For handling success messages

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ client_name, client_email, client_password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('User registered successfully!');
        setError('');
        console.log('User registered successfully:', data);
        // Optionally, you can redirect or show a success message here
      } else {
        setError(data.message || 'Error registering user');
        setSuccess('');
        console.error('Error registering user:', data.message);
      }
    } catch (err) {
      setError('Server error occurred');
      setSuccess('');
      console.error('Server error:', err);
    }
  };

  return (
    <div className='flex flex-col w-full h-screen bg-[rgb(26,26,26)] justify-evenly items-center text-white'>
      <h1 className='text-4xl font-bold'>Welcome to <span className='text-[#FF9448] inline-block'>Connexity.</span></h1>
      <div className='flex flex-col py-10 px-14 w-full justify-between h-4/6 items-center'>
        <div className='w-1/4 h-14 flex justify-between px-2 items-center bg-[#373636] rounded-full'>
          <Link className='w-1/2 h-12 bg-[#ff9448] rounded-full flex justify-center items-center' to='/register'>REGISTER</Link>
          <Link className='w-1/2 h-12 rounded-full flex justify-center items-center' to='/enter'>ENTER</Link>
        </div>
        
        {/* Display success or error messages */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <form onSubmit={handleSubmit} className='flex flex-col items-center w-full h-5/6 justify-around'>
          <input 
            className="bg-[#373636] px-5 rounded-full w-1/3 h-14" 
            type="text" 
            placeholder='Enter Your Username'
            value={client_name} 
            onChange={(e) => setClientName(e.target.value)} 
            required
          />
          <input 
            className="bg-[#373636] px-5 rounded-full w-1/3 h-14 justify-between" 
            type="email" 
            placeholder="Enter Your Email" 
            value={client_email} 
            onChange={(e) => setClientEmail(e.target.value)} 
            required
          />
          <input 
            className="bg-[#373636] px-5 rounded-full w-1/3 h-14" 
            type="password" 
            placeholder='Enter Your Password' 
            value={client_password} 
            onChange={(e) => setClientPassword(e.target.value)} 
            required
          />
          <button 
            type='submit' 
            className='bg-[#ff9448] w-1/3 h-14 rounded-full text-white'
          >
            REGISTER
          </button>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default Register;
