import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(#FCFCFC 30%, #CCE4FF 60%, #007bff)',
  },
  heading: {
    fontSize: 24,
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
    borderWidth: 1,
    borderColor: '#007bff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: Platform.OS === 'web' ? 500 : '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#007bff',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#FFFFFF',
    paddingVertical: 7,  // Adjust padding to make the button smaller
    paddingHorizontal: 20, // Adjust padding to make the button smaller
    borderRadius: 10, // Round the button
    textAlign: 'center',
    alignItems: 'center', // Center text inside the button
    justifyContent: 'center',
    width: '38%', // Adjust width if necessary
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Match background color with the input field
    borderWidth: 1,
    borderColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 20, // Space between this field and the next component
  },
  inputField: {
    flex: 1,
    padding: 10,
    borderWidth: 0,
    backgroundColor: '#FFFFFF', // Ensure this is set to white
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  eyeIcon: {
    padding: 10, // Padding for touchable area
  },
});

export default styles;
