import React from 'react'
import "./rightBar.css"
import {Users} from '../../dummyData'
import Online from '../online/Online'

function RightBar() {
  return (
    <div className='rightBar'>
        <div className="onlineFriend">
        <h4 className="rightbarTitle">User friends</h4>
       <ul className='rightBarFriendList'>
       {Users.map((u)=>(
        <Online key={u.id} user={u}/>
       ))}
       </ul>
        

    </div>
    </div>
  )
}

export default RightBar