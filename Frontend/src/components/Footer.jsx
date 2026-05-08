// Footer.jsx
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 flex text-white flex-col items-center justify-center fixed bottom-0 w-full py-2'>
      <div className="logo font-bold text-2xl">
        <span className='text-blue-500'>&lt;</span>
        Pass
        <span className='text-blue-500'>OP/&gt;</span>
      </div>

      <div className='flex justify-center items-center'>
        Created with
        <img className='w-10 mx-2' src="/icons/heart.png" alt="heart icon" />
        By aadiiiiii
      </div>
    </div>
  )
}

export default Footer