import React, { useContext, useEffect, useRef, useState } from 'react';
import './topBar.css';

import { AuthContext } from '../context/authContext';
import axiosInstance from '../api';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AcUnit, Close, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function TopBar() {
  const { user } = useContext(AuthContext);
  // const username = user.username
  if(!user ){
    return <div className="loding">loding</div>
  }
//    else{
//      console.log(user)
//    }
console.log('userrrr',user.data.username)
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [clicked, setClicked] = useState(false);
  const searchRef = useRef(null);

  const handleClick = () => {
    setClicked(true);
    toggleDropdown();
    setTimeout(() => setClicked(false), 1000); // Reset the click state after 1 second
  };


  const handleBlur = () => {
    setTimeout(() => {
      if (!document.activeElement.classList.contains('close')) {
        setShowSearchResults(false);
      }
    }, 0);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearchResults(false);
    }
  };

  const closeSearch = () => {
    setShowSearchResults(false);
    setSearchResults([]);
    setSearchQuery('');
  };

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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='topBarContainer'>
      <div className='topBarLeft'>
        <Link to='/'>
          <img src='/assets/person/logo1.png' className='logoImg' alt='logo' />
        </Link>
      </div>
      <div className='topBarCenter'>
        <div className='searchBar' ref={searchRef}>
          {/* Search input */}
          <Search style={{ color: 'purple' }}/>
          <input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(); // Trigger search on every input change
            }}
            onBlur={handleBlur}
            placeholder='Search for friend, post, or video'
            className='searchInput'
          />
          {/* Close button */}
          <div className="close">
         {searchResults.length > 0 ? <Close style={{ color: 'purple' , marginLeft : '150px' }} onClick={closeSearch} /> : ""}
          </div>
          {/* Search button */}
          <button className='btn' onClick={handleSearch}>
            Search
          </button>
        </div>
        {/* Search results */}
        <div className={`searchResults ${showSearchResults ? 'visible' : 'hidden'}`}></div>
        {searchResults.length > 0 && (
          <div className='searchResults'>
            {searchResults.map((result) => (
              <Link to={`/profile/${result.username}/myPost`} key={result._id}>
                <div className='searchResultItem'>
                  <div className='pImage'>
                    <img src="../../../public/assets/person/1.jpg" alt="" />
                  </div>
                  <div className='sName'>{result.username}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className='topBarRight'>
        {/* Hamburger icon */}
        <div className='hamburgerMenu'>
        <div className={`hamburgerMenuIcon ${clicked ? 'clicked' : ''}`} onClick={handleClick}>
        <AcUnit style={{ fontSize: '40px' }} />
      </div>
          {/* Dropdown menu */}
          <div className={`hamburgerMenuDropdown ${showDropdown ? 'show' : ''}`}>
            {/* Dropdown items */}
            <div className='hamburgerMenuItem'>
              <Link to={`/messenger/${user.data.username}`} onClick={(e) => e.preventdefault()}>
                <ChatIcon style={{ marginRight: '10px', color: 'purple' }} />
                Chat
              </Link>
            </div>
            <div className='hamburgerMenuItem'>
              <PersonIcon style={{ marginRight: '10px', color: 'purple' }} />
              Person
            </div>
            <div className='hamburgerMenuItem'>
              <NotificationsIcon style={{ marginRight: '10px', color: 'purple' }} />
              Notifications
            </div>
          </div>
        </div>
        {/* Other elements */}
        <div className='topBarLinks'>
          <span className='topBarLink'>Homepage</span>
          <span className='topBarLink'>Timeline</span>
        </div>
        {/* Icons */}
        <div className='topBarIconItem'>
          <PersonIcon />
          <span className='topBarIconBadge'>1</span>
        </div>
        <Link to={`/messenger/${user.data.username}`} onClick={(e) => e.preventdefault()}>
          <div className='topBarIconItem'>
            <ChatIcon />
            <span className='topBarIconBadge'>2</span>
          </div>
        </Link>
        <div className='topBarIconItem'>
          <NotificationsIcon />
          <span className='topBarIconBadge'>1</span>
        </div>
        <Link to={`/profile/${user.data.username}/myPost`}>
          <img src='../../public/assets/person/nate.jpg' alt='' className='topBarImg' />
        </Link>
      </div>
    </div>
  );
}

export default TopBar;
