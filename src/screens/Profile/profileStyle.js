import {Platform, StyleSheet } from "react-native";

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
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#007bff',
  },
  profileDetailText: {
    fontSize: 18, 
    flex: 1,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Makes it a circle
    marginBottom: 20,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#007bff',
  },
});

export default styles;
