import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {

   const location = useLocation(); 
   const path = location.pathname;

   return (
      <header className="header">
         <h1><Link to='/'> workout dashboard</Link></h1>
         <nav><ul>
            <li><Link to='/login' className={`${path === '/login' ? 'active' : ''}`}>login</Link></li>
            <li><Link to='/register' className={`${path === '/register' ? 'active' : ''}`}>registro</Link></li>
         </ul></nav>
      </header>
   )
}

export default Header
