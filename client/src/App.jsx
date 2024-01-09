import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Pick from './pages/Pick'
import Play from './pages/Play'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pick" element={<Pick />} />
                <Route path="/login" element={<Login />} />
                <Route path="/play" element={<Play />} />
            </Routes>
        </BrowserRouter>
    )
}
