import React from 'react'

export default function Footer() {
  return (
    <>
    <div className='footer bg-gray-100 p-5 mt-11'>
      <h2 className=' text-[30px] '>Get the FreshCart app</h2>
      <p className=''>We will send You a link, open it on your phone to downlod the app</p>
      <input className='rounded-md mt-2 p-1 text-black w-full md:w-[70%]' placeholder='Email..'/>
      <button type="button" className="text-white md:ms-2 bg-green-700 mt-2 md:mt-0  border border-green-400  focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2   ">Share App Link</button>
      <h2 className=''>Get deliveries with FreshCart</h2>
      <button className='text-white bg-green-700 px-3 py-2 rounded-md me-2  '>
      <i className="fa-brands  w-5 h-5 me-2 -ms-1 fa-apple"></i>App Store
      </button>
      <button className='text-white bg-green-700 px-3 py-2 rounded-md '>
      <i className="fa-brands w-5 h-5 me-2 -ms-1 fa-google-play"></i>google play
      </button>

       
    </div>
    </>
  )
}

