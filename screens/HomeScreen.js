// HomeScreen.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Image } from "react-native";
import appConfig, { COLORS } from "../constants/appConfig";
import AccountScreen, {userData} from "./AccountScreen";
import ProfileScreen from "./ProfileScreen";
import ResultsScreen from "./ResultsScreen";
import SettingsScreen from "./SettingsScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const CustomHeader = ({ navigation }) => {
  return (
    <SafeAreaView style={{height: 130, backgroundColor: appConfig.COLORS.white}}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          backgroundColor: appConfig.COLORS.white,
          height: 80,
        }}
      >
        <Image
          source={require("../assets/logo.png")}
          style={{
            width: 30,
            height: 30,
            marginRight: 10,
            tintColor: appConfig.COLORS.black,
          }}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: appConfig.COLORS.black,
          }}
        >
          Care Monitor
        </Text>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AccountScreen")}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: appConfig.COLORS.primary,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: COLORS.white, fontSize: 18 }}>
                {userData.name.split("")[0]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        style: { backgroundColor: appConfig.COLORS.white },
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        tabBarStyle: { height: 80 },
        tabBarActiveTintColor: appConfig.COLORS.primary,
      }}
    >
      <Tab.Screen
        name="HealthProfile"
        component={ProfileScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="heartbeat" size={size} color={color} solid />
          ),
          tabBarLabel: route.name === "HealthProfile" ? "Health Profile" : null,
        })}
      />
      <Tab.Screen
        name="Results"
        component={ResultsScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="chart-bar" size={size} color={color} solid />
          ),
          tabBarLabel: route.name === "Results" ? "Results" : null,
        })}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="cog" size={size} color={color} solid />
          ),
          tabBarLabel: route.name === "Settings" ? "Settings" : null,
        })}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
