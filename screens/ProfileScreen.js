// ProfileScreen.js
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import appConfig from "../constants/appConfig";
import { Audio } from "expo-av";

const HealthProfileScreen = () => {
  const handleUploadAudio = () => {
    const [recording, setRecording] = React.useState();
    const [recordings, setRecordings] = React.useState([]);

    async function startRecording() {
      try {
        const perm = await Audio.requestPermissionsAsync();
        if (perm.status === "granted") {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true
          });
          const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
          setRecording(recording);
        }
      } catch (err) {}
    }

    async function stopRecording() {
      setRecording(undefined);
  
      await recording.stopAndUnloadAsync();
      let allRecordings = [...recordings];
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      allRecordings.push({
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI()
      });
  
      setRecordings(allRecordings);
    }

    function getDurationFormatted(milliseconds) {
      const minutes = milliseconds / 1000 / 60;
      const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
      return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
    }
  
    function getRecordingLines() {
      return recordings.map((recordingLine, index) => {
        return (
          <View key={index} style={styles.row}>
            <Text style={styles.fill}>
              Recording #{index + 1} | {recordingLine.duration}
            </Text>
            <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
          </View>
        );
      });
    }
  
    function clearRecordings() {
      setRecordings([])
    }  
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
              onPress={handleUploadAudio}
            >
              <FontAwesome5 name="microphone" style={styles.uploadIcon} />
              <Text style={styles.uploadText}>Upload Audio</Text>
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
    marginTop: 120,
  },
  uploadButton: {
    width: 200,
    height: 200,
    borderRadius: 100, // Forma circular
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
