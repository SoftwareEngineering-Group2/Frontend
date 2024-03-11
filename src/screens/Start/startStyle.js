import { StyleSheet, Dimensions } from "react-native";

// Define window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    /* paddingHorizontal: windowWidth > 768 ? 20 : 0,  */// Add horizontal padding only for larger screens
  },
  backgroundImage: {
    width: windowWidth > 768 ? 550 : 200,
    height: windowHeight > 768 ? 550 : 200, 
  },
  overlayTextMain: {
    fontSize: windowWidth > 768 ? 48 : 36, // Adjust font size based on screen width
    fontWeight: 'bold',
    color: '#007bff', // Change text color to white
    marginBottom: 20, // Add more bottom margin for spacing
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  overlayTextSub: {
    fontSize: windowWidth > 768 ? 30 : 24, // Adjust font size based on screen width
    color: '#007bff', // Change text color to a lighter shade of blue or a color that complements your image
    marginBottom: 20, // Add more bottom margin for spacing
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40, // Increase bottom padding for more spacing
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 40, // Add margin to separate text from the image
  },
  description: {
    marginBottom: 40, // Increase bottom margin for more spacing
    fontSize: windowWidth > 768 ? 24 : 18, // Adjust font size based on screen width
    textAlign: 'center',
  },
  buttons:{
    flexDirection: windowWidth > 768 ? 'row': 'column',
    justifyContent: 'center', // Center the buttons horizontally
    gap: windowWidth  > 768 ? 100 : 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff', // Change button color
    borderRadius: 4,
    paddingVertical: 16, // Increase vertical padding for more spacing
    paddingHorizontal: 24,
    marginBottom: 24, // Increase bottom margin for more spacing
    width: windowWidth > 768 ? '50%' : '80%', // Adjust button width based on screen width
    maxWidth: 200, // Set maximum width for the button
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default styles;