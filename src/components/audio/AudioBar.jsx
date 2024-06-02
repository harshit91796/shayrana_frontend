// src/components/AudioBar.js

import React, { useContext, useEffect, useRef } from 'react';

import './AudioBar.css';
import { AudioContext } from '../../context/audioContext';

const AudioBar = () => {
  const { audioUrl, isPlaying, audioDesc, dispatch } = useContext(AudioContext);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, audioUrl]);

  const handlePausePlay = () => {
    if (isPlaying) {
      dispatch({ type: 'STOP_AUDIO' });
    } else {
      dispatch({ type: 'PLAY_AUDIO', payload: { audioUrl, audioDesc } });
    }
  };

  if (!audioUrl) return null;

  return (
    <div className="audioBar">
      <div className="audioDesc">{audioDesc}</div>
      <audio controls ref={audioRef} src={audioUrl} />
      <button onClick={handlePausePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default AudioBar;
