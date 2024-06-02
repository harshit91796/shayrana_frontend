import React, { useContext, useEffect, useState } from 'react';
import User from '../../../components/user/User';
import Profile from '../../../components/profile/Profile';
import TopBar from '../../../components/TopBar';
import SideBar from '../../../components/Sidebar/SideBar';
import BottomBar from '../../../components/BottomBar/BottomBar';
import axiosInstance from '../../../api';
import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import './myPost.css';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import { AudioContext } from '../../../context/audioContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 300,
}));

function MyPost() {
  const { username } = useParams();
  const { user: client } = useContext(AuthContext);
  const { dispatch: audioDispatch } = useContext(AudioContext);
  const [user, setUser] = useState({});
  const [userPost, setUserPost] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/${username}`);
        const userpost = await axiosInstance.get(`/profile/${username}`);
        setUser(res.data);
        setUserPost(userpost.data || []);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchUser();
  }, [username]);

  const handlePlayAudio = (audio) => {
    audioDispatch({
      type: 'PLAY_AUDIO',
      payload: { audioUrl: audio.audioUrl, audioDesc: audio.desc },
    });
  };

  return (
    <>
      <div>
        <TopBar />
        <div className="homeContainer">
          <SideBar />
          <div className="userContainer">
            <User user={user} />
            <div className="bb">
              <BottomBar username={username} />
            </div>
            <div className="list">
              <Box sx={{ width: '100%' }}>
                <List dense={false}>
                  {userPost.length > 0 ? (
                    userPost.map((audio) => (
                      <ListItem onClick={() => handlePlayAudio(audio)} key={audio._id} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <ListItemAvatar >
                          <Avatar src={audio.imgUrl} alt={audio.desc} />
                        </ListItemAvatar>
                        <audio  src={audio.audioUrl} style={{ marginLeft: 16, marginRight: 16, flexGrow: 1 }} />
                        <ListItemText primary={'kgjgjgjgy'} />
                      </ListItem>
                    ))
                  ) : (
                    <div className="loading">There's no audio post.</div>
                  )}
                </List>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPost;
