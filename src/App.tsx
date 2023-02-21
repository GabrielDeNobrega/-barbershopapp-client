import { Button } from "react-bootstrap"
import { Route, Routes } from 'react-router-dom'
import Login from "./pages/Login"
import RegisterClient from "./pages/RegisterClient"
import Home from "./pages/Home"
import LandingPage from "./pages/LandingPage"
import Header from "./components/Header"
import React from "react"
import Footer from "./components/footer/Footer"

const App = () => {
  return (
    <div className="body">
      <Header></Header>
      <Routes>
        <Route path='' element={<LandingPage />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<RegisterClient />}></Route>
        <Route path='home' element={<Home />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App