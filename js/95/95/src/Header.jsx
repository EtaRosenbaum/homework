import React from 'react'
import { Link } from 'react-router'
import './App.css'
export default function Header() {
  return (
      <header className="header">
          <nav className="nav">
              <Link to={'/'} className="nav-link">Home</Link>
              <Link to={'/cart'} className="nav-link">Cart</Link>
          </nav>
      </header>
  )
}
