import { Chat, Close, Notifications, Person, Search } from '@mui/icons-material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import './topBar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import axiosInstance from '../api'

function TopBar() {
     //  const name1 = 'harshit rajput'
     const {user} = useContext(AuthContext)
     // const username = user.username
     if(!user ){
          return <div className="loding">loding</div>
        }
     //    else{
     //      console.log(user)
     //    }
     console.log(user.data.username)

     const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  const handleBlur = () => {
    // Hide search results when the input field loses focus
    setTimeout(() => {
      if (!document.activeElement.classList.contains("close")) {
        setShowSearchResults(false);
      }
    }, 0);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearchResults(false);
    }
  };
  

  const closeSearch =()=>{
    setShowSearchResults(false);
    setSearchQuery('');
  }

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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
     
  return (
    <div className='topBarContainer'>
       <div className='topBarLeft'>
           <Link to='/'>
             <img src='/assets/person/logo1.png' className='logoImg'/>
           </Link>
       </div>
       <div className='topBarCenter'>
         <div className="searchBar" ref={searchRef}>
         <Search color='warning'/>
         <input value={searchQuery}
         onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch(); // Trigger search on every input change
        }}
        onBlur={handleBlur}
          placeholder='search for friend , post or video' className='searchInput'/>
          <div className="close">
         {searchResults.length > 0 ? <Close style={{ color: 'purple' , marginLeft : '150px' }} onClick={() => setShowSearchResults(false)} /> : ""}
          </div>
         <button className='btn' onClick={handleSearch} >Search</button>
         </div>
         <div
              className={`searchResults ${
                showSearchResults ? "visible" : "hidden"
              }`}
            ></div>
         {searchResults.length > 0 && (
          <div className='searchResults' >
            {searchResults.map((result) => (
              <Link to={`/profile/${result.username}/myPost`} onClick={(e) => e.preventdefault()} key={result._id}>
                <div className='searchResultItem'>
                <div className="pImage">
                 <img src="../../../public/assets/person/1.jpg" alt="" />
                </div>
                <div className="sName">
                {result.username}
                </div>
                
                </div>
              </Link>
            ))}
          </div>
        )}
       </div>
       <div className='topBarRight'>
           <div className='topBarLinks'>
                <span className='topBarLink'>Homepage</span>
                <span className='topBarLink'>Timeline</span>
           </div>
           <div className='topBarIconItem'>
                <Person/>
                <span className='topBarIconBadge'>1</span>
           </div>
           <Link to={`/messenger/${user.data.username}`} onClick={(e) => e.preventdefault()}>
           <div className='topBarIconItem'>
           <Chat/>
           <span className='topBarIconBadge'>2</span>
      </div>
           </Link>
          
           <div className='topBarIconItem'>
                <Notifications/>
                <span className='topBarIconBadge'>1</span>
           </div>
           <Link to={`/profile/${user.data.username}/myPost`} onClick={(e) => e.preventdefault()}><img src='../../public/assets/person/nate.jpg' alt='' className='topBarImg'/>
           </Link>

       </div>
    </div>
  )
}

export default TopBar