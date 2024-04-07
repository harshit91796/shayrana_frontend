import React, { useContext, useEffect, useState } from 'react'
import "./feed.css"
import Share from '../../share/Share'
import Post from '../post/Post'
// import { Posts,Users } from '../../dummyData'
import axiosInstance from '../../api'
import { AuthContext } from '../../context/authContext'

function Feed() {
  const [posts,setPosts] = useState([]);

  const {user} = useContext(AuthContext)
  
  console.log(user.data._id)
  
  useEffect(() => {
    // Check if the user is logged in
    if (user) {
      console.log("User is logged in:", user);

      // Fetch posts or perform any actions that require user data here
      const fetchPosts = async () => {
        try {
          const res = await axiosInstance.get(`/timeline/${user.data._id}`); // Use user.id to fetch posts
          console.log(res.data);
          
           //  if(user){
  //   console.log(user.data.username)
  
  //  }else{
  //   console.log('not found')
  
  //  } 
          setPosts(res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          }));
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchPosts();
    } else {
      console.log('User is not logged in');
    }
  }, [user]); // Add user as a dependency so that this effect runs when user changes

  // console.log('there is nothing in the user')

  return (
    <div className='feed'>
  
        <div className="feedWrapper">
           <Share/>
          
            {posts.map((p)=>{
             return <Post key={p._id} post={p}/>
            })}
          
        

        </div>
    </div>
  )
}

export default Feed