import React from 'react'
import { NavLink } from 'react-router'
import Home from '../main-pages/Home'

export default function Navbar() {
  return (
    <div>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/contact'>Contact</NavLink>
    </div>
  )
}
