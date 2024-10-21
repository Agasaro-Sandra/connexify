import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className='bg-[#1a1a1a] px-20 h-screen w-full flex flex-col'>
       <h1 className='text-7xl w-[795px] h-3/5 text-white flex flex-col justify-center'><span className = "text-[#FF9448] inline-block">Connect, Engage,</span> Bringing people together.</h1> 
       <Link className='bg-[#ff9448] w-1/4 h-14 rounded-full flex items-center justify-center font-bold' to="/page-two">GET STARTED</Link>
    </div>
  )
}

export default Homepage