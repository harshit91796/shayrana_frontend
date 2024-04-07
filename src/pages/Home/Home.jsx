import React, { useContext } from 'react'
import './home.css'
import TopBar from '../../components/TopBar'
import SideBar from '../../components/Sidebar/SideBar'
import RightBar from '../../components/rightBar/RightBar'
import Feed from '../../components/Feed/Feed'
import { AuthContext } from '../../context/authContext'



function Home() {
  // const {user} = useContext(AuthContext)
  // console.log(user)
  return (
    <div>
    <TopBar />
    <div className="homeContainer">
    <SideBar/>
    <Feed/>
    <RightBar/>
    </div>
    
    </div>
  )
}

export default Home