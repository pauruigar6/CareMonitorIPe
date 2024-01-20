// ResultsScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import appConfig from "../constants/appConfig";
import { useAudio } from "../utils/AudioContext";
import { Audio } from "expo-av";

const ResultsScreen = () => {
  const { state, dispatch } = useAudio();
  const [sound, setSound] = useState();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const getDurationFormatted = (milliseconds) => {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10
      ? `${Math.floor(minutes)}:0${seconds}`
      : `${Math.floor(minutes)}:${seconds}`;
  };
  

  const handlePlayRecording = async (title, file) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: file },
        { shouldPlay: true }
      );
      setSound(newSound);
    } catch (error) {
      console.error("Error al reproducir el audio", error);
    }
  };

  const handleCardPress = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const showOptionsModal = () => {
    setOptionsModalVisible(true);
  };

  const hideOptionsModal = () => {
    setOptionsModalVisible(false);
  };

  const handleDeleteRecording = () => {
    dispatch({ type: "DELETE_RECORDING", payload: expandedIndex });
    hideOptionsModal();
  };

  const handleClearRecordings = () => {
    dispatch({ type: "CLEAR_RECORDINGS" });
    setExpandedIndex(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={{ ...appConfig.FONTS.h1, color: appConfig.COLORS.black }}>
          Results
        </Text>
        {state.recordings.map((recording, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handleCardPress(index)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.label}>{`Recording ${index + 1}`}</Text>
              <TouchableOpacity
                onPress={showOptionsModal}
                style={styles.optionsButton}
              >
                <FontAwesome5 name="ellipsis-h" style={styles.optionsIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={styles.durationText}>
                {getDurationFormatted(recording.duration)}
              </Text>
            </View>
            {expandedIndex === index && (
              <View style={styles.expandedContent}>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() =>
                    handlePlayRecording(
                      `Recording ${index + 1}`,
                      recording.file
                    )
                  }
                >
                  <FontAwesome5 name="play" style={styles.playIcon} />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))}
        {state.recordings.length > 0 && (
          <TouchableOpacity
            onPress={handleClearRecordings}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>Clear Recordings</Text>
          </TouchableOpacity>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={isOptionsModalVisible}
          onRequestClose={hideOptionsModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.optionsModal}>
              <TouchableOpacity
                onPress={() => {
                  hideOptionsModal();
                }}
                style={styles.closeModalButton}
              >
                <FontAwesome5 name="times" style={styles.closeModalIcon} />
              </TouchableOpacity>
              <View style={styles.modalCard}>
                <TouchableOpacity
                  onPress={handleDeleteRecording}
                  style={styles.optionButton}
                >
                  <Text style={{ color: "red" }}>Delete Audio</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appConfig.COLORS.background,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: appConfig.COLORS.white,
    borderRadius: 10,
    marginTop: 16,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  durationText: {
    fontSize: 16,
    color: appConfig.COLORS.gray,
  },
  playButton: {
    width: 35,
    height: 35,
    borderWidth: 1.5,
    borderColor: appConfig.COLORS.primary,
    borderRadius: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  playIcon: {
    fontSize: 15,
    padding: 5,
    color: appConfig.COLORS.primary,
  },
  clearButton: {
    backgroundColor: appConfig.COLORS.primary,
    borderRadius: 8,
    padding: 10,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  clearButtonText: {
    color: appConfig.COLORS.white,
    fontSize: 16,
  },
  expandedContent: {
    alignItems: "center",
  },
  optionsButton: {
    padding: 6,
    backgroundColor: appConfig.COLORS.modal,
    borderRadius: 20,
    width: 25,
    height: 25,
  },
  optionsIcon: {
    fontSize: 20,
    color: appConfig.COLORS.black,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  optionsModal: {
    backgroundColor: appConfig.COLORS.modal,
    padding: 16,
    width: appConfig.SIZES.width,
    flex: 1,
    marginTop: 660,
    justifyContent: "flex-end", 
  },
  modalCard: {
    backgroundColor: appConfig.COLORS.white,
    borderRadius: 10,
    marginBottom: 14,
    padding: 16,
  },
  closeModalButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  closeModalIcon: {
    fontSize: 15,
    color: appConfig.COLORS.black,
  },
  optionButton: {
    marginTop: 16,
  },
  optionsIcon: {
    fontSize: 12,
    color: appConfig.COLORS.black,
  },
  timestampText: {
    fontSize: 16,
    color: appConfig.COLORS.gray,
  },
});

export default ResultsScreen;
