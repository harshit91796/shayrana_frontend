import React, { useContext } from 'react'
import "./sideBar.css"
import { Bookmark, Group, HelpOutline, PlayCircleFilledOutlined, WorkOutline } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext';

function SideBar() {
    const authToken = localStorage.getItem('authToken');
    const { logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = (e) => {
        
        logout()
        
        // Navigate to the login page after logging out
        navigate('/login');
    };

  return (
    <div className='sideBar'>
        <div className="sideBarWrapper">
            <ul className="sideBarList">
                <li className="sideBarListItem">
                       <PlayCircleFilledOutlined className='sideBarIcon'/>
                       <span  className='sideBarListItemText'>Play</span>
                </li>
                <li className="sideBarListItem">
                      <Group className='sideBarIcon'/>
                      <span className='sideBarListItemText'>Group</span>
                </li>
                <li className="sideBarListItem">
                     <Bookmark className='sideBarIcon'/>
                     <span className='sideBarListItemText'>Bookmark</span>
                </li>
                <li className="sideBarListItem">
                    <HelpOutline className='sideBarIcon'/>
                    <Link style={{color : 'inherit' }} to="/login" className="sideBarListItemText" onClick={handleLogout}>
                    <span className='sideBarListItemText' >Logout</span>
                  </Link>
                  
                </li>
                
                <li className="sideBarListItem">
                    <WorkOutline className='sideBarIcon'/>
                    <Link style={{color : 'inherit' }} to='/profile'><span className='sideBarListItemText'>Profile</span></Link>
                </li>
                
               
            </ul>
            <button className="sideButton">Show more</button>
            <hr className="sideBarHr" />
            <ul className="sideBarFriendList">
                    <li className="sideBarFriend">
                        <img src="/assets/person/dp.jpg" className='sideBarFriendImg'/>
                        <span>friend</span>
                    </li>

                <li className="sideBarFriend">
                    <img src="/assets/person/dp.jpg" className='sideBarFriendImg'/>
                    <span>friend</span>
                </li>

                <li className="sideBarFriend">
                  <img src="/assets/person/dp.jpg" className='sideBarFriendImg'/>
                  <span>friend</span>
                </li>

            <li className="sideBarFriend">
                <img src="/assets/person/dp.jpg" className='sideBarFriendImg'/>
                <span>friend</span>
            </li>
                 
            <li className="sideBarFriend">
            <img src="/assets/person/dp.jpg" className='sideBarFriendImg'/>
            <span>friend</span>
        </li>

        <li className="sideBarFriend">
        <img src="/assets/person/dp.jpg" className='sideBarFriendImg'/>
        <span>friend</span>
    </li>
            
            </ul>
        </div>
    </div>
  )
}

export default SideBar