import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className="mycontainer flex justify-around items-center px-4 py-0 h-20">
     <div className="logo font-bold text-2xl ">
        <span className='text-blue-500'>&lt;</span>
        Pass
        <span className='text-blue-500'>OP/&gt;</span>
        </div>
      {/* <ul>
        <li className='flex gap-4 ' > 
       <a  className='hover:font-bold'  href="/">Home</a>
       <a className='hover:font-bold'  href="/about">About</a>
       <a  className='hover:font-bold' href="/services">Services</a>
       <a  className='hover:font-bold' href="/contact">Contact</a>

       </li></ul> */}
       <button className='text-white bg-slate-800 hover:bg-blue-700 my-5 rounded-3xl p-1 flex gap-4 items-center cursor-pointer outline ring-1 ring-white'>
        <img className='invert py-1 w-8 ' src='/icons/github.svg' alt='github logo'/>
       <span className='font-bold'> Github</span>
       </button>
   
       </div>
    </nav>
  )
}

export default Navbar
