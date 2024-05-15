import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)', // Adjusted alpha value for more transparency
  },
  modalView: {
    minWidth: 300, // Minimum width
    minHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#007bff',
    padding: 20,
  },
  closebutton: {
    alignSelf: 'flex-end', // Adjust the top value as needed
  },
  items: {
    padding: 10,
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
    borderRadius: 10,
    marginHorizontal: 2,
    marginBottom: 2,
  },
  feedbackContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  feedbackText: {
    color: '#007bff', // White text for visibility
    fontSize: 16,
    marginBottom: 10,
  },
  switch: {
    marginBottom: 10,
  },
  sliderLabel: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 5,
  },
  slider: {
    width: 200,
    height: 40,
    marginBottom: 20,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign:'center',
  },
  wattButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  wattButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '25%',
  },
  selectedWattButton: {
    backgroundColor: '#0056b3', // A darker blue to indicate selection
  },
  progressBarContainer: {
    width: '100%',
    height: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4c97ff',
  },
});

export default styles;
