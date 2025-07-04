import React from 'react'
import logo from '../Movielogo.png'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex items-center space-x-8 border p-4'>
      <img className='w-[50px]' src={logo} alt="logo" />
      <Link to='/' className='text-blue-500 text-2xl font-bold'>Movies</Link>
      <Link to='/watchlist' className='text-blue-500 text-2xl font-bold'>Watchlist</Link>
    </div>
  )
}

export default Navbar
