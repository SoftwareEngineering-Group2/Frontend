import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)', // Adjusted alpha value for more transparency
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  closebutton: {
    alignSelf: 'flex-end' // Adjust the top value as needed
  },
  items:{
    padding: 10
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    color: '#007bff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 }, // Adjusted shadow offset for a subtle effect
    textShadowRadius: 2, // Adjusted shadow radius for a subtle effect
    padding: 10,
  },
  controlUnitText: {
    fontSize: 18,
    color: '#007bff',
    fontWeight: 'bold',
    marginTop: 10,
  },
    closeButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  onText: {
    color: '#4caf50',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  offText: {
    color: '#f44336',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  mediaControlButton: {
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  feedbackContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff'
  },
  feedbackText: {
    color: '#FFFFFF', // White text for visibility
    fontSize: 16,
  },
  switch:{
    marginBottom: 10,
  }
  
});

export default styles;
