import React, { useEffect, useState } from 'react'
import './conversation.css'
import axiosInstance from '../../api';

function Conversation({conversation,currentUser}) {
  const [user,setUser] = useState(null)

useEffect(()=>{
    const friend = conversation.members.find((m)=> m !== currentUser);

    const getUser = async ()=>{
      try {
        const res = await axiosInstance(`/${friend}`)
        setUser(res.data)
        // console.log(res.data) 
      } catch (error) {
       console.log(error) 
      }
      
    }
    getUser();
    // console.log(user.data.username)  
},[conversation,currentUser])

  return (
    <div className="conversation">
    <img
      className="conversationImg"
      src='/assets/person/nate.jpg'
      alt=""
    />
    <span className="conversationName">{user?.data?.username}</span>
  </div>
  )
}

export default Conversation
