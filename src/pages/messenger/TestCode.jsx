import axiosInstance from '../../api';
import TopBar from '../../components/TopBar';
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import './messenger.css';

import React from 'react'

function TestCode() {
  const [conversation,setConversation] = useState([])
  const [currentChat,setCurrentChat] = useState(null)
  const [message,setMessage] = useState([])


  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axiosInstance.get("/conversation/64edb1de3969397b9138dc02");
        const data = response.data;
        // console.log("API Response Data:", data);
        setConversation(data);
      } catch (err) {
        console.error("API Request Error:", err);
      }
    };
    getConversation();
  }, []);


  return (
    <>
        <TopBar/>
        <div className="messenger">
           <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder='search a friend' className='chatMenuInput' />
                    {conversation.map((c)=>{
            
                      return  <div onClick={()=>setCurrentChat(c)}> <Conversation conversation={c} currentUser = {"64edb1de3969397b9138dc02"}/></div>
                     })}
                </div>
           </div>
           <div className="chatBox">
                <div className="chatBoxWrapper">
                {
                  currentChat ?
                  <>
                      <div className="chatBoxTop">
                          <Message/>
                      </div>
                      <div className="chatBoxBottom">
                          <textarea className='chatMessageInput' placeholder='write something ...'></textarea>
                          <button className='chatSubmitButton'>send</button>
                      </div> </> : <span>open a conversation</span> }
                </div>
           </div>

           
        </div>
    </>
  )
}

export default TestCode
