import React, { createContext, useReducer, useContext, useEffect } from "react";
import { auth, db } from '../utils/firebase-config';
import { collection, getDocs, where, query } from 'firebase/firestore';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const initialState = {
    recordings: [],
  };

  const audioReducer = (state, action) => {
    switch (action.type) {
      case "SET_RECORDINGS":
        return { ...state, recordings: action.payload };
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

  useEffect(() => {
    const fetchUserRecordings = async () => {
      try {
        // Obtén el usuario actual desde Firebase Authentication
        const user = auth.currentUser;

        if (user) {
          // Cambia 'audioInfo' y 'userIdField' según la estructura de tu base de datos
          const q = query(collection(db, 'audioInfo'), where('userIdField', '==', user.uid));
          const querySnapshot = await getDocs(q);

          const userRecordings = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          dispatch({ type: 'SET_RECORDINGS', payload: userRecordings });
        }
      } catch (error) {
        console.error('Error al obtener las grabaciones del usuario:', error);
      }
    };

    fetchUserRecordings();
  }, []);

  return (
    <AudioContext.Provider value={{ state, dispatch }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio debe ser utilizado dentro de un AudioProvider");
  }
  return context;
};
