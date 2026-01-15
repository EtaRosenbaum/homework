import React from 'react'
import './App.css'
import { useNavigate } from 'react-router'


export default function NoPageFound() {
  const navigate = useNavigate()

  return (
    <div className="NotFound">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or was moved.</p>
      <button className="BackButton" onClick={() => navigate('/')}>
        ← Back to Blogs
      </button>
    </div>  )
}
