import React, { useContext, useRef, useState, useEffect } from 'react';
import './share.css';
import { Audiotrack, EmojiEmotions, Label, Mic, Pause, PermMedia, Room } from '@mui/icons-material';
import { AuthContext } from '../context/authContext';
import axiosInstance from '../api';
import AudioModal from '../components/modal/audioModal/AudioModal';

function Share() {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [audioBlob, setAudioBlob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [file, setFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const recorder = useRef(null);
  const intervalId = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalId.current);
  }, []);

  const handleRecordAudio = async () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordTime(0);
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder.current = new MediaRecorder(audioStream);
      const chunks = [];

      recorder.current.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.current.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/mpeg' });
        setAudioBlob(audioBlob);
        setShowModal(true);
      };

      recorder.current.start();

      intervalId.current = setInterval(() => {
        setRecordTime((prevTime) => prevTime + 0.1);
      }, 100);
    } else {
      recorder.current.stop();
      setIsRecording(false);
      clearInterval(intervalId.current);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return (
      <span>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </span>
    );
  };

  const handleImageChange = (e) => {
    const imagfile = e.target.files[0];
    console.log('Selected file:', imagfile);
    const imageUrl = URL.createObjectURL(imagfile);
    setImageUrl(imageUrl);
    setImageFile(imagfile);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file);
    setFile(file);
    setAudioBlob(file);
    setShowModal(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user.data._id,
      desc: desc.current.value,
    };

    const formData = new FormData();
    formData.append('post', JSON.stringify(newPost));

    if (file) {
      const fileName = Date.now() + '.mp3';
      const fileBlob = new Blob([file], { type: file.type });
      formData.append('audio', fileBlob, fileName);
      newPost.audio = fileName;
    }

    if (imageUrl) {
      const fileName = Date.now() + '.jpg';
      formData.append('image', imageFile, fileName);
      newPost.img = fileName;
    }

    if (audioBlob) {
      const fileName = Date.now() + '.mp3';
      formData.append('audio', audioBlob, fileName);
      newPost.audio = fileName;
    }

    try {
      await axiosInstance.post('/createpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      window.location.reload();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className='share'>
      {showModal && <AudioModal audioBlob={audioBlob} imageUrl={imageUrl} onClose={() => setShowModal(false)} />}
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={'../../public/assets/person/nate.jpg'} className='feedImg' alt="Profile" />
          <input
            placeholder={"what's on your mind " + user.data.username}
            className='shareInput'
            ref={desc}
          />
        </div>
      </div>
      <hr className='shareHr' />
      <form className="shareBottom" onSubmit={submitHandler} encType="multipart/form-data">
        <div className="shareOptions">
          <label htmlFor='imageFile' className="shareOption">
            <PermMedia htmlColor='blue' className='shareIcon' />
            <span>Photos</span>
            <input
              name="image"
              style={{ display: "none" }}
              type='file'
              id='imageFile'
              accept='.png,.jpeg,.jpg'
              onChange={handleImageChange}
            />
          </label>

          <label className="shareOption">
            <Audiotrack htmlColor='green' className='shareIcon' />
            <span>Audio</span>
            <input
              name="audio"
              style={{ display: "none" }}
              type='file'
              id='audioFile'
              accept='.mp3,.mpeg'
              onChange={handleFileChange}
            />
          </label>

          <div className="shareOption">
            <button type="button" onClick={handleRecordAudio}>
              {isRecording ? (
                <div className="recordTime" >
                  <Pause className="shareIcon" htmlColor="red" />
                  <span >{formatTime(recordTime)}</span>
                </div>
              ) : (
                <div className="recordTime">
                  <Mic htmlColor="red" className="shareIcon" />
                  <span>Record</span>
                </div>
              )}
            </button>
          </div>

          <div className="shareOption">
            <EmojiEmotions htmlColor='yellow' className='shareIcon' />
            <span>Feelings</span>
          </div>
          <button className='shareButton' type='submit'>Share</button>
        </div>
      </form>
    </div>
  );
}

export default Share;
