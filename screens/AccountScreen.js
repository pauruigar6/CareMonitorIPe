import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import appConfig from "../constants/appConfig";

import { auth, db } from "../utils/firebase-config";
import { collection, getDocs } from 'firebase/firestore';

const AccountScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    // Obtener datos de Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userInfo"));
        querySnapshot.forEach((doc) => {
          // Supongamos que solo hay un documento en la colección userInfo
          setUserData(doc.data());
        });
      } catch (error) {
        console.error("Error fetching user data from Firestore:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      // Cerrar sesión
      await auth.signOut();
      navigation.replace("Login"); // Redirige a la pantalla de inicio de sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

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

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  logoutButton: {
    backgroundColor: appConfig.COLORS.primary,
    borderRadius: 8,
    padding: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  logoutText: {
    color: appConfig.COLORS.white,
    fontSize: 16,
  },
});

export default AccountScreen;
