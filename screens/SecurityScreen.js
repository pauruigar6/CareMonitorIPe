import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const SecurityScreen = () => {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [passcodeEnabled, setPasscodeEnabled] = useState(false);

  const toggleBiometric = () => {
    setBiometricEnabled(!biometricEnabled);
  };

  const togglePasscode = () => {
    setPasscodeEnabled(!passcodeEnabled);
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Enable Biometric Authentication</Text>
        <Switch
          value={biometricEnabled}
          onValueChange={toggleBiometric}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={() => Alert.alert('Security settings saved.')}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SecurityScreen;
