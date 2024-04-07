import React, { useState, useEffect, useRef, useContext } from "react";
import axiosInstance from "../../api";
import TopBar from "../../components/TopBar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import io from "socket.io-client";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from '../../context/authContext'
import { Close } from "@mui/icons-material";

function Messenger() {
  console.log('rendered')
  const {user} = useContext(AuthContext);
  console.log(user.data._id)
  const userId = user.data._id
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    try {
      const response = await axiosInstance.get('/search', {
        params: { username: searchQuery },
      });

      setSearchResults(response.data);
      setShowSearchResults(response.data.length > 0);
    } catch (error) {
      console.error(error);
    }
  };
  const createConvo = async(reciever,sender,e) => {
    console.log('Creating conversation...');
    e.preventDefault()
      try {
       
        const response = await axiosInstance.post('/conversation',{
          senderId: sender,
          receiverId: reciever,
        });
        setConversations([...conversations, response.data]);
  
      // Set the current chat to the newly created conversation
      setCurrentChat(response.data);
  
      // Close the search results
      setShowSearchResults(false);
      setSearchQuery('');
      } catch (error) {
        console.error("Error creating conversations:", error);
      }
  };

  const handleBlur = () => {
    // Hide search results when the input field loses focus
    setShowSearchResults(false);
  };

  const closeSearch =()=>{
    setShowSearchResults(false);
    setSearchQuery('');
  }

  
  
  const socket = useRef(io("ws://localhost:8940"))

  useEffect(()=>{
   socket.current = io("ws://localhost:8940")
 
  },[])

  useEffect(()=>{
    socket.current.on("getMessage",(data) =>{
      setArrivalMessage({
       sender : data.senderId,
       text : data.text,
       createdAt : Date.now(),
      })
  })
  },[])

useEffect(()=>{
  arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
  setMessages((prev)=>[...prev,arrivalMessage])
},[arrivalMessage,currentChat]);

useEffect(()=>{
  socket.current.emit("addUser",userId)
  // socket.current.on("getUsers",(users)=>{
  //   // console.log(users)
  // })
 
},[])

  // console.log(socket)

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axiosInstance.get("/conversation/"+userId);
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    getConversations();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        try {
          const response = await axiosInstance.get("/message/" + currentChat._id);
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    getMessages();
  }, [currentChat]);

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage.trim() === "") return;

    const messageData = {
      sender: userId,
      conversationId: currentChat._id,
      text: newMessage,
    };

    try {
      const response = await axiosInstance.post("/message/", messageData);
      setMessages([...messages, response.data]);
      setNewMessage("");

      // Scroll to the latest message
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const receiverId = currentChat?.members.find((member)=> member !== userId)

  socket.current.emit("sendMessage",{
     senderId : userId,
     receiverId,
     text : newMessage,
  })

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  

  return (
    <>
      <TopBar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className="search">
              <input
                placeholder="Search for friends"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch(); // Trigger search on every input change
                }}
                onBlur={handleBlur}
                className="chatMenuInput"
              />
              {searchResults.length > 0 ? <Close onClick={closeSearch} /> : ""}
              <button className="btn" onClick={handleSearch}>
                Search
              </button>
            </div>
            <div
              className={`searchResults1 ${
                showSearchResults ? "visible" : "hidden"
              }`}
            >
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <Link
                  to={`/messenger/${user.data.username}`}
                  style={{ cursor: "pointer" }}
                  onMouseDown={(e) => {
                    console.log("Temporary log for click event:", e);
                    console.log("Clicked on user:", result._id);
                    createConvo(result._id, user.data._id, e);
                  }}
                  key={result._id}
                >
                  <div className="searchResultItem">
                    <div className="pImage">
                      <img src="../../../public/assets/person/1.jpg" alt="" />
                    </div>
                    <div className="sName">{result.username}</div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="noResults">No results found</div>
            )}
            
            </div>

            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={userId} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div key={m._id} ref={scrollRef}>
                      <Message message={m} own={m.sender === userId} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
