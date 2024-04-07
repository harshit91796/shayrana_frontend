import React, { useContext, useEffect, useState } from 'react'
import User from '../../../components/user/User'
import Profile from '../../../components/profile/Profile'
import TopBar from '../../../components/TopBar'
import SideBar from '../../../components/Sidebar/SideBar'
import BottomBar from '../../../components/BottomBar/BottomBar'
import axiosInstance from '../../../api';
// import { Grid3x3, Rowing } from '@mui/icons-material'
import { Box, Grid, ListItem } from '@mui/material'
import './myPost.css'
// import { red } from '@mui/material/colors'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Posts, Users } from '../../../dummyData'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/authContext'



const Item = styled(Paper)(({ theme }) => ({
  
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height : 300,
  
}));

function MyPost() {

  const {username} = useParams();
  const { user : client } = useContext(AuthContext);
  // if(!username){
  //   return <div className="loding">loding</div>
  // }
  // console.log(username)
   
  const [user,setUser] = useState({});
  const [userPost,setUserPost] = useState([]);

  // console.log(user)

  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/${username}`);
        
        const userPost = await axiosInstance.get(`/profile/${username}`);

        console.log(res.data)
         
        setUser(res.data);
        setUserPost(userPost.data || []);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  fetchUser();
  },[])

  return (
   <>
   <div>
   
 
   <TopBar/>
   
   <div className="homeContainer">
   <SideBar/>
       <div className="userContainer">
       <User user={user}  />
      
      <div className="bb">
         <BottomBar/>
      </div>

      <div className="grid">
      <Box  sx={{ flexGrow: 1 }} >
      <Grid container spacing={0.5} padding={4} marginLeft={5} >
      
      {userPost.length > 0 ? (
        userPost.map((post) => (
          <Grid item xs={12} sm={3.5} key={post._id}>
            <Item>
              <img src={`/assets/person/1.jpg`} className="imgProfile" />
            </Item>
          </Grid>
        ))
      ) : (
        <div className="loading">theres no post</div>
      )}
    
       
        </Grid>
        </Box>
      
      </div>
       
 
       </div>
   </div>
   
   </div>
   
   </>   
    
   
     
  
    
  )
}

export default MyPost
