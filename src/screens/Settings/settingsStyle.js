import {Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(#FCFCFC 30%, #CCE4FF 60%, #007bff)'
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: '#007bff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    borderRadius: 10,
    borderWidth: 1, // Added border
    borderColor: '#007bff', // Border color changed to blue
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: Platform.OS === 'web' ? 500 : '100%',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  input: {
  width: '100%',
  padding: 10,
  borderWidth: 1,
  borderColor: '#007bff',
  marginBottom: 10,
  borderRadius: 5,
  backgroundColor: '#FFFFFF'
},
button: {
  backgroundColor: '#007bff',
  color: '#FFFFFF',
  padding: 10,
  borderRadius: 5,
  textAlign: 'center',
  marginTop: 20, // Add some space above the button
  marginBottom: 20, // Add some space below the button
  },
inputContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 15
},
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Match background color with the input field
    borderWidth: 1,
    borderColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20, // Space between this field and the next component
  },
inputField: {
  flex: 1,
  padding: 10,
  borderWidth: 0,
  backgroundColor: '#FFFFFF', // Ensure this is set to white
  fontSize: 16,
},
  eyeIcon: {
    padding: 10, // Padding for touchable area
  }
});

export default styles;