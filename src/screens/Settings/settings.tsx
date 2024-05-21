import React, { useState, useEffect } from "react";
import styles from "./settingsStyle";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const Settings = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [newPasswordVisible, setNewPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentEmail, setCurrentEmail] = useState<string>("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && user.email) {
      setCurrentEmail(user.email);
    }
  }, []);

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleNewPasswordChange = (text: string) => {
    setNewPassword(text);
  };

  const reauthenticate = async (currentPassword: string): Promise<boolean> => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      try {
        console.log("Reauthenticating with email:", user.email);
        await reauthenticateWithCredential(user, credential);
        console.log("Reauthentication successful");
        return true;
      } catch (error) {
        console.error("Error reauthenticating:", error);
        Alert.alert("Error", "Current password is incorrect or invalid.");
        return false;
      }
    } else {
      console.log("User is not authenticated");
      return false;
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "The new passwords do not match.");
      return;
    }

    if (await reauthenticate(currentPassword)) {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          await updatePassword(user, newPassword);
          Alert.alert("Success", "Password updated successfully!");
          setNewPassword("");
          setConfirmPassword("");
        } catch (error) {
          console.error("Error updating password:", error);
          Alert.alert("Error", "Failed to update password.");
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Settings</Text>

        <View style={styles.inputRow}>
          <Ionicons name="mail" size={24} color="#007bff" style={styles.icon} />
          <TextInput
            style={[styles.inputField, { color: "gray" }]}
            value={currentEmail}
            placeholder="Current email"
            editable={false}
          />
        </View>

        <View style={styles.inputRow}>
          <Ionicons
            name="lock-closed"
            size={24}
            color="#007bff"
            style={styles.icon}
          />
          <TextInput
            style={styles.inputField}
            onChangeText={setCurrentPassword}
            value={currentPassword}
            placeholder="Enter current password"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputRow}>
          <Ionicons
            name="lock-closed"
            size={24}
            color="#007bff"
            style={styles.icon}
          />
          <TextInput
            style={styles.inputField}
            onChangeText={handleNewPasswordChange}
            value={newPassword}
            placeholder="Enter new password"
            secureTextEntry={!newPasswordVisible}
          />
          <TouchableOpacity
            onPress={toggleNewPasswordVisibility}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={newPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color="#007bff"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputRow}>
          <Ionicons
            name="lock-closed"
            size={24}
            color="#007bff"
            style={styles.icon}
          />
          <TextInput
            style={styles.inputField}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm new password"
            secureTextEntry={!confirmPasswordVisible}
          />
          <TouchableOpacity
            onPress={toggleConfirmPasswordVisibility}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={confirmPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color="#007bff"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
