import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Projects from './pages/projects'
import Tasks from './pages/tasks'

const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Projects />} />
      <Route path={'/tasks'} element={<Tasks />} />
    </Routes>
  )
}

export default App
