// SettingsScreen.js
import React from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import appConfig, { COLORS, SIZES, FONTS } from "../constants/appConfig";

const SettingsScreen = ({ navigation }) => {

    const navigateToScreen = (screenName) => {
        navigation.navigate('Home', { screen: screenName });
    };

    const logout = () => {
        // Lógica para cerrar sesión
        console.log("Logging out");
        // Puedes agregar aquí la lógica necesaria para cerrar sesión
        // Por ejemplo, llamar a la función de cerrar sesión en tu sistema de autenticación
    };

    const accountItems = [
        { icon: "security", text: "Security", screen: "Security" },
    ];

    const supportItems = [
        { icon: "help-outline", text: "Help & Support", screen: "Help & Support" },
        { icon: "info-outline", text: "Terms and Policies", screen: "Terms & Policies" },
    ];

    const actionItems = [
        { icon: "logout", text: " Log out", action: logout },
    ];

    const renderSettingsItem = ({ icon, text, screen, action }) => (
        <TouchableOpacity
            onPress={action ? action : () => navigateToScreen(screen)}
            style={styles.card}
        >
            <MaterialIcons name={icon} size={24} color={appConfig.COLORS.primary} style={styles.icon} />
            <Text style={styles.label}>{text}</Text>
        </TouchableOpacity>
    );

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
         Settings
        </Text>

                {/* Account */}
                <View style={styles.section}>
                    <Text style={{...appConfig.FONTS.h2, color: appConfig.COLORS.black}}>Account</Text>
                    {accountItems.map((item, index) => (
                        <React.Fragment key={index}>
                            {renderSettingsItem(item)}
                        </React.Fragment>
                    ))}
                </View>

                {/* Support and About */}
                <View style={styles.section}>
                <Text style={{...appConfig.FONTS.h2, color: appConfig.COLORS.black}}>Support & About</Text>
                    {supportItems.map((item, index) => (
                        <React.Fragment key={index}>
                            {renderSettingsItem(item)}
                        </React.Fragment>
                    ))}
                </View>

                {/* Actions Settings */}
                <View style={styles.section}>
                <Text style={{...appConfig.FONTS.h2, color: appConfig.COLORS.black}}>Actions & settings</Text>
                    {actionItems.map((item, index) => (
                        <React.Fragment key={index}>
                            {renderSettingsItem(item)}
                        </React.Fragment>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    section: {
        marginTop: SIZES.padding * 3,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        marginTop: SIZES.base * 1.5,
    },
    icon: {
        marginRight: SIZES.padding,
    },
    label: {
        fontWeight: "600",
        fontSize: SIZES.h3,
        color: COLORS.black,
    },
});

export default SettingsScreen;
