import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className='bg-[#1a1a1a] px-20 h-screen w-full flex flex-col'>
      <h1 className="text-7xl w-[795px] h-3/5 text-white flex flex-col justify-center">
        <span className="text-[#FF9448] inline-block">Connect, Engage,</span> Bringing people together.
      </h1>
      <button className='bg-[#ff9448] w-1/4 h-14 rounded-full flex items-center justify-center font-bold' onClick={() => setShowModal(true)}>
        GET STARTED
      </button>

      {showModal && (
        <div className = "absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className='bg-white rounded-lg p-8 flex flex-col items-center gap-4 shadow-lg'>
            <h2 className='text-2xl font-bold text-[#1a1a1a]'>Choose your portal</h2>
            <Link 
              className='bg-[#ff9448] w-48 h-12 rounded-full font-bold text-white flex justify-center items-center' 
              to = "/page-two"
            >
              Admin Portal
            </Link>
            <Link 
              className='bg-[#ff9448] w-48 h-12 rounded-full font-bold text-white flex justify-center items-center' 
              to = "/page-three"
            >
              User Portal
            </Link>
            <button 
              className='bg-gray-300 w-48 h-12 rounded-full font-bold text-[#1a1a1a]'
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Homepage