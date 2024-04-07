import React from 'react'
import User from '../../../components/user/User'
import Profile from '../../../components/profile/Profile'
import TopBar from '../../../components/TopBar'
import SideBar from '../../../components/Sidebar/SideBar'
import BottomBar from '../../../components/BottomBar/BottomBar'

function Saved() {
  return (
    <div>
    <div>
   
    <TopBar/>
    
    
    <div className="homeContainer">
    <SideBar/>
        <div className="userContainer">
        <User/>
        <div className="profileBottom">
    
          <BottomBar/>
    
      
    
    <div className="profileBottomBarDown">
         <h1>saved</h1>
            
          </div>
    
    </div>
        </div>
    </div>
    
    </div>
    </div>
  )
}

export default Saved
