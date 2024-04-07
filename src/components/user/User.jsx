import React, { useContext, useState, useEffect } from 'react';
import './user.css';
import Share from '../../share/Share';
import Middle from '../../pages/Home/middleBlock/Middle';
import { Link } from 'react-router-dom';
import Saved from '../../pages/Home/saved/Saved';
import Tagged from '../../pages/Home/tagged/Tagged';
import MyPost from '../../pages/Home/myPost/MyPost';
import BottomBar from '../BottomBar/BottomBar';
import { AuthContext } from '../../context/authContext';
import { Add, Remove } from '@mui/icons-material';
import axiosInstance from '../../api';

function User({ user  }) {
//  console.log('hi',user)
  const { user: client } = useContext(AuthContext);
// console.log(client)
  if (!client || !user.data) {
    return <div className="loading">Loading...</div>;
  }
  // console.log('hi',client)
  // if (user === null) {
  //   return <div>Loading...</div>;
  // }
  
  // Rest of the component code
  // console.log(user.data.username);
  
  // console.log(user);
  // console.log(user.data?._id);

  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(client.data.followings.includes(user.data?._id));
  }, [client.data.followings, user.data?._id]);

  const handleClick = async () => {
    try {
      let updatedFollowed;
  
      if (followed) {
        await axiosInstance.put(`/${user.data._id}/unfollow`, {
          userId: client.data._id,
        });
        updatedFollowed = false;
      } else {
        await axiosInstance.put(`/${user.data._id}/follow`, {
          userId: client.data._id,
        });
        updatedFollowed = true;
      }
  
      // Update the state only if the API call is successful
      setFollowed(updatedFollowed);
    } catch (err) {
      console.error(err);
    }
  };
  
  if (!user.data) {
    return <div className="loading">loading</div>;
  }

  console.log(user.data.username);
  return (
    <div className="userWrapper">
      <div className="profileTop">
        <div className="profileTopLeft">
          <img src="/assets/person/nate.jpg" className="profileWall" alt="" />
          <div className="userDetail">
            {user.data.username !== client.data.username && (
              <button className="rightbarFollowButton" onClick={handleClick}>
                {followed ? 'Unfollow' : 'Follow'}
                {followed ? <Remove /> : <Add />}
              </button>
            )}
            <div className="userName">
              <span>{user.data.username}</span>
            </div>
            <div className="userName">
              <span> {user.data.followers.length} Followers  </span>
              
            </div>
            <div className="userName">
              <span>{user.data.followings.length} Following</span>
             
            </div>
            <div className="userName">
              <span>52 Notes</span>
              
            </div>
          </div>
        </div>
        <div className="profileTopRight">
             <div className='bio'>
               Bio
             </div>
             <div className='bioDisc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam tenetur maiores incidunt facere, dolorem libero perspiciatis eaque soluta vero velit. Nostrum aliquid corporis ea enim recusandae officiis natus dolor distinctio.</div>
        </div>
      </div>
    </div>
  );
}

export default User;
