import React from 'react'
import {LuSlidersHorizontal} from 'react-icons/lu'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { TbCircleLetterA } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const currentDate = new Date();
  const navigate = useNavigate();

  // Get the day, month, and year
  const day = currentDate.toLocaleString('en-us', { weekday: 'long' }); // e.g., "Monday"
  const month = currentDate.toLocaleString('en-us', { month: 'short' }); // e.g., "October"
  const date = currentDate.getDate(); // e.g., 3

  return (
    <div className='bg-gradient-to-b from-[#677572] to-[#ff9448] py-20 w-full flex flex-col justify-center items-center'>
        <div className='h-full w-full px-40 flex items-center justify-center mb-32'>
            <div className='flex flex-col h-full w-2/3 justify-center'> 
                <h1 className='text-white text-4xl mb-16'>Connexify </h1>
                <h1 className='text-white text-9xl text-center'>{day}.</h1>
                <h1 className='text-white text-9xl text-center'>{date} {month}</h1>
            </div>
            <div className='w-1/3 h-full flex flex-col items-center text-white items- mr-32'>
                <div className="h-52 w-52 rounded-full bg-[url('https://i.pinimg.com/enabled/236x/ac/3b/22/ac3b2220c16e4e55195388551ab8baf8.jpg')]"></div>
                <h2 className='text-4xl mt-4'>Jakarta, IDN</h2>
            </div>
        </div>
        <div className="w-full px-40 flex justify-around mb-5"> 
            <div className='text-white flex justify-center'>
                <button className='py-6 px-14 bg-[#1a1a1a] rounded-full mr-5'>Today</button>
                <button className='py-6 px-14 border-white border rounded-full'>Calendar</button>
            </div>
            <div className='mr-14'> 
                <button onClick={() => navigate('/add-event')} className='text-6xl flex justify-center h-16 w-16 rounded-full bg-[#ff9448] text-black'>+</button>
            </div>
        </div>
        <div className='w-full px-40 flex justify-center mb-32'>
            <div className='w-3/5 flex justify-end'>
                <input className="bg-white bg-opacity-30 text-black font-light w-9/12 px-10 py-6 rounded-full" Value="Search Event"/>
            </div>
            <div className='w-1/4 flex justify-center ml-8 mr-32'>
                <div className='text-4xl flex items-center justify-center h-16 w-16 rounded-full bg-[#ff9448] text-black'>
                    <LuSlidersHorizontal/>
                </div>
            </div>
        </div>

        <h1 className='text-white text-6xl text-center'>Visit <span className='font-bold'>events</span> based on your interest </h1>

        <div className="flex w-full px-40 justify-start gap-32 ml-10 m-20 text-white text-2xl">
            <p className='underline'>All</p>
            <p>Music</p>
            <p>Sports</p>
            <p>Hobbies</p>
            <p>Games</p>
        </div>

        <div className="w-9/12 mb-20 rounded-[100px] flex justify-around px-40 h-[950px] bg-cover bg-center bg-[#1a1a1a]">
            <div className="flex flex-col justify-between py-16 text-white">
                <h1 className='text-4xl'>Tickets Available</h1>
                <div className='felx flex-col'>
                    <h1 className='text-8xl mb-8 font-bold'>Michael William <br></br>Solo Tour</h1>
                    <h1 className='bg-white py-6 px-16 flex justify-evenly bg-opacity-15 w-96 text-center text-2xl rounded-full'> <TbCircleLetterA  className='inline size-8'/> Jakarta Hall</h1>                    
                </div>
            </div>
            <div className="text-white flex flex-col justify-between py-16">
                <h1 className='text-5xl text-center leading-8'>80% <br></br><span className='text-2xl'>Ticket Books</span></h1>
                <div className='flex w-80 items-center justify-between'>
                    <button className='bg-white w-24 h-24 rounded-full flex justify-center items-center'><FaPlay className='text-black size-10' /></button>
                    <div className='w-52 h-52 bg-[#ff9448] flex flex-col justify-center items-center rounded-full'>
                        <h1 className='text-8xl leading-[5rem] text-black flex flex-col items-center'>18 <span className='text-4xl'>{month}</span></h1>
                    </div>                    
                </div>
            </div>
        </div>

        <div className="w-9/12 mb-20 rounded-[100px] flex justify-around px-40 h-[950px] bg-cover bg-center bg-[#1a1a1a]">
            <div className="flex flex-col justify-between py-16 text-white">
                <h1 className='text-4xl'>Tickets Available</h1>
                <div className='felx flex-col'>
                    <h1 className='text-8xl mb-8 font-bold'>Michael William <br></br>Solo Tour</h1>
                    <h1 className='bg-white py-6 px-16 flex justify-evenly bg-opacity-15 w-96 text-center text-2xl rounded-full'> <TbCircleLetterA  className='inline size-8'/> Jakarta Hall</h1>                    
                </div>
            </div>
            <div className="text-white flex flex-col justify-between py-16">
                <h1 className='text-5xl text-center leading-8'>80% <br></br><span className='text-2xl'>Ticket Books</span></h1>
                <div className='flex w-80 items-center justify-between'>
                    <button className='bg-white w-24 h-24 rounded-full flex justify-center items-center'><FaPlay className='text-black size-10' /></button>
                    <div className='w-52 h-52 bg-[#ff9448] flex flex-col justify-center items-center rounded-full'>
                        <h1 className='text-8xl leading-[5rem] text-black flex flex-col items-center'>18 <span className='text-4xl'>{month}</span></h1>
                    </div>                    
                </div>
            </div>
        </div>

        <div className="w-9/12 mb-20 rounded-[100px] flex justify-around px-40 h-[950px] bg-cover bg-center bg-[#1a1a1a]">
            <div className="flex flex-col justify-between py-16 text-white">
                <h1 className='text-4xl'>Tickets Available</h1>
                <div className='felx flex-col'>
                    <h1 className='text-8xl mb-8 font-bold'>Michael William <br></br>Solo Tour</h1>
                    <h1 className='bg-white py-6 px-16 flex justify-evenly bg-opacity-15 w-96 text-center text-2xl rounded-full'> <TbCircleLetterA  className='inline size-8'/> Jakarta Hall</h1>                    
                </div>
            </div>
            <div className="text-white flex flex-col justify-between py-16">
                <h1 className='text-5xl text-center leading-8'>80% <br></br><span className='text-2xl'>Ticket Books</span></h1>
                <div className='flex w-80 items-center justify-between'>
                    <button className='bg-white w-24 h-24 rounded-full flex justify-center items-center'><FaPlay className='text-black size-10' /></button>
                    <div className='w-52 h-52 bg-[#ff9448] flex flex-col justify-center items-center rounded-full'>
                        <h1 className='text-8xl leading-[5rem] text-black flex flex-col items-center'>18 <span className='text-4xl'>{month}</span></h1>
                    </div>                    
                </div>
            </div>
        </div>

        <div className="w-9/12 mb-20 rounded-[100px] flex justify-around px-40 h-[950px] bg-cover bg-center bg-[#1a1a1a]">
            <div className="flex flex-col justify-between py-16 text-white">
                <h1 className='text-4xl'>Tickets Available</h1>
                <div className='felx flex-col'>
                    <h1 className='text-8xl mb-8 font-bold'>Michael William <br></br>Solo Tour</h1>
                    <h1 className='bg-white py-6 px-16 flex justify-evenly bg-opacity-15 w-96 text-center text-2xl rounded-full'> <TbCircleLetterA  className='inline size-8'/> Jakarta Hall</h1>                    
                </div>
            </div>
            <div className="text-white flex flex-col justify-between py-16">
                <h1 className='text-5xl text-center leading-8'>80% <br></br><span className='text-2xl'>Ticket Books</span></h1>
                <div className='flex w-80 items-center justify-between'>
                    <button className='bg-white w-24 h-24 rounded-full flex justify-center items-center'><FaPlay className='text-black size-10' /></button>
                    <div className='w-52 h-52 bg-[#ff9448] flex flex-col justify-center items-center rounded-full'>
                        <h1 className='text-8xl leading-[5rem] text-black flex flex-col items-center'>18 <span className='text-4xl'>{month}</span></h1>
                    </div>                    
                </div>
            </div>
        </div>

        <div className="w-9/12 mb-20 rounded-[100px] flex justify-around px-40 h-[950px] bg-cover bg-center bg-[#1a1a1a]">
            <div className="flex flex-col justify-between py-16 text-white">
                <h1 className='text-4xl'>Tickets Available</h1>
                <div className='felx flex-col'>
                    <h1 className='text-8xl mb-8 font-bold'>Michael William <br></br>Solo Tour</h1>
                    <h1 className='bg-white py-6 px-16 flex justify-evenly bg-opacity-15 w-96 text-center text-2xl rounded-full'> <TbCircleLetterA  className='inline size-8'/> Jakarta Hall</h1>                    
                </div>
            </div>
            <div className="text-white flex flex-col justify-between py-16">
                <h1 className='text-5xl text-center leading-8'>80% <br></br><span className='text-2xl'>Ticket Books</span></h1>
                <div className='flex w-80 items-center justify-between'>
                    <button className='bg-white w-24 h-24 rounded-full flex justify-center items-center'><FaPlay className='text-black size-10' /></button>
                    <div className='w-52 h-52 bg-[#ff9448] flex flex-col justify-center items-center rounded-full'>
                        <h1 className='text-8xl leading-[5rem] text-black flex flex-col items-center'>18 <span className='text-4xl'>{month}</span></h1>
                    </div>                    
                </div>
            </div>
        </div>

    </div>
  )
}

export default Dashboard
