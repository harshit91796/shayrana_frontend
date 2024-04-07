import React from 'react'
import './profile.css'
import TopBar from '../../components/TopBar'
import SideBar from '../../components/Sidebar/SideBar'
import RightBar from '../../components/rightBar/RightBar'
import Feed from '../../components/Feed/Feed'
import User from '../user/User'
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import MyPost from '../../pages/Home/myPost/MyPost'
import Saved from '../../pages/Home/saved/Saved'
import Tagged from '../../pages/Home/tagged/Tagged'
import Middle from '../../pages/Home/middleBlock/Middle'
import BottomBar from '../BottomBar/BottomBar'

function Profile({field}) {
  return (
    <div>
   
    <TopBar/>
    
    
    <div className="homeContainer">
    <SideBar/>
        <div className="userContainer">
        <User/>
        <div className="profileBottom">
        
          <BottomBar/>
    
     
         
    
    </div>
        </div>
    </div>
    
    </div>
  )
}

export default Profile