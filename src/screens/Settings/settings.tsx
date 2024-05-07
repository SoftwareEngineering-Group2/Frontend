import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  getAuth,
  EmailAuthProvider,
  User,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth"; // Ensure correct imports
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import styles from "./settingsStyle";
import { Ionicons } from "@expo/vector-icons";

const Settings = () => {
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [newPasswordVisible, setNewPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleNewPasswordChange = (text: string) => {
    console.log("Updating new password:", text); // This should log every keystroke
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
        await reauthenticateWithCredential(user, credential);
        return true;
      } catch (error) {
        console.error("Error reauthenticating:", error);
        Alert.alert("Error", "Current password is incorrect.");
        return false;
      }
    }
    return false;
  };

  const handleUpdatePassword = async () => {
    // Check if the new passwords match before attempting to reauthenticate and update
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "The new passwords do not match.");
      return;
    }

    if (await reauthenticate(currentPassword)) {
      const auth = getAuth(); // Get the auth instance
      const user = auth.currentUser; // Get the current user

      if (user) {
        try {
          await updatePassword(user, newPassword); // Use the updatePassword function
          Alert.alert("Success", "Password updated successfully!");
          setNewPassword(""); // Clear the new password field
          setConfirmPassword(""); // Clear the confirm password field
        } catch (error) {
          console.error("Error updating password:", error);
          Alert.alert("Error", "Failed to update password.");
        }
      }
    }
  };

  const handleUpdateEmail = async () => {
    if (await reauthenticate(currentPassword)) {
      const auth = getAuth(); // Assuming you're using the initialized auth object
      const user = auth.currentUser;

      if (user) {
        try {
          await updateEmail(user, newEmail); // Correct method to update email
          Alert.alert("Success", "Email updated successfully!");
          setNewEmail(""); // Clear the input field
        } catch (error) {
          console.error("Error updating email:", error);
          Alert.alert("Error", "Failed to update email.");
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Settings</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputField}
            onChangeText={setNewEmail}
            value={newEmail}
            placeholder="Enter new email"
            autoCapitalize="none"
          />
        </View>
        <Button title="Update Email" onPress={handleUpdateEmail} />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputField}
            onChangeText={handleNewPasswordChange} // Pass the new handler
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
        <Button title="Update Password" onPress={handleUpdatePassword} />
      </View>
    </View>
  );
};

export default Settings;
