// ResultsScreen.js
import React from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import appConfig, { COLORS, SIZES } from "../constants/appConfig";

const ResultsScreen = () => {
  // Simulación de datos de grabaciones
  const recordingsData = [
    { title: "Recording 1", duration: "2:30" },
    { title: "Recording 2", duration: "1:45" },
    { title: "Recording 3", duration: "3:15" },
    // Agrega más grabaciones según sea necesario
  ];

  const handlePlayRecording = (title) => {
    // Lógica para reproducir la grabación según el título
    console.log(`Playing recording: ${title}`);
    // Puedes agregar aquí la lógica necesaria para reproducir la grabación
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={{ ...appConfig.FONTS.h1, color: appConfig.COLORS.black }}>
          Results
        </Text>
        {recordingsData.map((recording, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.recordingInfo}>
              <Text style={styles.label}>{recording.title}</Text>
              <Text style={styles.value}>Duration: {recording.duration}</Text>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => handlePlayRecording(recording.title)}
              >
                <FontAwesome5 name="play" style={styles.playIcon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  recordingInfo: {
    marginLeft: 10,
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
  },
  icon: {
    fontSize: 16,
    color: appConfig.COLORS.primary,
    marginBottom: 10,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: appConfig.COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  playIcon: {
    fontSize: 20,
    color: "#FFF",
  },
});

export default ResultsScreen;
