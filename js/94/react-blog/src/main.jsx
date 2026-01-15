import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Blogs from './Blogs.jsx'
import Posts from './Posts.jsx'
import NoPageFound from './NoPageFound.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Blogs />} />
          <Route path='/posts/:userId' element={<Posts />} />
          <Route path='*' element={<NoPageFound />} />

        </Route>
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
