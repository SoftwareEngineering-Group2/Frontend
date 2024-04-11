import {Platform, StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 44,
    color: '#007bff',
    textTransform: 'capitalize',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: Platform.OS === 'web' ? 500 : '100%',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    flex: 1,
    borderRadius: 5,
    borderColor: '#007bff',
    fontStyle: 'italic',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  signUpText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  signUpLinkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
  shadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  errorMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  eyeIcon: {
   position: 'absolute',
   right: 10,
  }
});

export default styles;