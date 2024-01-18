// AudioContext.js
import React, { createContext, useReducer, useContext } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const initialState = {
    recordings: [],
  };

  const audioReducer = (state, action) => {
    switch (action.type) {
      case "ADD_RECORDING":
        const newRecording = { ...action.payload, timestamp: Date.now() };
        return { ...state, recordings: [...state.recordings, newRecording] };
      case "CLEAR_RECORDINGS":
        return { ...state, recordings: [] };
      case "DELETE_RECORDING":
        return {
          ...state,
          recordings: state.recordings.filter((_, i) => i !== action.payload),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(audioReducer, initialState);

  return (
    <AudioContext.Provider value={{ state, dispatch }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
