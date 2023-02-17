import { Button } from "react-bootstrap"
import { Route, Routes } from 'react-router-dom'
import Login from "./pages/Login"
import RegisterClient from "./pages/RegisterClient"
import Home from "./pages/Home"
import LandingPage from "./pages/LandingPage"
import Header from "./components/Header"
const App = () => {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='' element={<LandingPage />}>

        </Route>

        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<RegisterClient />}></Route>
        <Route path='home' element={<Home />}></Route>
      </Routes>
    </>
  )
}

export default App