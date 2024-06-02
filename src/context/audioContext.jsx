// src/context/AudioContext.js

import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
  audioUrl: null,
  isPlaying: false,
  audioDesc: '',
};

const AudioReducer = (state, action) => {
  switch (action.type) {
    case 'PLAY_AUDIO':
      return {
        audioUrl: action.payload.audioUrl,
        isPlaying: true,
        audioDesc: action.payload.audioDesc,
      };
    case 'STOP_AUDIO':
      return {
        ...state,
        isPlaying: false,
      };
    default:
      return state;
  }
};

export const AudioContext = createContext(INITIAL_STATE);

export const AudioContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AudioReducer, INITIAL_STATE);

  return (
    <AudioContext.Provider
      value={{
        audioUrl: state.audioUrl,
        isPlaying: state.isPlaying,
        audioDesc: state.audioDesc,
        dispatch,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
