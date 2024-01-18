// ProfileScreen.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import appConfig from '../constants/appConfig';
import { Audio } from 'expo-av';
import { useAudio } from '../utils/AudioContext';

const HealthProfileScreen = () => {
  const { dispatch } = useAudio();
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    return () => {
      stopRecording(); 
    };
  }, []);

  const startRecording = async () => {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
      }
    } catch (err) {}
  };

  const stopRecording = async () => {
    if (recording) {
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      const newRecording = {
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI(),
      };
      dispatch({ type: 'ADD_RECORDING', payload: newRecording });
      setRecordings([...recordings, newRecording]);
    }
  };

  const getDurationFormatted = (milliseconds) => {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10
      ? `${Math.floor(minutes)}:0${seconds}`
      : `${Math.floor(minutes)}:${seconds}`;
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: appConfig.COLORS.background }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={{
          flex: 1,
          backgroundColor: appConfig.COLORS.background,
        }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Health Profile</Text>
          <View style={styles.btn}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={recording ? stopRecording : startRecording}
            >
              <FontAwesome5
                name={recording ? 'stop' : 'microphone'}
                style={styles.uploadIcon}
              />
              <Text style={styles.uploadText}>
                {recording ? 'Stop Recording' : 'Start Recording'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    ...appConfig.FONTS.h1,
    color: appConfig.COLORS.black,
    marginBottom: 16,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 125,
  },
  uploadButton: {
    width: 200,
    height: 200,
    borderRadius: 100, 
    backgroundColor: appConfig.COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadIcon: {
    fontSize: 60,
    color: appConfig.COLORS.white,
  },
  uploadText: {
    marginTop: 10,
    fontSize: 16,
    color: appConfig.COLORS.white,
  },
});

export default HealthProfileScreen;
