
import './App.css'
import Home from './pages/Home/Home'
import TopBar from './components/TopBar'
import dp from "/assets/person/dp.jpg"
import SideBar from './components/Sidebar/SideBar'
import RightBar from './components/rightBar/RightBar'
import { Feed } from '@mui/icons-material'
import Profile from './components/profile/Profile'
import Login from './pages/Home/Login/Login'
import Register from './pages/Home/register/Register'
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes,useNavigate, useParams } from 'react-router-dom'
import MyPost from './pages/Home/myPost/MyPost'
import Saved from './pages/Home/saved/Saved'
import Tagged from './pages/Home/tagged/Tagged'
import { useContext } from 'react'
import { AuthContext } from './context/authContext'
import Messenger from './pages/messenger/messenger'
import TestCode from './pages/messenger/TestCode'





function App() {
  // const {username} = useParams();
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();
  return (
 
  <>
      
       <Routes>
         <Route exact path='/' element= {user ? <Home /> : <Register />}/>
       </Routes>
       
       <Routes>
         <Route path='/profile/:username' element={<Profile/>}/>
       </Routes>
       <Routes>
         <Route path='/login' element={user ? navigate('/') : <Login />}/>
       </Routes>
       <Routes>
         <Route path='/register' element={user ? navigate('/') : <Register/>}/>
       </Routes>
       <Routes>
         <Route path='/profile/:username/myPost' element={<MyPost/>}/>
       </Routes>
       <Routes>
        <Route path='/profile/:username/saved' element={<Saved/>}/>
      </Routes>
      <Routes>
        <Route path='/profile/:username/tagged' element={<Tagged/>}/>
      </Routes>
      <Routes>
        <Route path='/messenger/:username' element={<Messenger/>}/>
      </Routes>
  </>
 

  

  )
}

export default App
