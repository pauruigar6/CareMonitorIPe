// AccountScreen.js
import React from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import appConfig, { COLORS, SIZES } from "../constants/appConfig";

export const userData = {
    name: "Paula Ruiz",
    email: "pauulaning@gmail.com",
    recordings: 10,
  };

const AccountScreen = () => {

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: appConfig.COLORS.background }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: appConfig.COLORS.background,
          padding: 16,
        }}
      >
        <Text style={{ ...appConfig.FONTS.h1, color: appConfig.COLORS.black }}>
          My Account
        </Text>
        <View style={styles.card}>
          <FontAwesome5 name="user" solid style={styles.icon} />
          <View style={styles.userInfo}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{userData.name}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <FontAwesome5 name="envelope" solid style={styles.icon} />
          <View style={styles.userInfo}>
            <Text style={styles.label}>Email Address:</Text>
            <Text style={styles.value}>{userData.email}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <FontAwesome5 name="microphone" solid style={styles.icon} />
          <View style={styles.userInfo}>
            <Text style={styles.label}>Recordings:</Text>
            <Text style={styles.value}>{userData.recordings}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 16,
    padding: 16,
  },
  userInfo: {
    marginBottom: 16,
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
    marginRight: 10,
    fontSize: 16,
    color: appConfig.COLORS.primary,
    marginBottom: 10,
  },
});

export default AccountScreen;
